export const Trip = (props)=>{
    return(
        <div className="tripWrapper">
            <h3>{props.trip.from} &#8594; {props.trip.destiny}</h3>
            <p>On: {props.trip.date}</p>
            <p>Driver: {props.trip.Users.map((user)=>{
                return user.User_trip.isDriver ? user.firstName : undefined
            })}</p>
        </div>
    )
}

