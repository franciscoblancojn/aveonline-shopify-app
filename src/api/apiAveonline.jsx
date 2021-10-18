const api = {}

api.URL_autenticarusuario = 'https://aveonline.co/api/comunes/v1.0/autenticarusuario.php'
api.URL_agentes = 'https://aveonline.co/api/comunes/v1.0/agentes.php'

api.request = async (json, url = '', method = 'POST') => {
  const myHeaders = new Headers()
  myHeaders.append('Content-Type', 'application/json')
  console.log(json)
  const requestOptions = {
    method,
    headers: myHeaders,
    body: JSON.stringify(json),
    redirect: 'follow'
  }

  const resultfetch = await fetch(url, requestOptions)
  const result = await resultfetch.json()
  return result
}

api.autentificate = async (state) => {
  const jsonSend = {
    tipo: 'auth',
    usuario: state.user,
    clave: state.password
  }
  const res = await api.request(jsonSend, api.URL_autenticarusuario)
  return res
}

api.getCuentas = async (state) => {
  const result = {
    option: state.option_cuenta,
    title: 'Carga Finalizada',
    text: 'Se cargaron correctamente las cuentas, seleccione una para configurar Aveonline'

  }
  if (state.user === '') {
    result.title = 'Upps Ocurrio un Error'
    result.text = 'Debes ingresar un Usuario'
    return result
  }
  if (state.password === '') {
    result.title = 'Upps Ocurrio un Error'
    result.text = 'Debes ingresar una Contraseña'
    return result
  }
  const r = await api.autentificate(state)
  if (r.status === 'error') {
    result.title = 'Upps Ocurrio un Error'
    result.text = `Erro: ${r.message}`
    return result
  }
  const addCuenta = r.cuentas.map((e) => {
    return {
      label: e.servicio,
      value: e.usuarios[0].id
    }
  })
  result.option = result.option.concat(addCuenta)
  return result
}
api.getAgentes = async (state) => {
  const result = {
    option: state.option_agente,
    title: 'Carga Finalizada',
    text: 'Se cargaron correctamente los Agentes, seleccione uno para configurar Aveonline'

  }
  if (state.cuenta === '') {
    result.title = 'Upps Ocurrio un Error'
    result.text = 'Debes ingresar una Cuenta'
    return result
  }
  const autentificate = await api.autentificate(state)
  if (autentificate.status === 'error') {
    result.title = 'Upps Ocurrio un Error'
    result.text = `Erro: ${autentificate.message}`
    return result
  }
  const jsonSend = {
    tipo: 'listarAgentesPorEmpresaAuth',
    token: autentificate.token,
    idempresa: state.cuenta
  }
  const r = await api.request(jsonSend, api.URL_agentes)
  if (r.status === 'error') {
    result.title = 'Upps Ocurrio un Error'
    result.text = `Erro: ${r.message}`
    return result
  }
  const addValue = r.agentes.map((e) => {
    return {
      label: e.nombre,
      value: e.id,
      nombre: e.nombre,
      direccion: e.direccion,
      email: e.email,
      idciudad: e.idciudad,
      telefono: e.telefono
    }
  })
  result.option = result.option.concat(addValue)
  return result
}
api.getConfig = async () => {
  const jsonSend = {
    shop: window.location.origin
  }
  const res = await api.request(jsonSend, api.URL_startscoinc)
  return res
}
export default api
