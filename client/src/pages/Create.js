import axios from "axios"
import { useForm } from "react-hook-form"
import { useState } from "react"
import { AddressDataList } from "../components/AddressDataList"
import { Home } from "./Home"
import { FetchAddress } from "../utilities/FetchAddress"

export const Create = ()=>{
    const onSubmit = async (data, e)=>{
        try{
            e.preventDefault()
        
        const add_departure = await FetchAddress(data.add_departure)
        console.log("departure", add_departure)
        const cities = add_departure.find((address)=> data.add_departure.toLowerCase() === address.data.label.toLowerCase())
        console.log('cities', cities)
        const dest_address = await FetchAddress(data.add_arrival)
        const destAddress = dest_address.find((address)=> data.add_arrival.toLowerCase() === address.data.label.toLowerCase())
       
        const addressObj = {
            city_departure: cities.data.locality,
            prov_departure: cities.data.region_code,
            city_arrival: destAddress.data.locality,
            prov_arrival: destAddress.data.region_code,
        }
        const upData = {...data, ...addressObj}
        console.log(upData)

            const response = await axios.post((process.env.REACT_APP_API_BASE_URL || 'https://utrip-apiv1.onrender.com/api')+ '/trips/create',
            {upData},
            {withCredentials: true}
            ,)
            if(response.status === 200){
                alert('Trip created successfully!');
                reset()
            }
            else {
                alert('something went wrong')
            }
        }
        catch(err){
            console.log(err)
        }
    }
    const {register, handleSubmit, reset} = useForm()
    const [fromInput, setFromInput] = useState('')
    const [destInput, setDestInput] = useState('')
    
   
    const handleInput = (e, set)=>{
        set(e.target.value);
    }
    return (
        <>
        <Home />
        <form id="createForm" onSubmit={handleSubmit(onSubmit)}>
      <h1>Post Your Trip</h1>
      <input 
        {...register('add_departure')} 
        type="text"
        id="add_departure"
        onChange={(e)=>{handleInput(e, setFromInput)}}
        
        placeholder="departure address ex: 123 main street, city, province, Canada" 
        list="fromProvList"/>
        <AddressDataList id="fromProvList" input={fromInput} />
       
      <input {...register('add_arrival')} type="text"
      onChange={(e)=>handleInput(e, setDestInput)}
   
      placeholder="Arrival address ex. 127 street name, city, PR, Canada"
      required
      list="destProvList"
      />
      
       <AddressDataList id="destProvList" input={destInput} />
      
      <input {...register('seats_available')} type="number" min={1} max={7} placeholder="Available seats"  required/>
      <input {...register('date')} type="date" placeholder="Date" required />
      
      <input type="submit" value="Post" />
    </form>
    </>
    )
}