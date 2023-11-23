import axios from 'axios'
import { useContext} from 'react';
import { useNavigate } from "react-router-dom";
import {UserContext} from '../App'
import { useForm } from 'react-hook-form';


export const Login = ()=>{
    const navigate = useNavigate()
    const {currentUser, setCurrentUser} = useContext(UserContext)
    const { register, handleSubmit} = useForm()
    const onSubmit = async (data, e)=>{
       e.preventDefault()
       try{
        const response = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/users/login`, {
            email: data.email,
            password: data.password
        })
        
        if(response.status === 200){
            console.log(response.data)
            setCurrentUser(response.data)
            navigate('/')
        }

        
       }
       catch(err){
        console.log(err)
       }
    }
    return(
        <>        
        <h1>Login Page</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
            <label>Email:</label>
            <input type="email" {...register('email')}/>
            <br/><br/>
            <label>Password:</label>
            <input type="password" {...register('password')} />
            <br/><br/>
            <input type="submit" value="Login" />
        </form>
        </>

    )
}