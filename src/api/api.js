const Api = async ({ shop, key, URLAPI, URLAVEONLINE }) => {
    console.log("init Api", { shop });
    const getToken = async () => {
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        const raw = JSON.stringify({
            shop,
            key,
        });
        const requestOptions = {
            method: "POST",
            headers: myHeaders,
            body: raw,
            redirect: "follow",
        };
        try {
            const response = await fetch(URLAPI + "/getToken", requestOptions);
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
    let token = await getToken();
    if (token.type !== "error") {
        token = token[0].token;
    } else {
        return {
            type: "error",
        };
    }
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
                text:
                    "Se cargaron correctamente las cuentas, seleccione una para configurar Aveonline",
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
                text:
                    "Se cargaron correctamente los Agentes, seleccione uno para configurar Aveonline",
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

    const Shopify = () => {
        const VESIONAPISHOPIFY = "2021-01";
        const URLAPISHOPIFY = `https://${shop}/admin/api/${VESIONAPISHOPIFY}/`;
        const request = async ({ data = "", url = "", method = "get" }) => {
            const myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");
            const raw = JSON.stringify({
                key,
                config: {
                    method: method,
                    url: URLAPISHOPIFY + url,
                    headers: {
                        "X-Shopify-Access-Token": token,
                    },
                    data,
                },
            });
            console.log(raw);
            const requestOptions = {
                method: "POST",
                headers: myHeaders,
                body: raw,
                redirect: "follow",
            };
            try {
                const response = await fetch(
                    URLAPI + "/request",
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
        const getMetafields = async () => {
            const respond = await request({
                url: "metafields.json",
                method: "get",
            });
            return respond;
        };
        const postMetafields = async (config) => {
            const respond = await request({
                url: "metafields.json",
                method: "post",
                data: {
                    metafield: {
                        namespace: "configAveonline",
                        key: "configAveonline",
                        value: JSON.stringify(config),
                        value_type: "string",
                    },
                },
            });
            return respond;
        };
        const putMetafields = async (config, id) => {
            const respond = await request({
                url: "metafields.json",
                method: "put",
                data: {
                    metafield: {
                        id,
                        namespace: "configAveonline",
                        key: "configAveonline",
                        value: JSON.stringify(config),
                        value_type: "string",
                    },
                },
            });
            return respond;
        };
        const saveConfigAveonline = async (config, id) => {
            if (id) {
                return await putMetafields(config, id);
            } else {
                return await postMetafields(config);
            }
        };
        return {
            getMetafields,
            postMetafields,
            putMetafields,
            saveConfigAveonline,
        };
    };
    return {
        type: "ok",
        Aveonline,
        Shopify,
    };
};
export default Api;
