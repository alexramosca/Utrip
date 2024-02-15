export const GetData = async(url)=>{
    try{
        const response = await fetch((process.env.REACT_APP_API_BASE_URL || 'https://utrip-apiv1.onrender.com/api')+ url, {credentials: 'include'})
        const data = await response.json()
        console.log(data)
            return data
        
    }
    catch(err){
        console.log("Fetch Error: ", err);
    }
    
}