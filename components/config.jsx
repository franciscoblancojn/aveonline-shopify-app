import {
	Button,
	Form,
	Layout,
	Page,
	Stack,
	Modal,
	TextContainer
} from '@shopify/polaris';

import api from "../components/api"
import apiShopify from "../components/apiShopify"

import InputFormText from "../components/InputFormText"
import InputFormCheckbox from "../components/InputFormCheckbox"
import InputFormSelect from "../components/InputFormSelect"
import InputFormLoadSelect from "../components/InputFormLoadSelect"
import InputFormPackage from "../components/InputFormPackage"


class Config extends React.Component {
	constructor(props){
		super(props);
        this.state = this.props.state
	}
	componentDidMount(){
		this.loadConfig()
	}
	render() {
		return (
			<div>
				{(this.state.loading) ? this.state.spinnerLoading : ""}
				<Modal
					open={this.state.modal}
					onClose={this.closeModal}
					title={this.state.modalTitle}
					primaryAction={{
						content: 'Ok',
						onAction: this.closeModal,
					}}
				>
					<Modal.Section>
						<TextContainer>
							<p>
								{this.state.modalText}
							</p>
						</TextContainer>
					</Modal.Section>
				</Modal>
				<Form onSubmit={this.handleSubmit}>
					<Page>
						<Layout>
							<InputFormCheckbox
								id="eneable"
								name="eneable"
								title="Habilitar/Deshabilitar"
								description=""
								label="Actualmente Aveonline esta "
								onAction={this.handleToggle}
								enabled={this.state.enabled}
							></InputFormCheckbox>
							<InputFormText
								id="user"
								name="user"
								title="User"
								description="Usuario proporcionado por Aveonline"
								value={this.state.user}
								onChange={this.handleChange('user')}
								label="User"
								type="text"
							></InputFormText>
							<InputFormText
								id="password"
								name="password"
								title="Contraseña"
								description="Ultimos 4 digitos de la contraseña proporcionada por Aveonline"
								value={this.state.password}
								onChange={this.handleChange('password')}
								label="Contraseña"
								type="password"
							></InputFormText>
							<InputFormText
								id="nit"
								name="nit"
								title="Nit"
								description="Nit del Remitente"
								value={this.state.dsnitre}
								onChange={this.handleChange('dsnitre')}
								label="Nit"
								type="text"
							></InputFormText>
							<InputFormText
								id="direccion"
								name="direccion"
								title="Direccion"
								description="Direccion del Remitente"
								value={this.state.dsdirre}
								onChange={this.handleChange('dsdirre')}
								label="Direccion"
								type="text"
							></InputFormText>
							<InputFormText
								id="phone"
								name="phone"
								title="Telefono"
								description="Telefono del Remitente"
								value={this.state.dstelre}
								onChange={this.handleChange('dstelre')}
								label="Telefono"
								type="tel"
							></InputFormText>
							<InputFormText
								id="phone2"
								name="phone2"
								title="Celular"
								description="Celular del Remitente"
								value={this.state.dscelularre}
								onChange={this.handleChange('dscelularre')}
								label="Celular"
								type="tel"
							></InputFormText>
							<InputFormText
								id="email"
								name="email"
								title="Correo"
								description="Correo del Remitente"
								value={this.state.dscorreopre}
								onChange={this.handleChange('dscorreopre')}
								label="Correo"
								type="email"
							></InputFormText>
							<InputFormLoadSelect
								id="inputCuenta"
								name="inputCuenta"
								title="Cuenta Seleccionada"
								description=""
								value={this.getLabelForValue(this.state.option_cuenta, this.state.cuenta)}
								label=""
								type="text"
								btn="Cargar Cuentas"
								load={() => { this.loadSelect('cuenta') }}
							></InputFormLoadSelect>
							<InputFormSelect
								id="selectCuenta"
								name="selectCuenta"
								title="Cuenta"
								description="Seleccione la cuenta cargada por medio de User y Password"
								value={this.state.cuenta}
								onChange={this.handleChange('cuenta')}
								label="Cuenta"
								type="text"
								options={this.state.option_cuenta}
							></InputFormSelect>
							<InputFormLoadSelect
								id="inputAgente"
								name="inputAgente"
								title="Agente Seleccionado"
								description=""
								value={this.getLabelForValue(this.state.option_agente, this.state.agente)}
								label=""
								type="text"
								btn="Cargar Agentes"
								load={() => { this.loadSelect('agente') }}
							></InputFormLoadSelect>
							<InputFormSelect
								id="selectAgente"
								name="selectAgente"
								title="Agente"
								description="Seleccione el agente cargado por medio de Cuenta"
								value={this.state.agente}
								onChange={this.handleChange('agente')}
								label="Agente"
								type="text"
								options={this.state.option_agente}
							></InputFormSelect>
							<InputFormPackage
								id="paquetes"
								name="paquetes"
								title="Paquetes"
								description="Agrege los paquetes que usa para enviar sus productos, es necesario para hacer un calcurlo correcto al momento de contizar los pedidos"
								value={this.state.package}
								changePackage={this.changePackage}
								label="Paquetes"
							></InputFormPackage>
							<div className="submit">
								<Stack distribution="trailing" >
									<Button primary submit>
										Save
									</Button>
								</Stack>
							</div>
						</Layout>
					</Page>
					<style jsx global>
						{`
						.submit{
							margin-left:auto;
							margin-top:20px;
							margin-bottom:100px;
						}
						`}
					</style>
				</Form>
			</div>
		);
	}
	loadConfig = () => {
		this.getConfig((e)=>{
			this.setState(e)
		})
	}
	getConfig = (functionR = (e) => {console.log(e)}) =>{
		var fun = (r) => {
			r = JSON.parse(r)
			if(r.type != "ok")return;
			r = r.respond
			r = r.metafields.filter((e)=>e.key=="configAveonline")

			if(r.length == 0)return;

			const config = JSON.parse(window.atob(r[0].value))
			functionR(config);
		}
		apiShopify.getMetafield(
			this.state.token,
			fun
		)
	}
	addLoading = () => {
		this.setState({
			loading: true
		})
	}
	closeModal = () => {
		this.setState({
			modal: false
		})
	}
	getLabelForValue(array, value) {
		for (var i = 0; i < array.length; i++) {
			if ((array[i].value == value)) {
				return array[i].label
			}
		}
		return ""
	}
	loadSelect = async (type) => {
		this.addLoading()
		var r = {
			title: "Error",
			text: "Estas Usando codigo incorrecto"
		}
		switch (type) {
			case "cuenta":
				r = await api.getCuentas(this.state)
				this.setState({ option_cuenta: r.option })
				break;
			case "agente":
				r = await api.getAgentes(this.state)
				this.setState({ option_agente: r.option })
				break;
		}
		this.setState({
			loading: false,
			modal: true,
			modalTitle: r.title,
			modalText: r.text
		})
	}
	changePackage = (e) => {
		this.setState({ package: e })
	}
	handleSubmit = () => {
		apiShopify.saveConfig(
			{
				"enabled":this.state.enabled,
				"user":this.state.user,
				"password":this.state.password,
				"dsnitre":this.state.dsnitre,
				"dsdirre":this.state.dsdirre,
				"dstelre":this.state.dstelre,
				"dscelularre":this.state.dscelularre,
				"dscorreopre":this.state.dscorreopre,
				"option_cuenta":this.state.option_cuenta,
				"cuenta":this.state.cuenta,
				"option_agente":this.state.option_agente,
				"agente":this.state.agente,
				"package":this.state.package,
			},
			this.state.token,
			(r) => {
				r = JSON.parse(r)
				if(r.type == "ok"){
					this.setState({
						loading: false,
						modal: true,
						modalTitle: "Guardar",
						modalText: "Configuración guardada exitosamente"
					})
				}else{
					this.setState({
						loading: false,
						modal: true,
						modalTitle: "Error",
						modalText: r.msj
					})
				}
			}
		)
	}
	handleChange = (field) => {
		return (value) => this.setState({ [field]: value });
	}
	handleToggle = () => {
		this.setState(({ enabled }) => {
			return { enabled: !enabled };
		});
	}
}
export default Config;
