var apiShoidy = {}

apiShoidy.URL_startscoinc = "https://shopify.startscoinc.com/api.php"

apiShoidy.request = (json = null, resultF = (r) => {console.log(r)}, errorF = (r) => {console.log('error',r)}) => {
    var formdata = new FormData();
    formdata.append("json", JSON.stringify(json));
    
    var requestOptions = {
      method: 'POST',
      body: formdata,
      redirect: 'follow'
    };
    fetch(apiShoidy.URL_startscoinc , requestOptions)
        .then(response => response.text())
        .then(result => resultF(result))
        .catch(error => errorF(error));
}
apiShoidy.getMetafield = (token = "", resultF = (r) => {console.log(r)}, errorF = (r) => {console.log('error',r)}) => {
    const shopName = window.location.ancestorOrigins[0]
    apiShoidy.request(
        {
            "api":"yes",
            "url":`${shopName}/admin/api/2021-01/metafields.json`,
            "method":"GET",
            "token":token
        },
        resultF,
        errorF
    )
}
apiShoidy.saveConfig = (data = {} , token = "", resultF = (r) => {console.log(r)}, errorF = (r) => {console.log('error',r)}) => {
    const shopName = window.location.ancestorOrigins[0]
    apiShoidy.request(
        {
            "api":"yes",
            "url":`${shopName}/admin/api/2021-01/metafields.json`,
            "method":"POST",
            "token":token,
            "post":{
                "metafield": {
                    "namespace": "configAveonline",
                    "key": "configAveonline",
                    "value": window.btoa(JSON.stringify(data)),
                    "value_type": "string"
                }
            }
        },
        resultF,
        errorF
    )
}
export default apiShoidy