import Shopify, { DataType } from "@shopify/shopify-api";

module.exports = async ({shop, accessToken,HOST}) => {
    const client = new Shopify.Clients.Rest(shop, accessToken);
    const data = await client.post({
        path: "carrier_services",
        body: {
            carrier_service: {
                name: "Aveonline",
                callback_url: `${HOST}/shipping`,
                service_discovery: true,
            },
        },
        type: DataType.JSON,
    });
    return data
};
