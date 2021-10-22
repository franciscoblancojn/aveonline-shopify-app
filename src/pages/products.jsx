import { Button, TextField, Card, Heading, Link } from "@shopify/polaris";
import { useState, useEffect } from "react";

import Loader from "@/components/loader";


const InputNumber = ({prefix,value,handleChange=(e)=>{},placeholder}) => {
    return (
        <TextField
          type="number"
          value={value}
          onChange={handleChange}
          prefix={prefix}
          autoComplete="off"
          placeholder={placeholder}
          min="0.1"
        />
    );
}

const ItemProduct = ({parent,variant,shop,save}) => {
    const [data, setData] = useState(variant)
    const changeValue = (key) => (value) => {
        setData({
            ...data,
            [key]:value
        })
        save({
            ...data,
            [key]:value
        })
    }
    const classn = "Polaris-DataTable__Cell Polaris-DataTable__Cell--verticalAlignTop Polaris-DataTable__Cell--firstColumn"
    return (
        <tr>
            <td className={classn}>{parent.id}</td>
            <td className={classn}><Heading><Link external url={`https://${shop}/admin/products/${parent.id}`} target="_blank" >{parent.title}</Link></Heading></td>
            <td className={classn}>{data.id}</td>
            <td className={classn}>{data.title}</td>
            <td className={classn}>{data.sku}</td>
            <td className={classn}><InputNumber placeholder="weigth" value={data.weigth} handleChange={changeValue('weigth')} prefix="kg"/></td>
            <td className={classn}><InputNumber placeholder="width" value={data.width} handleChange={changeValue('width')} prefix="cm"/></td>
            <td className={classn}><InputNumber placeholder="height" value={data.height} handleChange={changeValue('height')} prefix="cm"/></td>
            <td className={classn}><InputNumber placeholder="length" value={data.length} handleChange={changeValue('length')} prefix="cm"/></td>
        </tr>
    )
}

const Products = ({ api, modal, shop }) => {
    const [app, setApp] = useState(api.app());
    const [products, setProducts] = useState([])
    const [loader, setLoader] = useState(true)
    const [loadProduct, setLoadProduct] = useState(true)
    const [dataProducts, setDataProducts] = useState([])
    const loadProducts = async () => {
        setLoadProduct(false)
        const result = await app.getProducts()
        console.log(result);
        if (result.type === "error") {
            modal.openModal({
                title: "Error",
                text: "Ocurrio un error con la instalacion, reinstale el app porfavor",
            });
        }else{
            const newProducts = result.products
            console.log(newProducts);
            setProducts([...products,...newProducts])
            console.log("Load Products");
            setLoader(false)
        }
    }
    const saveProducts = async () => {
        console.log(dataProducts);
    }
    const saveProduct = (data) => {
        const newDataProducts = dataProducts.map((e)=>{
            if(e.id == data.id){
                return data
            }
            return e
        })
        if(newDataProducts.find((e)=>e.id==data.id) === undefined){
            newDataProducts.push(data)
        }
        setDataProducts(newDataProducts)
    }
    const classTh = "Polaris-DataTable__Cell Polaris-DataTable__Cell--verticalAlignTop Polaris-DataTable__Cell--firstColumn Polaris-DataTable__Cell--header"
    return (
        <div>
            {
                loadProduct ?
                <div className="centerFixed">
                    <Button primary onClick={loadProducts}>Load Products</Button>
                </div>
                :
                <>
                    {
                        loader ? 
                        <Loader/>
                        :
                        <div style={{padding:"20px"}}>
                            <div style={{display:"flex",justifyContent:"space-between"}}>
                                <Heading element="h1">Products</Heading>
                                <Button primary onClick={saveProducts}>Save</Button>
                            </div>
                            <br />
                            <Card>
                                <table className="Polaris-DataTable__Table">
                                    <thead>
                                        <tr>
                                            <th className={classTh}>Id</th>
                                            <th className={classTh}>Product</th>
                                            <th className={classTh}>Variant Id</th>
                                            <th className={classTh}>Variant</th>
                                            <th className={classTh}>Sku</th>
                                            <th className={classTh}>weigth</th>
                                            <th className={classTh}>width</th>
                                            <th className={classTh}>height</th>
                                            <th className={classTh}>length</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {products.map((e,i)=>{
                                            return e.variants.map((ele,j)=>{
                                                return <ItemProduct parent={e} variant={ele} shop={shop} key={i+"-"+j} save={saveProduct} />
                                            })
                                        })}
                                    </tbody>
                                </table>
                            </Card>
                        </div>
                    }
                </>
            }
            <style jsx>
                {`
                    .centerFixed{
                        top: 0;
                        left:0;
                        right:0;
                        bottom:0;
                        margin:auto;
                        position:fixed;
                        width: auto;
                        height: auto;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                    }
                    .Polaris-TextField__Input[type='number']{
                        background:#fff;
                        width: 90px;

                    }
                `}
            </style>
        </div>
    )
}
export default Products