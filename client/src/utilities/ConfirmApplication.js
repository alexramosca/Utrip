import { PostData } from "./PostData"

export const ConfirmApplication = async (application_id, requester_id)=>{
    try{
        const data = {application_id, requester_id}
        const response = await PostData('/users/applications/confirm', data)
    
           
        
    }
    catch{
        return false
    }
    
}

