import { NavLink } from "react-router-dom"
export const Menu = (props)=>{
    return(
        <>
            {props.menu.map((item)=>{
                return(
                    <NavLink className="navItem" key={item.path} to={item.path}>{item.name}</NavLink>
                )
            })}
        </>
    )
}