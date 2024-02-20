import axios from 'axios'
import {useEffect, useState} from 'react';
import { useNavigate } from "react-router-dom";
import { useForm } from 'react-hook-form';
import { Nav } from '../components/Nav';
import './login.css'
import './landing.css'
import { Footer } from '../components/Footer';
import { Spinning } from '../components/Spinning';


export const Login = ()=>{
    const navigate = useNavigate()
    const [isAuth, setIsAuth] = useState('loading')
    /*useEffect( ()=>{
        const fetchAuth = async ()=>{
            try{
                const response = await fetch(process.env.REACT_APP_API_BASE_URL + '/users/checkAuth',{
                   credentials: "include"
                })
                if(response.ok){
                    setIsAuth(true)
                }
                
            }
            catch{
                
                    setIsAuth(false)
                
            }
            
    
        }
        fetchAuth()
    
    }, [])*/
    useEffect(()=>{
        if(isAuth === true){
            navigate('/dash/explore')
            
        }
    },[isAuth, navigate])
       const { register, handleSubmit} = useForm()
       const onSubmit = async (data, e)=>{
         e.preventDefault()
        try{
            const url = `${(process.env.REACT_APP_API_BASE_URL || 'https://utrip-apiv1.onrender.com/api')}/users/login`;
            const body = JSON.stringify({
            email: data.email,
            password: data.password,
            });

            const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: body,
            credentials: 'include', 
            };
            const response = await fetch(url, options);
            const responseData = await response.json();
        
        if(response.status === 200){
            setIsAuth(true)
        }
       }
       catch(err){
        console.log(err)
       }
    }

    
    
    
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