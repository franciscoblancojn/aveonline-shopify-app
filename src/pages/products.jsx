import { Button, Form, Layout, Page, Stack } from "@shopify/polaris";
import { useState, useEffect } from "react";


const Products = ({ api, modal }) => {
    const [app, setApp] = useState(api.app());
    const [products, setProducts] = useState(null)
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
    return (
        <div>
            <Page>
                {
                    products === null ?
                    <Button className="centerFixed" primary onClick={loadProducts}>Load Products</Button>
                    :
                    <>

                    </>
                }
            </Page>
            <style jsx>
                {`
                    .centerFixed{
                        top: 0;
                        left:0;
                        right:0;
                        bottom:0;
                        margin:auto;
                        position:fixed;
                    }
                `}
            </style>
        </div>
    )
}
export default Products