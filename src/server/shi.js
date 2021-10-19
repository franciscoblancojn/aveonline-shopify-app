const fetch = require('node-fetch');

const ss = async ({shop, accessToken,HOST}) => {
    console.log({shop, accessToken,HOST});
    const json = {
        carrier_service:{
            name: "Aveonline3",
            callback_url: `${HOST}/shipping`,
            service_discovery: true,
        }
    }
    console.log(json);
    const r = await fetch(`https://${shop}/admin/api/2021-10/carrier_services.json`, {
        body: JSON.stringify(json),
        headers: {
          "Content-Type": "application/json",
          "X-Shopify-Access-Token": accessToken
        },
        method: "POST"
    })
    const r2 = await r.json()
    console.log(r2);
    return r2
};
ss({
    HOST: "https://88af-181-33-130-72.ngrok.io",
    accessToken: "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",
    shop: "testingapps13.myshopify.com",
})
// let headersList = {
//     "Accept": "*/*",
//     "User-Agent": "Thunder Client (https://www.thunderclient.io)",
//     "X-Shopify-Access-Token": "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",
//     "Content-Type": "application/json"
//    }
   
//    fetch("https://testingaveonline.myshopify.com/admin/api/2021-10/carrier_services.json", { 
//      method: "POST",
//      body: "{\n  \"carrier_service\": {\n    \"name\": \"Aveonline34\",\n    \"callback_url\": \"https://88af-181-33-130-72.ngrok.io/shipping\",\n    \"service_discovery\": true\n  }\n}",
//      headers: headersList
//    }).then(function(response) {
//      return response.text();
//    }).then(function(data) {
//      console.log(data);
//    })