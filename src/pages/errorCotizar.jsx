import { Button, TextField, Card, Heading, Link, ButtonGroup, TextStyle} from "@shopify/polaris";
import { useState, useEffect } from "react";

import Loader from "@/components/loader";


const ItemError = ({error}) => {
    const classn = "Polaris-DataTable__Cell Polaris-DataTable__Cell--verticalAlignTop Polaris-DataTable__Cell--firstColumn"
    return (
        <tr>
            <td className={classn}>{(new Date((error.date)?parseInt(error.date):0)).toDateString()}</td>
            <td className={classn}>{error.msj}</td>
        </tr>
    )
}

const Errors = ({ api, modal, shop }) => {
    const [app, setApp] = useState(api.app());
    const [errors, setErrors] = useState([])
    const [loader, setLoader] = useState(true)
    const [loadError, setLoadError] = useState(true)
    const loadErrors = async () => {
        setLoadError(false)
        const respond = await app.getShop()
        console.log("[SHOP]",respond);
        if (respond.type === "error") {
            modal.openModal({
                title: "Error",
                text: "Ocurrio un error con la carga de Errores de Cotizacion",
            });
        }else{
            const newErrorsApi = respond.result.errorCotizar || []
            console.log(newErrorsApi);
            setErrors(newErrorsApi)
            console.log("Load Errors");
            setLoader(false)
        }
    }
    const loadNewErrors = () => {
        setLoader(true)
        loadErrors()
    }
    const classTh = "Polaris-DataTable__Cell Polaris-DataTable__Cell--verticalAlignTop Polaris-DataTable__Cell--firstColumn Polaris-DataTable__Cell--header"
    return (
        <div>
            {
                loadError ?
                <div className="centerFixed">
                    <Button primary onClick={loadErrors}>Load Errors</Button>
                </div>
                :
                <>
                    {
                        loader ? 
                        <Loader/>
                        :
                        <div style={{padding:"20px"}}>
                            <div style={{display:"flex",justifyContent:"space-between"}}>
                                <Heading element="h1">Errores de Cotizacion</Heading>
                                <Button primary onClick={loadNewErrors}>Load Errors</Button>
                            </div>
                            <br />
                            <Card>
                                <table className="Polaris-DataTable__Table">
                                    <thead>
                                        <tr>
                                            <th className={classTh}>Fecha</th>
                                            <th className={classTh}>Msj</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {errors.reverse().map((e,i)=>{
                                            return <ItemError error={e}  key={i} />
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
export default Errors