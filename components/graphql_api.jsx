// import { graphql, buildSchema } from('graphql');

// var schema = buildSchema(`
//   type Query {
//     hello: String
//   }
// `);

// var root = { hello: () => 'Hello world!' };

// graphql(schema, '{ hello }', root).then((response) => {
//   console.log(response);
// });
class fetchGraphql {
	store_url = null
	token = null
	constructor(arg = {}) {
		this.store_url = arg.store_url
	}
	apiCall = async (query) =>{
		const fetchresult = await fetch(`${this.store_url}/api/graphql.json`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/graphql',
				"Access-Control-Origin": "*",
				// 'X-Shopify-Storefront-Access-Token': this.token
			},
			"body": query
		})
		return await fetchresult.json()
	}
}
export default fetchGraphql
// const query = `{
// 	shop {
// 		name
// 	}
// }`;



// apiCall(query).then(response => {
// 	console.log(response)
// });