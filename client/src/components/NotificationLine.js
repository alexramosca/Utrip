import { ConfirmApplication } from "../utilities/ConfirmApplication"

export const NotificationLine = (props)=>{
    console.log(props)
    const RequestUser = props.application.RequestUser
    const trip = props.application.Trip
    return(
        
        <div className="notLineWrapper">
            <img src={"/profilePictures/"+RequestUser.profilePicture} alt="profile picture" />
            <p>{RequestUser.firstName} {RequestUser.lastName} applied
             for a trip with you <strong>{trip.city_departure} &rarr; 
             {trip.city_arrival} </strong></p>
             <div className="accRejBtnWrapper">
                <button onClick={()=>{ConfirmApplication(props.application.application_id, props.application.requester_id)}}> accept </button>
                <button> reject </button>
             </div>
            

        </div>
    )
}