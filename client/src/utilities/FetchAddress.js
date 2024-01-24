export const FetchAddress = async(query)=>{
    const url =
        "http://api.positionstack.com/v1/forward?access_key=9cec2106fdf303b9e82a25feb084b836&country=ca&query=";
        try {
            let response = await fetch(url + query);
            let dataResponse = await response.json();
            return dataResponse
        }
        catch(err){
            console.log(err)
        }
}