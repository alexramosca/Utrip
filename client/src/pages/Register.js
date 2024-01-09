
import { RegForm } from "../components/RegForm"
import "./register.css"
import { Footer } from "../components/Footer"
import { Nav } from "../components/Nav"
export const Register = ()=>{
    return(
        <>
        <Nav />
        <h1>Sign Up</h1>
        <RegForm />
        <Footer />
        </>
        
    )
}