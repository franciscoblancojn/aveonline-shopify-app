import {
	Page,
	Pagination,
	Card,
	DataTable,
	Modal,
	errorTextID
} from '@shopify/polaris';


class Relaciones extends React.Component {
	state = {
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
			'Paquete'
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
		activeModal:false,
		titleModal: "",
		contentModal : (<div></div>)
	}

	componentDidMount() {
		this.loadCheckboxOrder()
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
					<Card>
						<div style={{padding:"15px"}}>
							<button 
							type="button" 
							className="Polaris-Button Polaris-Button--primary Polaris-Button__Content Polaris-Button__Text"
							onClick={this.generarRelaciones}
							>
								Generar Relaciones de Envio
							</button>
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
			</div>
		);
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
	loadCheckboxOrder = () => {
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
	seletOrderAll = (e) => {
		const checked = e.target.checked
		var inputCheckboxs = document.documentElement.querySelectorAll('.inputCheckbox')
		for (var i = 0; i < inputCheckboxs.length; i++) {
			inputCheckboxs[i].checked = checked
		}
	}
	validarRelaciones = (e) => {
		var error = true
		var errorText = "" 
		if(e.length == 0 ){
			errorText = "Debe Seleccionar almenos 1 pedido para generar relaciones de envio"
		}else{
			error = false
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
	generarRelaciones = () => {
		var inputCheckboxs = document.documentElement.querySelectorAll('.inputCheckbox')
		var inputSelected = [], con =0
		for (var i = 0; i < inputCheckboxs.length; i++) {
			if(inputCheckboxs[i].checked){
				inputSelected[con++] = inputCheckboxs[i]
			}
		}
		if(this.validarRelaciones(inputSelected)){
			console.log(inputSelected);
		}
	}
}
export default Relaciones;
