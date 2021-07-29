
const Api = async ({shop,key,URLAPI}) => {
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
            const result = await response.text()
            return result
        } catch (error) {
            console.log("error",error);
            return error
        }
    }
    const token = await getToken()
    console.log("load Api",token);
    return {

    }
}
export default  Api