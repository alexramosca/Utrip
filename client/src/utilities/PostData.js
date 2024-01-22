export const PostData = async(url, body)=>{
    try{
        const response = await fetch(process.env.REACT_APP_API_BASE_URL+ url, {
            method: 'POST',
            credentials: 'include',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(body)
        })
        const data = await response.json()
        
        return data
    }
    catch(err){
        console.log("Fetch Error: ", err);
    }
    
}