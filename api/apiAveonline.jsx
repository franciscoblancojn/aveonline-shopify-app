var api = {}

api.URL_autenticarusuario = "https://aveonline.co/api/comunes/v1.0/autenticarusuario.php"
api.URL_agentes = "https://aveonline.co/api/comunes/v1.0/agentes.php"

api.request = async (json, url = "",  method = "POST") => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    console.log(json);
    var requestOptions = {
        method,
        headers: myHeaders,
        body: JSON.stringify(json),
        redirect: 'follow'
    };

    var resultfetch = await fetch(url, requestOptions)
    var result = await resultfetch.json()
    return result
}

api.autentificate = async (state) =>{
    var json_send = { 
        "tipo":"auth",
        "usuario": state.user,
        "clave": state.password
    }
    var res = await api.request(json_send,api.URL_autenticarusuario)
    return res
}

api.getCuentas = async (state) =>{
    var result = {
        option : state.option_cuenta,
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
    var r = await api.autentificate(state)
    if(r.status == "error"){
        result.title = "Upps Ocurrio un Error"
        result.text = `Erro: ${r.message}`
        return result
    }
    var add_cuenta = r.cuentas.map((e) => {
        return { 
            label: e.servicio, 
            value: e.usuarios[0].id 
        }
    })
    result.option = result.option.concat(add_cuenta)
    return result
}
api.getAgentes = async (state) =>{
    var result = {
        option : state.option_agente,
        title : "Carga Finalizada",
        text : "Se cargaron correctamente los Agentes, seleccione uno para configurar Aveonline"
        
    }
    if(state.cuenta == ""){
        result.title = "Upps Ocurrio un Error"
        result.text = "Debes ingresar una Cuenta"
        return result
    }
    var autentificate = await api.autentificate(state)
    if(autentificate.status == "error"){
        result.title = "Upps Ocurrio un Error"
        result.text = `Erro: ${autentificate.message}`
        return result
    }
    var json_send = {
        "tipo":"listarAgentesPorEmpresaAuth",	  
        "token":autentificate.token,
        "idempresa":state.cuenta
    }
    var r = await api.request(json_send,api.URL_agentes)
    if(r.status == "error"){
        result.title = "Upps Ocurrio un Error"
        result.text = `Erro: ${r.message}`
        return result
    }
    var add_value = r.agentes.map((e) => {
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
    result.option = result.option.concat(add_value)
    return result
}
api.getConfig = async () => {
    var json_send = {
        "shop":window.location.origin
    }
    var res = await api.request(json_send,api.URL_startscoinc)
    return res
}
export default api