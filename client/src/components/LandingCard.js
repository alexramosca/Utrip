export const LandingCard = (props)=>{
    return (
        <div className="landing-card">
            <img src={props.src} />
            <h3>{props.title}</h3>
            <p>{props.text}</p>
        </div>
    )
}