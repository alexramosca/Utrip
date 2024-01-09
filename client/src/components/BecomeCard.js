export const BecomeCard = (props) =>{
    return (
        <>
         <img src={props.image} loading="lazy"/>
        <div className="becomeCard">
            <h2>{props.title}</h2>
        </div>
        
        </>
        
    )
    
}