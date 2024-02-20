import { ConfirmApplication } from "../utilities/ConfirmApplication"

export const NotificationLine = (props)=>{
    const RequestUser = props.application.RequestUser
    const trip = props.application.Trip
    return(
        
        <div className="notLineWrapper">
            
           <img src={`${process.env.REACT_APP_API_BASE_URL_PUBLIC ?? 'https://utrip-apiv1.onrender.com'}` + "/profilePictures/"+RequestUser.profilePicture} alt="profile picture" />
            <div>
                
                {RequestUser.firstName} {RequestUser.lastName} applied for a trip with you:
                <strong>
                    {trip.city_departure} {trip.prov_departure} &rarr; 
                    {trip.city_arrival} {trip.prov_arrival}
                </strong>
              </div>
             
             <div className="accRejBtnWrapper">
                <button onClick={()=>{ConfirmApplication(props.application.application_id, props.application.requester_id)}}> accept </button>
                <button> reject </button>
             </div>
            

        </div>
    )
}