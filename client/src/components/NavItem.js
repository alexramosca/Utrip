import { NavLink } from "react-router-dom"
export const NavItem = (props)=>{
    return(
        <li><NavLink to={props.path} >{props.name}</NavLink></li>
    )
}