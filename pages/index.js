import {
	Spinner,
	Tabs,
	Card
} from '@shopify/polaris';

import Content from "../components/content"


import Pageconfig from "../components/config"
import Pagerecogidas from "../components/recogidas"
import Pagerelaciones from "../components/relaciones"

class Index extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			modal: false,
			modalTitle: "",
			modalText: "",
	
			loading: false,
			spinnerLoading: (
				<div className="loader">
					<Spinner
						accessibilityLabel="Loading form field"
						hasFocusableParent={false}
					/>
					<style jsx>
						{`
							.loader{
								position: fixed;
								top: 0;
								left: 0;
								right: 0;
								bottom: 0;
								margin: auto;
								width: 100%;
								height: 100%;
								z-index: 351;
								display: flex;
								align-items: center;
								justify-content: center;
								background: hsl(0deg 0% 0% / 10%);
							}
						`}
					</style>
				</div>
			),
	
	
	
			enabled: true,
	
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
			package: [],
			tabSelected:0,
		};
		this.state.token = this.props.token,
		this.state.tabs = [
			{
				id: 'config',
				content: "Configuraciones",
				page:(<Pageconfig state={this.state}/>)
			},
			{
				id: 'recogidas',
				content: "Recogidas",
				page:(<Pagerecogidas/>)
			},
			{
				id: 'relaciones',
				content: "Relaciones",
				page:(<Pagerelaciones/>)
			},
		]
	}
	componentDidMount() {
	}
	render() {
		return (
			<Tabs 
			tabs={this.state.tabs} 
			selected={this.state.tabSelected} 
			onSelect={(e)=>{
				this.setState({tabSelected:e})
			}}>
				<div className="height-top"></div>
				<Content>
					{this.state.tabs[this.state.tabSelected].page}
				</Content>
				<style jsx global>
					{`
						.Polaris-Tabs{
							position: fixed;
							width: 100%;
    						height: auto;
							z-index: 99;
							top: 0;
							left: 0;
    						background: #f6f6f7;
						}
						.height-top{
							padding-top:60px;
						}
					`}
				</style>
			</Tabs>
		);
	}
}
export async function getServerSideProps(context) {
	//console.log(context);
	return {
		props:{
			token: "s"
		}
	}
}
// export async function getStaticProps(context) {
// 	var shopName = context.query.shop
// 	return {
// 		props:{
// 			shopName: shopName || "none",
// 			token: context.res.token,
// 			query: context.query
// 		}
// 	}
// }
// Index.getInitialProps = async (ctx) => {
// 	var shopName = ctx.query.shop
// 	return {
// 		props:{
// 			shopName: shopName || "none",
// 			token: context.res.token,
// 			query: context.query
// 		}
// 	}
// }
export default Index;
