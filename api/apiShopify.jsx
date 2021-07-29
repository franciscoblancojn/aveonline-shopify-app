
const Api = async ({shop,key,URLAPI}) => {
    console.log("init Api",{shop});
    const getToken = async () => {
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        var raw = JSON.stringify({
            shop,
            key
        });
        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };
        try {
            const response = await fetch( URLAPI + "/getToken", requestOptions)
            const result = await response.json()
            return result
        } catch (error) {
            console.log("error",error);
            return {
                type:"error",
                error
            }
        }
    }
    var token = await getToken()
    if(token.type != "error"){
        token = token[0].token
    }else{
        token = null
    }
    return {
        
    }
}
export default  Api