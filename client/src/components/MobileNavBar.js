import { NavItem } from "./NavItem"
export const MobileNavBar = (props) =>{
    return (
       <div className="mobileInsideWrapper">
        <ul>
            <NavItem path="/" name="Home" />
            <NavItem  path="/login" name="Sign In" />
            <NavItem path="/register" name="Sign Up" /> 
            <NavItem path="/aboutus" name="About us" />
        </ul>
        </div>
        
    )
}