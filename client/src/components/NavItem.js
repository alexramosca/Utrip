import { NavLink } from "react-router-dom"
export const NavItem = (props)=>{
    return(
        <li><NavLink to={props.path} activeClassName="active">{props.name}</NavLink></li>
    )
}