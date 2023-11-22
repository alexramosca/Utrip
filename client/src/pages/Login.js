import axios from 'axios'
import { useForm } from 'react-hook-form';
export const Login = ()=>{
    const { register, handleSubmit} = useForm()
    const onSubmit = async (data, e)=>{
       e.preventDefault()
       try{
        const response = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/users/login`, {
            email: data.email,
            password: data.password
        })
        console.log(response)
        if(response.status === 200){
            alert("login success")
            window.location.href = "/"
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