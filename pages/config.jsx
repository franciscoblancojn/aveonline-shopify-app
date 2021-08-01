import {
	Button,
	Form,
	Layout,
	Page,
	Stack,
} from '@shopify/polaris';
import {useState,useEffect} from 'react'

import InputFormText from "@/components/InputFormText"
import InputFormCheckbox from "@/components/InputFormCheckbox"
import InputFormSelect from "@/components/InputFormSelect"
import InputFormLoadSelect from "@/components/InputFormLoadSelect"

const Index = ({api,modal}) => {
    const [aveonline, setAveonline] = useState(api.Aveonline())
    const [shopify, setShopify] = useState(api.Shopify())
    const [id, setId] = useState(null)
    const [config, setConfig] = useState({
        eneable : false,
	
        user: "",
        password: "",

        dsnitre: "",
        dsdirre: "",
        dstelre: "",
        dscelularre: "",
        dscorreopre: "",

        cuenta: "",
        option_cuenta: [
            {
                label: 'Seleccione Cuenta',
                value: ''
            },
        ],
        default_option_cuenta: [
            {
                label: 'Seleccione Cuenta',
                value: ''
            },
        ],
        agente: "",
        option_agente: [
            {
                label: 'Seleccione Agente',
                value: "",
                nombre: "",
                direccion: "",
                email: "",
                idciudad: "",
                telefono: "",
            },
        ],
        default_option_agente: [
            {
                label: 'Seleccione Agente',
                value: "",
                nombre: "",
                direccion: "",
                email: "",
                idciudad: "",
                telefono: "",
            },
        ],
        valorMinimo: false,
    })
    const saveConfig = async () => {
        console.log(config);
        console.log("saveConfig");
        const respond = await shopify.saveConfigAveonline(config,id)
        console.log(respond);
        modal.openModal({
            title:"Save",
            text:"Configuraciones Guardadas"
        })
    }
    const handleChange = (field) => {
		return (value) => setConfig({...config, [field]: value })
	}
    const loadSelect = async (field) => {
        const sw = {
            "cuenta" : aveonline.getCuentas,
            "agente" : aveonline.getAgentes,
            "default" : async () => {return {title : "Default",text : "default",key:"eneable",value:config.eneable}}
        }
        const fun = sw[field] || sw.default
        const respond  = await fun(config)
        modal.openModal(respond)
        setConfig({...config,[respond.key]:respond.value})
    }
    const loadConfig = async () => {
        const respond = await shopify.getMetafields()
        const metafields = respond.data.metafields.find((e)=>e.key == "configAveonline")
        if(metafields){
            setConfig({...config,...JSON.parse(metafields.value)})
            console.log('loadConfig');
        }
    }
    useEffect(() => {
        loadConfig()
    }, [])
    return (
        <div>
            <Form onSubmit={saveConfig}>
                <Page>
                    <Layout>
                        <InputFormCheckbox
                            id="eneable"
                            name="eneable"
                            title="Habilitar/Deshabilitar"
                            description=""
                            label="Actualmente Aveonline esta "
                            onChange={handleChange('eneable')}
                            enabled={config.eneable}
                        ></InputFormCheckbox>
                        <InputFormText
                            id="user"
                            name="user"
                            title="User"
                            description="Usuario proporcionado por Aveonline"
                            value={config.user}
                            onChange={handleChange('user')}
                            label="User"
                            type="text"
                        ></InputFormText>
                        <InputFormText
                            id="password"
                            name="password"
                            title="Contraseña"
                            description="Ultimos 4 digitos de la contraseña proporcionada por Aveonline"
                            value={config.password}
                            onChange={handleChange('password')}
                            label="Contraseña"
                            type="password"
                        ></InputFormText>
                        <InputFormText
                            id="nit"
                            name="nit"
                            title="Nit"
                            description="Nit del Remitente"
                            value={config.dsnitre}
                            onChange={handleChange('dsnitre')}
                            label="Nit"
                            type="text"
                        ></InputFormText>
                        <InputFormText
                            id="direccion"
                            name="direccion"
                            title="Direccion"
                            description="Direccion del Remitente"
                            value={config.dsdirre}
                            onChange={handleChange('dsdirre')}
                            label="Direccion"
                            type="text"
                        ></InputFormText>
                        <InputFormText
                            id="phone"
                            name="phone"
                            title="Telefono"
                            description="Telefono del Remitente"
                            value={config.dstelre}
                            onChange={handleChange('dstelre')}
                            label="Telefono"
                            type="tel"
                        ></InputFormText>
                        <InputFormText
                            id="phone2"
                            name="phone2"
                            title="Celular"
                            description="Celular del Remitente"
                            value={config.dscelularre}
                            onChange={handleChange('dscelularre')}
                            label="Celular"
                            type="tel"
                        ></InputFormText>
                        <InputFormText
                            id="email"
                            name="email"
                            title="Correo"
                            description="Correo del Remitente"
                            value={config.dscorreopre}
                            onChange={handleChange('dscorreopre')}
                            label="Correo"
                            type="email"
                        ></InputFormText>
                        <InputFormLoadSelect
                            id="inputCuenta"
                            name="inputCuenta"
                            title="Cuenta Seleccionada"
                            description=""
                            value={config.option_cuenta.find((e)=>e.value==config.cuenta).label}
                            label=""
                            type="text"
                            btn="Cargar Cuentas"
                            load={() => { loadSelect('cuenta') }}
                        ></InputFormLoadSelect>
                        <InputFormSelect
                            id="selectCuenta"
                            name="selectCuenta"
                            title="Cuenta"
                            description="Seleccione la cuenta cargada por medio de User y Password"
                            value={config.cuenta}
                            onChange={handleChange('cuenta')}
                            label="Cuenta"
                            type="text"
                            options={config.option_cuenta}
                        ></InputFormSelect>
                        <InputFormLoadSelect
                            id="inputAgente"
                            name="inputAgente"
                            title="Agente Seleccionado"
                            description=""
                            value={config.option_agente.find((e)=>e.value==config.agente).label}
                            label=""
                            type="text"
                            btn="Cargar Agentes"
                            load={() => { loadSelect('agente') }}
                        ></InputFormLoadSelect>
                        <InputFormSelect
                            id="selectAgente"
                            name="selectAgente"
                            title="Agente"
                            description="Seleccione el agente cargado por medio de Cuenta"
                            value={config.agente}
                            onChange={handleChange('agente')}
                            label="Agente"
                            type="text"
                            options={config.option_agente}
                        ></InputFormSelect>
                        <InputFormCheckbox
                            id="valorMinimo"
                            name="valorMinimo"
                            title="Habilitar/Deshabilitar"
                            description=""
                            label="Actualmente Valor Minimo esta "
                            onChange={handleChange('valorMinimo')}
                            enabled={config.valorMinimo}
                        ></InputFormCheckbox>
                        <div className="submit">
                            <Stack distribution="trailing" >
                                <Button primary submit>
                                    Save
                                </Button>
                            </Stack>
                        </div>
                    </Layout>
                </Page>
            </Form>
        </div>
    )
}
export default Index