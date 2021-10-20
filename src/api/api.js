import createShipping from "./createShipping";

const Api = async ({ shop, key, URLAPI, URLAVEONLINE, HOST }) => {
    console.log("init Api", { shop });
    const Aveonline = () => {
        const request = async ({ json = {}, url = "", method = "POST" }) => {
            const myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");

            const requestOptions = {
                method,
                headers: myHeaders,
                body: JSON.stringify(json),
                redirect: "follow",
            };

            try {
                const response = await fetch(
                    URLAVEONLINE + url,
                    requestOptions
                );
                const result = await response.json();
                return result;
            } catch (error) {
                console.log("error", error);
                return {
                    type: "error",
                    error,
                };
            }
        };
        const autentificate = async (state) => {
            const json = {
                tipo: "auth",
                usuario: state.user,
                clave: state.password,
            };
            const response = await request({
                json,
                url: "/autenticarusuario.php",
            });
            return response;
        };
        const getCuentas = async (state) => {
            const result = {
                key: "option_cuenta",
                value: state.default_option_cuenta,
                title: "Carga Finalizada",
                text: "Se cargaron correctamente las cuentas, seleccione una para configurar Aveonline",
            };
            if (state.user === "") {
                result.title = "Upps Ocurrio un Error";
                result.text = "Debes ingresar un Usuario";
                return result;
            }
            if (state.password === "") {
                result.title = "Upps Ocurrio un Error";
                result.text = "Debes ingresar una Contraseña";
                return result;
            }
            const r = await autentificate(state);
            if (r.status === "error") {
                result.title = "Upps Ocurrio un Error";
                result.text = `Erro: ${r.message}`;
                return result;
            }
            if (r.type === "error") {
                result.title = "Upps Ocurrio un Error";
                result.text = `Erro: ${r.error}`;
                return result;
            }
            const addCuenta = r.cuentas.map((e) => {
                return {
                    label: e.servicio,
                    value: e.usuarios[0].id,
                };
            });
            result.value = result.value.concat(addCuenta);
            return result;
        };
        const getAgentes = async (state) => {
            const result = {
                key: "option_agente",
                value: state.default_option_agente,
                title: "Carga Finalizada",
                text: "Se cargaron correctamente los Agentes, seleccione uno para configurar Aveonline",
            };
            if (state.cuenta === "") {
                result.title = "Upps Ocurrio un Error";
                result.text = "Debes ingresar una Cuenta";
                return result;
            }
            let r = await autentificate(state);
            if (r.status === "error") {
                result.title = "Upps Ocurrio un Error";
                result.text = `Erro: ${r.message}`;
                return result;
            }
            if (r.type === "error") {
                result.title = "Upps Ocurrio un Error";
                result.text = `Erro: ${r.error}`;
                return result;
            }
            const json = {
                tipo: "listarAgentesPorEmpresaAuth",
                token: r.token,
                idempresa: state.cuenta,
            };
            r = await request({
                json,
                url: "/agentes.php",
            });
            if (r.status === "error") {
                result.title = "Upps Ocurrio un Error";
                result.text = `Erro: ${r.message}`;
                return result;
            }
            if (r.type === "error") {
                result.title = "Upps Ocurrio un Error";
                result.text = `Erro: ${r.error}`;
                return result;
            }
            const addValue = r.agentes.map((e) => {
                return {
                    label: e.nombre,
                    value: e.id,
                    nombre: e.nombre,
                    direccion: e.direccion,
                    email: e.email,
                    idciudad: e.idciudad,
                    telefono: e.telefono,
                };
            });
            result.value = result.value.concat(addValue);
            return result;
        };
        return {
            autentificate,
            getCuentas,
            getAgentes,
        };
    };
    const app = () => {
        console.log("Init App");
        const request = async ({method="GET",json={},rute=""}) => {
            try {
                var myHeaders = new Headers();
                myHeaders.append("apikey",key);

                const requestOptions = {
                    method,
                    headers: myHeaders,
                    redirect: "follow",
                };
                if(method!=="GET"){
                    requestOptions.body = JSON.stringify(json)
                }

                const respond = await fetch(`${URLAPI}${rute}`,requestOptions)
                const result = await respond.json()
                return result
            } catch (error) {
                console.log("error", error);
                return {
                    type: "error",
                    msj:`${error}`,
                    error,
                };
            }
        }
        const getShop = async () => {
            const result = await request({
                rute:`/shop?shop=${shop}`
            })
            if(result.type == "ok"){
                result.result = result.result[0]
                if(!result.result){
                    return {
                        type:"error",
                        error:"shop invalid",
                        msj:"shop invalid"
                    }
                }
            }
            return result
        }
        const saveConfig = async (json) => {
            return await request({
                rute:`/config?shop=${shop}`,
                method:"POST",
                json
            })
        }
        return {
            getShop,
            saveConfig,
        }
    };
    return {
        type: "ok",
        Aveonline,
        app
    };
};
export default Api;
