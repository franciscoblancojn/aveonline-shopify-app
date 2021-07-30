
const Api = async ({shop,key,URLAPI,URLAVEONLINE}) => {
    console.log("init Api",{shop});
    const getToken = async () => {
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        var raw = JSON.stringify({
            shop,
            key
        });
        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };
        try {
            const response = await fetch( URLAPI + "/getToken", requestOptions)
            const result = await response.json()
            return result
        } catch (error) {
            console.log("error",error);
            return {
                type:"error",
                error
            }
        }
    }
    var token = await getToken()
    if(token.type != "error"){
        token = token[0].token
    }else{
        return {
            type : "error",
        }
    }
    const Aveonline = () => {
        const request = async ({json = {} , url = "",  method = "POST"}) => {
            var myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");
            
            var requestOptions = {
                method,
                headers: myHeaders,
                body: JSON.stringify(json),
                redirect: 'follow'
            };
        
            try {
                const response = await fetch( URLAVEONLINE + url, requestOptions)
                const result = await response.json()
                return result
            } catch (error) {
                console.log("error",error);
                return {
                    type:"error",
                    error
                }
            }
        }
        const autentificate = async (state) =>{
            const json = { 
                "tipo":"auth",
                "usuario": state.user,
                "clave": state.password
            }
            const response = await request({
                json,
                url:"/autenticarusuario.php"
            })
            return response
        }
        const getCuentas = async (state) =>{
            var result = {
                key : "option_cuenta",
                value : state.option_cuenta,
                title : "Carga Finalizada",
                text : "Se cargaron correctamente las cuentas, seleccione una para configurar Aveonline"
                
            }
            if(state.user == ""){
                result.title = "Upps Ocurrio un Error"
                result.text = "Debes ingresar un Usuario"
                return result
            }
            if(state.password == ""){
                result.title = "Upps Ocurrio un Error"
                result.text = "Debes ingresar una Contraseña"
                return result
            }
            var r = await autentificate(state)
            if(r.status == "error"){
                result.title = "Upps Ocurrio un Error"
                result.text = `Erro: ${r.message}`
                return result
            }
            if(r.type == "error"){
                result.title = "Upps Ocurrio un Error"
                result.text = `Erro: ${r.error}`
                return result
            }
            var add_cuenta = r.cuentas.map((e) => {
                return { 
                    label: e.servicio, 
                    value: e.usuarios[0].id 
                }
            })
            result.value = result.value.concat(add_cuenta)
            return result
        }
        const getAgentes = async (state) =>{
            var result = {
                key:"option_agente",
                value : state.option_agente,
                title : "Carga Finalizada",
                text : "Se cargaron correctamente los Agentes, seleccione uno para configurar Aveonline"
                
            }
            if(state.cuenta == ""){
                result.title = "Upps Ocurrio un Error"
                result.text = "Debes ingresar una Cuenta"
                return result
            }
            var autentificate = await autentificate(state)
            if(autentificate.status == "error"){
                result.title = "Upps Ocurrio un Error"
                result.text = `Erro: ${autentificate.message}`
                return result
            }
            if(autentificate.type == "error"){
                result.title = "Upps Ocurrio un Error"
                result.text = `Erro: ${autentificate.error}`
                return result
            }
            var json = {
                "tipo":"listarAgentesPorEmpresaAuth",	  
                "token":autentificate.token,
                "idempresa":state.cuenta
            }
            var r = await request({
                json,
                url:"/agentes.php"
            })
            if(r.status == "error"){
                result.title = "Upps Ocurrio un Error"
                result.text = `Erro: ${r.message}`
                return result
            }
            if(r.type == "error"){
                result.title = "Upps Ocurrio un Error"
                result.text = `Erro: ${r.error}`
                return result
            }
            const add_value = r.agentes.map((e) => {
                return { 
                    label: e.nombre, 
                    value: e.id,
                    nombre: e.nombre,
                    direccion:e.direccion,
                    email: e.email,
                    idciudad: e.idciudad,
                    telefono: e.telefono,
                }
            })
            result.value = result.value.concat(add_value)
            return result
        }
        return {
            autentificate,
            getCuentas,
            getAgentes,
        }
    }
    return {
        type : "ok",
        Aveonline
    }
}
export default  Api