import axios from 'axios'
import { useContext, useEffect, useState} from 'react';
import { useNavigate } from "react-router-dom";
import {UserContext} from '../App'
import { useForm } from 'react-hook-form';


export const Login = ()=>{
    const navigate = useNavigate()
    const [isAuth, setIsAuth] = useState( async ()=>{
        const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/trips`, {withCredentials: true})
        if(response.status === 200){
            setIsAuth(true)
            
        }
        if(response.status === 204){
            setIsAuth(false)
        }
    });
    

    useEffect(()=>{
        if(isAuth === true){
            navigate('/')
            
        }
    },[isAuth])
    const {currentUser, setCurrentUser} = useContext(UserContext)
    const { register, handleSubmit} = useForm()
    const onSubmit = async (data, e)=>{
       e.preventDefault()
       try{
        const response = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/users/login`, {
            email: data.email,
            password: data.password,
        },{withCredentials: true})
        
        if(response.status === 200){
            
            setCurrentUser(response.data)
            localStorage.setItem('user', JSON.stringify(response.data))
            setIsAuth(true)
        

        }

        
       }
       catch(err){
        console.log(err)
       }
    }

    
    if(!isAuth){
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
    
}