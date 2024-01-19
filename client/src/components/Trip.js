export const Trip = (props)=>{
    const driverUser = props.trip.Users.find((user) => user.User_trip.isDriver);


    return(
        <div className="tripWrapper">
            <div className="driverDetailsWrapper">
                {driverUser && (
                    <img
                        src={`${process.env.REACT_APP_PUBLIC_API_BASE_PUBLIC}profilepictures/${driverUser.profilePicture}`}
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
            <div className="ApplyDetailsWrapper">
                <button className="btnApply">Apply</button>
            </div>
        </div>
    )
}

