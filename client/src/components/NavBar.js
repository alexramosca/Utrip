import { NavLink } from "react-router-dom"
import { NavItem } from "./NavItem"
export const NavBar = () => {
    return (
        <div className="navWrapper">
            <ul>
            <NavItem path="/" name="Home" />
            <NavItem path="/login" name="Sign In" />
            <NavItem path="/register" name="Sign Up" /> 
            <NavItem path="/aboutus" name="About us" />
            </ul>
        </div>
    )
}