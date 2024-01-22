export const GetData = async(url)=>{
    try{
        const response = await fetch(process.env.REACT_APP_API_BASE_URL+ url)
        const data = response.json()
        if(response.ok){
            return data
        }
        return null
    }
    catch(err){
        console.log("Fetch Error: ", err);
    }
    
}