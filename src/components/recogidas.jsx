import React from "react";
import {
	Button,
	DatePicker,
	Page,
	Modal,
	Pagination,
	Card,
	DataTable,
	TextField,
	FormLayout
} from '@shopify/polaris';


class Recogidas extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			activeModal:false,
			selectDate:{},
			horaInicial : "",
			horaFinal : "",
			notas : "",
			Month : (new Date()).getMonth(),
			Year : (new Date()).getFullYear(),
			page : 0,
			paged : 10,
			columnContentTypes:[
				'text',
				'numeric',
				'numeric',
				'numeric',
				'numeric',
			],
			headings : [
				'Pedido',
				'Fecha',
				'Cliente',
				'Total',
				'Forma de entrega',
				'Guia',
				'Rotulo',
				'Estado',
				'Generar Recogida'
			],
			rows : [
				["1","1","1","1","1","1","1","1","1"],
				["2","1","1","1","1","1","1","1","1"],
				["3","1","1","1","1","1","1","1","1"],
				["4","1","1","1","1","1","1","1","1"],
				["5","1","1","1","1","1","1","1","1"],
				["6","1","1","1","1","1","1","1","1"],
				["7","1","1","1","1","1","1","1","1"],
				["8","1","1","1","1","1","1","1","1"],
				["9","1","1","1","1","1","1","1","1"],
				["10","1","1","1","1","1","1","1","1"],
				["11","1","1","1","1","1","1","1","1"],
				["12","1","1","1","1","1","1","1","1"],
				["13","1","1","1","1","1","1","1","1"],
				["14","1","1","1","1","1","1","1","1"],
				["15","1","1","1","1","1","1","1","1"],
				["16","1","1","1","1","1","1","1","1"],
				["17","1","1","1","1","1","1","1","1"],
				["18","1","1","1","1","1","1","1","1"],
				["19","1","1","1","1","1","1","1","1"],
				["20","1","1","1","1","1","1","1","1"],
				["21","1","1","1","1","1","1","1","1"],
			],
			pagination : (<div></div>),
			titleModal: "",
			contentModal : (<div></div>)
		}
	}
	componentDidMount() {
		this.loadBtnGenerarRecogida()
		this.loadPagination()
	}
	render() {
		var init = this.state.page * this.state.paged
		var fin = init + this.state.paged
		return (
			<div>
				<Modal
					open={this.state.activeModal}
					onClose={()=>{
						this.setState({activeModal:false})
					}}
					title={this.state.titleModal}
					primaryAction={{
						content: 'Close',
						onAction: ()=>{
							this.setState({activeModal:false})
						},
					}}
				>
					<Modal.Section>
						{this.state.contentModal}
					</Modal.Section>
				</Modal>
				<Page>
					<Card >
						<div className="contentInputForm">
							<Button 
							primary
							onClick={this.generarRecogidas}
							>
								Generar Recogidas
							</Button>
							<Button
							onClick={()=>{
								this.setState({
									titleModal:"Seleccione Fecha de Recogida",
									contentModal:(
										<DatePicker
											month={this.state.Month}
											year={this.state.Year}
											onChange={(e) => {
												e.end.setMinutes("2")
												this.setState({
													selectDate:e,
													activeModal:false
												})
											}}
											onMonthChange={(Month, Year) => this.setState({Month, Year})}
											selected={this.selectDate}
										/>),
									activeModal:true
								})
							}}
							>
								Fecha de Recogida
							</Button>
							<label 
							htmlFor="horaInicial"
							className="labelHora"
							>
								Hora Inicial
								<input 
								type="time" 
								name="horaInicial" 
								id="horaInicial"
								className="Polaris-TextField__Input"
								onChange={(e)=>{
									this.setState({
										horaInicial:e.target.value
									})
								}}
								/>
							</label>
							<label
							htmlFor="horaFinal"
							className="labelHora"
							>
								Hora Final
								<input 
								type="time" 
								name="horaFinal" 
								id="horaFinal"
								className="Polaris-TextField__Input"
								onChange={(e)=>{
									this.setState({
										horaFinal:e.target.value
									})
								}}
								/>
							</label>
							<TextField
								id="notas"
								name="notas"
								placeholder="Notas de Recogida"
								type="text"
								value={this.state.notas}
								onChange={this.handleChange("notas")}
							/>
						</div>
					</Card>
					<br/>
      				<Card>
						<DataTable
						columnContentTypes={this.state.columnContentTypes}
						headings={this.state.headings}
						rows={this.state.rows.slice(init,fin)}
						footerContent={this.state.pagination}
						/>
					</Card>
				</Page>
				<style jsx>
					{`
						.contentInputForm{
							padding: 15px;
							display: flex;
							flex-wrap: wrap;
							align-items: center;
    						justify-content: space-between;
						}
						.labelHora{
							display:flex;
							align-items: center;
						}
					`}
				</style>
			</div>
		);
	}
	handleChange = (field) => {
		return (value) => this.setState({ [field]: value });
	}
	loadPagination = () => {
		this.setState(
			{
				pagination : (
					<Pagination 
					hasPrevious={this.state.page > 0}
					hasNext={this.state.page < parseInt(this.state.rows.length / this.state.paged)}
					onPrevious={this.prevP} 
					onNext={this.nextP} 
					/>
				)
			}
		)
	}
	nextP = () => {
		var state = this.state
		state.page++
		this.setState(state)
		this.loadPagination()
	}
	prevP = () => {
		var state = this.state
		state.page--
		this.setState(state)
		this.loadPagination()
	}
	loadBtnGenerarRecogida = () => {
		var state = this.state
		for (var i = 0; i < state.rows.length; i++) {
			state.rows[i][0] = (
				<div>
					<label htmlFor={`order_${i}`}>
						<input 
						id={`order_${i}`}
						name={`order_${i}`}
						className="inputCheckbox"
						type="checkbox"
						/>
						#{i}
					</label>
				</div>
			)
			state.rows[i][8] = (
				<button 
				type="button" 
				className="Polaris-Button Polaris-Button--primary Polaris-Button__Content Polaris-Button__Text"
				value={i}
				onClick={this.generarRecogida}
				>
					Generar recogidas
				</button>
			)
			
		}
		state.headings[0] = (
			<div>
				<label htmlFor="order_all">
					<input 
					id="order_all"
					name="order_all"
					type="checkbox"
					onClick={this.seletOrderAll}
					/>
					Pedidos
				</label>
			</div>
		)
		this.setState(state)
	}
	generarRecogida = (e) => {
		const i = e.target.getAttribute("value")
		console.log("e",e);
		console.log("i",i);
		console.log("Element",this.state.rows[i]);
	}
	seletOrderAll = (e) => {
		const checked = e.target.checked
		var inputCheckboxs = document.documentElement.querySelectorAll('.inputCheckbox')
		for (var i = 0; i < inputCheckboxs.length; i++) {
			inputCheckboxs[i].checked = checked
		}
	}
	validationField = () => {
		var error = true
		var errorText = ""
		if(this.state.selectDate.start == null || this.state.selectDate.start == undefined){
			errorText = "Debe seleccionar Fecha de Recogida"
		}else if (this.state.horaInicial == ""){
			errorText = "Debe seleccionar Hora Inicial"
		}else if (this.state.horaFinal == ""){
			errorText = "Debe seleccionar Hora Final"
		}else if(this.state.notas == ""){
			errorText = "Debe agregar Notas de Recogida"
		}else{
			const today = new Date()
			const dateSelect = this.state.selectDate.start
			if(
				today.getFullYear() > dateSelect.getFullYear() ||
				(
					today.getFullYear() == dateSelect.getFullYear() &&
					today.getMonth() > dateSelect.getMonth() 
				) ||
				(
					today.getFullYear() == dateSelect.getFullYear() &&
					today.getMonth() == dateSelect.getMonth() &&
					today.getDate() >= dateSelect.getDate()
				)
			){
				errorText = "La fecha seleccionada no puede ser menor o igual a la actual"
			}else if(dateSelect.getDay() == 0){
				errorText = "Los Domingos no se puede generar Recogida"
			}else{
				var nInicial = this.state.horaInicial
				nInicial = nInicial.split(":")
				nInicial = parseInt(nInicial[0])*60 + parseInt(nInicial[1])

				var nFinal = this.state.horaFinal
				nFinal = nFinal.split(":")
				nFinal = parseInt(nFinal[0])*60 + parseInt(nFinal[1])

				if(nInicial > nFinal){
					errorText = "La Hora Inicial no puede ser mayor a la final"
				}else if(nInicial + 60 > nFinal){
					errorText = "Debe haber almenos 1 hora de direncia"
				}else{
					error = false
				}
			}
		}
		
		
		if(error){
			this.setState({
				titleModal:"Upss ah ocurrido un Error",
				contentModal:errorText,
				activeModal:true
			})

			return false;
		}
		return true
	}
	generarRecogidas = () => {
		if(this.validationField()){
			var inputCheckboxs = document.documentElement.querySelectorAll('.inputCheckbox')
			var inputSelected = [], con =0
			for (var i = 0; i < inputCheckboxs.length; i++) {
				if(inputCheckboxs[i].checked){
					inputSelected[con++] = inputCheckboxs[i]
				}
			}
			console.log(this.state);
			console.log(inputSelected);
		}
	}
}
export default Recogidas;
