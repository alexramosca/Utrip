export const FetchAddress = async(query)=>{
    
        try {
            let response = await fetch(`https://api.geoapify.com/v1/geocode/autocomplete?text=${query}&apiKey=f1179df6b4274d7d8f376d1a24edd808`);
            let dataResponse = await response.json();
            let returnAddresses = []
            if (response.ok){
                returnAddresses = dataResponse.features.map((item, index)=>{
                    return {
                        data: {
                            locality: item.properties.city,
                        region_code: item.properties.state_code,
                        label: item.properties.formatted
                        }
                        
                    }
                })
            }
            console.log(returnAddresses)
            return returnAddresses
            
        }
        catch(err){
            console.log(err)
        }
}