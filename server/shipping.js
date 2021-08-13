exports.getShipping = async () => {
    const rate = JSON.stringify({
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
    })
    const rates = JSON.stringify({
        "rates": [
            {
                "service_name": "canadapost-overnight",
                "service_code": "ON",
                "total_price": "1295",
                "description": "This is the fastest option by far",
                "currency": "CAD",
                "min_delivery_date": "2013-04-12 14:48:45 -0400",
                "max_delivery_date": "2013-04-12 14:48:45 -0400"
            },
            {
                "service_name": "fedex-2dayground",
                "service_code": "2D",
                "total_price": "2934",
                "currency": "USD",
                "min_delivery_date": "2013-04-12 14:48:45 -0400",
                "max_delivery_date": "2013-04-12 14:48:45 -0400"
            },
            {
                "service_name": "fedex-priorityovernight",
                "service_code": "1D",
                "total_price": "3587",
                "currency": "USD",
                "min_delivery_date": "2013-04-12 14:48:45 -0400",
                "max_delivery_date": "2013-04-12 14:48:45 -0400"
            }
        ]
     })
    return rate + rates
}