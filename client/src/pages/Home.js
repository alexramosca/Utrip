import axios from 'axios'
import {useEffect} from 'react'
export const Home = ()=>{
    useEffect(()=>{
        axios.get(process.env.API_BASE_URL + '/users').then((data)=>{
            console.log(data)
        })
    }, [])
    return(
        <h1>Home Page</h1>
    )
}