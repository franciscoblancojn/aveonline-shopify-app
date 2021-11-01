import { Button, TextField, Card, Heading, Link, ButtonGroup, TextStyle} from "@shopify/polaris";
import { useState, useEffect } from "react";

import Loader from "@/components/loader";

const ItemOrder = ({order,shop,onChange}) => {
    const classn = "Polaris-DataTable__Cell Polaris-DataTable__Cell--verticalAlignTop Polaris-DataTable__Cell--firstColumn"
    return (
        <tr>
            <td className={classn} style={{width:"20px"}}><input type="checkbox" name="" id={order.id_order} onChange={onChange(order.id_order)}/></td>
            <td className={classn}><a href={`https://${shop}/admin/orders/${order.id_order}`} target="_blank">{order.id_order}</a></td>
            <td className={classn}><a href={order.rutaguia} target="_blank">{order.mensaje}</a></td>
            <td className={classn}><a href={order.rotulo} target="_blank">{order.numguia}</a></td>
            <td className={classn}>{order.transportadora}</td>
            <td className={classn}>{(new Date(order.date)).toLocaleString()}</td>
        </tr>
    )
}

const Orders = ({ api, modal, shop }) => {
    const [app, setApp] = useState(api.app());
    const [orders, setOrders] = useState([])
    const [loader, setLoader] = useState(true)
    const [loadOrder, setLoadOrder] = useState(true)
    const [ordersSelect, setOrdersSelect] = useState([])
    const [note, setNote] = useState("")
    const loadOrders = async () => {
        setLoadOrder(false)
        const result = await app.getOrders()
        console.log(result);
        if (result.type === "error") {
            modal.openModal({
                title: "Error",
                text: "Ocurrio un error con la carga de Orderos",
            });
        }else{
            setOrders(result.orders)
            setLoader(false)
        }
    }
    const reloadOrders = async () => {
        setLoader(true)
        await loadOrders()
    }
    const onChangeOrdersSelect = (id) => (ele) => {
        var newOrdersSelect = ordersSelect
        const value = ele.target.checked
        console.log(id,value);
        if(value){
            newOrdersSelect.push(id)
        }else{
            newOrdersSelect = newOrdersSelect.filter((e)=>e!=id)
        }
        console.log(newOrdersSelect);
        setOrdersSelect(newOrdersSelect)
    }
    const generateRecoguidas = () => {

    }
    const classTh = "Polaris-DataTable__Cell Polaris-DataTable__Cell--verticalAlignTop Polaris-DataTable__Cell--firstColumn Polaris-DataTable__Cell--header"
    return (
        <div>
            {
                loadOrder ?
                <div className="centerFixed">
                    <Button primary onClick={loadOrders}>Load Orders</Button>
                </div>
                :
                <>
                    {
                        loader ? 
                        <Loader/>
                        :
                        <div style={{padding:"20px"}}>
                            <div style={{display:"flex",justifyContent:"space-between"}}>
                                <Heading element="h1">Orders</Heading>
                                <ButtonGroup segmented>
                                    <TextField
                                        id="note"
                                        name="note"
                                        value={note}
                                        onChange={setNote}
                                        placeholder="Notas de Recogida"
                                        type="text"
                                    />
                                    <Button onClick={generateRecoguidas}>Generar Recoguidas</Button>
                                    <Button primary onClick={reloadOrders} >Load Guias</Button>
                                </ButtonGroup>
                            </div>
                            <br />
                            <Card>
                                <table className="Polaris-DataTable__Table">
                                    <thead>
                                        <tr>
                                            <th className={classTh}></th>
                                            <th className={classTh}>Order</th>
                                            <th className={classTh}>Guia</th>
                                            <th className={classTh}>Rotulo</th>
                                            <th className={classTh}>Transportadora</th>
                                            <th className={classTh}>Fecha</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {orders.map((e,i)=>{
                                            return <ItemOrder order={e} key={i} shop={shop} onChange={onChangeOrdersSelect}/>
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
export default Orders