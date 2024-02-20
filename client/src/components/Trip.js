import { Children } from "react";

export const Trip = (props)=>{
    const driverUser = props.trip.Users.find((user) => user.User_trip.isDriver);
    console.log(process.env.REACT_APP_API_BASE_URL_PUBLIC)
    
    const {children} = props
    return(
        <div className="tripWrapper">
            <div className="driverDetailsWrapper">
                {driverUser && (
                    <img
                        src={`${process.env.REACT_APP_API_BASE_URL_PUBLIC ?? 'https://utrip-apiv1.onrender.com' }/profilePictures/${driverUser.profilePicture}`}
                        alt="Driver Profile"
                    />
                    )}
                    <p>{ driverUser.firstName} {driverUser.lastName}</p>

            </div>
            <div className="tripDetailsWrapper">
                <h2>{props.trip.city_departure} {props.trip.prov_departure} &#8594; {props.trip.city_arrival} {props.trip.prov_arrival}</h2>
                <h3>Date: {props.trip.date}</h3>
                <p>Seats Available: {props.trip.seats_available}</p>
            </div>
            
            {children}
        </div>
    )
}

