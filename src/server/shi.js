const fetch = require('node-fetch');

const ss = async ({shop, accessToken,HOST}) => {
    console.log({shop, accessToken,HOST});
    const json = {
        carrier_service:{
            name: "Aveonline",
            callback_url: `${HOST}/shipping`,
            service_discovery: true,
        }
    }
    const r = await fetch(`https://${shop}/admin/api/2021-10/carrier_services.json`, {
        body: JSON.stringify(json),
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          "X-Shopify-Access-Token": accessToken
        },
        method: "POST"
    })
    console.log(r);
    return r
};
ss({
    HOST: "https://328c-181-33-130-72.ngrok.io",
    accessToken: "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",
    shop: "testingapps13.myshopify.com",
})