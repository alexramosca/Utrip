import axios from 'axios'
import { useContext, useEffect, useState} from 'react';
import { useNavigate } from "react-router-dom";
import {UserContext} from '../App'
import { useForm } from 'react-hook-form';
import { Nav } from '../components/Nav';
import './login.css'
import './landing.css'
import { Footer } from '../components/Footer';


export const Login = ()=>{
    const navigate = useNavigate()
    const [isAuth, setIsAuth] = useState( async ()=>{

        const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/users/checkAuth`, {withCredentials: true})
        if(response.status === 200){
            setIsAuth(true)
            
        }
        
    });
    

    useEffect(()=>{
        if(isAuth === true){
            navigate('/home')
            
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
            <Nav />      
           <div className='loginFormWrapper'>
            <div className='loginBoxWrapper'>
             <div className='imgLoginWrapper'>
            <img src='./images/landscape.webp' />
             </div>
             <form onSubmit={handleSubmit(onSubmit)}>
            
            <h1>Sign In</h1>
                <input placeholder='Email' className='textBox' type="email" {...register('email')}/>
                <br/><br/>
                <input placeholder='Password' className='textBox' type="password" {...register('password')} />
                <br/><br/>
                <input type="submit" value="Sign In" /> 
            </form>
            </div>
            
            </div>
            <Footer />
            </>
        )
    }
    
}