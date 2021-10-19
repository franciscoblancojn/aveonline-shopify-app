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