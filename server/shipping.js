exports.getShipping = async () => {
    return {
        "rate": {
            "origin": {
                "country": "CA",
                "postal_code": "K2P1L4",
                "province": "ON",
                "city": "Ottawa",
                "name": null,
                "address1": "150 Elgin St.",
                "address2": "",
                "address3": null,
                "phone": "16135551212",
                "fax": null,
                "email": null,
                "address_type": null,
                "company_name": "Jamie D's Emporium"
            },
            "destination": {
                "country": "CA",
                "postal_code": "K1M1M4",
                "province": "ON",
                "city": "Ottawa",
                "name": "Bob Norman",
                "address1": "24 Sussex Dr.",
                "address2": "",
                "address3": null,
                "phone": null,
                "fax": null,
                "email": null,
                "address_type": null,
                "company_name": null
            },
            "items": [{
                "name": "Short Sleeve T-Shirt",
                "sku": "",
                "quantity": 1,
                "grams": 1000,
                "price": 1999,
                "vendor": "Jamie D's Emporium",
                "requires_shipping": true,
                "taxable": true,
                "fulfillment_service": "manual",
                "properties": null,
                "product_id": 48447225880,
                "variant_id": 258644705304
            }],
            "currency": "USD",
            "locale": "en"
        }
    }
}