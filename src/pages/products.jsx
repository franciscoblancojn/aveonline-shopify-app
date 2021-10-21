import { Button, Form, Layout, Page, Stack } from "@shopify/polaris";
import { useState, useEffect } from "react";


const Products = ({ api, modal }) => {
    const [app, setApp] = useState(api.app());
    const [products, setProducts] = useState([])
    const loadProducts = async () => {
        const result = await app.getProducts()
        console.log(result);
        if (result.type === "error") {
            modal.openModal({
                title: "Error",
                text: "Ocurrio un error con la instalacion, reinstale el app porfavor",
            });
        }else{
            const newProducts = result.products
            setProducts({...products,...newProducts})
            console.log("Load Products");
        }
    }
    useEffect(() => {
        //loadProducts()
    }, [])
    return (
        <div>
            <Page>
                <h1>Products</h1>
                {JSON.stringify(products)}
            </Page>
        </div>
    )
}
export default Products