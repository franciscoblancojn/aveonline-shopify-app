
const Api = async ({shop,key}) => {
    const URL = "https://aveonline.startscoinc.com/api/v1"
    const getToken = async () => {
        var myHeaders = new Headers();
        myHeaders.append("key", key);
        myHeaders.append("shop", shop);

        var requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        };
        try {
            const response = await fetch( URL + "/getToken", requestOptions)
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