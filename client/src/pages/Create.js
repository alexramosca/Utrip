import axios from "axios"
import { useForm } from "react-hook-form"
import { useEffect, useState } from "react"
import { AddressDataList } from "../components/AddressDataList"

export const Create = ()=>{
    const onSubmit = async (data, e)=>{
        e.preventDefault()
        const addressObj = {
            city_departure: cities[0].locality,
            prov_departure: cities[0].region_code,
            city_arrival: destAddress[0].locality,
            prov_arrival: destAddress[0].region_code,
        }
        data = {...data, ...addressObj}
       
        try{
            const response = await axios.post(process.env.REACT_APP_API_BASE_URL + '/trips/create',
            {data},
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
        catch{
            alert('internal error, try again')
        }
    }
    const {register, handleSubmit, reset} = useForm()
    const [fromProvInput, setFromProvInput] = useState('')
    const [destProvInput, setDestProvInput] = useState('')
    const [cities, setCities] = useState(null)
    const [destAddress, setDestAddress] = useState(null)
   
    const handleFromInput = (e, set)=>{
        set(e.target.value);
    }
    const handleBlur = async (e)=>{
        const input = e.target.value
        if(input.length > 2){
            const url = `http://api.positionstack.com/v1/forward?access_key=9cec2106fdf303b9e82a25feb084b836&country=ca&query=${input}`
        const addressList = await fetchAddress(url)

        if (addressList.data.some((address) => address.label === input)) {
        alert('exist');
        } else {
        alert('not found');
        }
        }
        

    }
    const fetchAddress = async (url)=>{
        const res = await fetch(url);
        return await res.json()
    }
    const filterAddress = async (input, setFunction) => {
        let url = `http://api.positionstack.com/v1/forward?access_key=9cec2106fdf303b9e82a25feb084b836&country=ca&query=${input}`;
        if(input.trim().length>= 4){
          try{
              const dataList = await fetchAddress(url)
              const sanatizeData = dataList.data.filter((address) => {
                  return address.label && 
                  address.locality && 
                  address.region_code
                  });
              
              setFunction(sanatizeData);

          }
          catch(err){
              console.log(err)
          }
          
        }
        
      }
    
    
    useEffect(() => {
        if(destProvInput.trim === '') return
        const fetchCitiesTimeout = setTimeout(()=>filterAddress(fromProvInput, setCities), 1000)
      
        return () => clearTimeout(fetchCitiesTimeout);
      }, [fromProvInput]);

      useEffect(() => {
        if(destProvInput.trim === '') return
        const fetchAddressTimeout = setTimeout(()=>filterAddress(destProvInput, setDestAddress), 1000)

      
        return () => clearTimeout(fetchAddressTimeout);
      }, [destProvInput]);

      
    return (
        <form id="createForm" onSubmit={handleSubmit(onSubmit)}>
      <h1>Post Your Trip</h1>
      <input 
        {...register('add_departure')} 
        type="text"
        id="add_departure"
        onChange={(e)=>{handleFromInput(e, setFromProvInput)}}
        onBlur={(e)=>{handleBlur(e)}}
        placeholder="departure address ex: 123 main street, city, province, Canada" 
        list="fromProvList"/>
        <AddressDataList id="fromProvList" addresses={cities} />
      <input {...register('add_arrival')} type="text"
      onChange={(e)=>handleFromInput(e, setDestProvInput)}
      onBlur={(e)=>{handleBlur(e)}}
      placeholder="Arrival address ex. 127 street name, city, PR, Canada"
      required
      list="destProvList"
      />
       <AddressDataList id="destProvList" addresses={destAddress} />
      
      <input {...register('seats_available')} type="number" min={1} max={7} placeholder="Available seats"  required/>
      <input {...register('date')} type="date" placeholder="Date" required />
      
      <input type="submit" value="Post" />
    </form>
    )
}