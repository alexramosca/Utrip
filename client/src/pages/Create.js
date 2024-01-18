import axios from "axios"
import { useForm } from "react-hook-form"
import { ProvincesOptions } from "../components/ProvincesOptions"
import { useEffect, useState } from "react"
import { AddressDataList } from "../components/AddressDataList"


export const Create = ()=>{
    const onSubmit = async (data, e)=>{
        e.preventDefault()
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
    const [isAddSelected, setIsAddSelected] = useState(false)
    const [isDestSelected, setIsDestSelected] = useState(false)
    const handleFromInput = (e, set)=>{
        set(e.target.value);
    }
    const handleBlur = (e, array, set, setSelect)=>{
            if(array && array.length > 0){
               const revisionedAddress = array.filter((address)=>{
                   return address.label.toLowerCase().includes(e.target.value.toLowerCase());
               })
               set(revisionedAddress)
               if(revisionedAddress && revisionedAddress[0].label.toLowerCase() === e.target.value.toLowerCase()){
               return setSelect(true)
           }
           setSelect(false)
       

    }
    
}
    useEffect(() => {
        if (fromProvInput.trim() === '') return;
        const fetchCitiesTimeout = setTimeout(async () => {
          let url = `http://api.positionstack.com/v1/forward?access_key=9cec2106fdf303b9e82a25feb084b836&country=ca&query=${fromProvInput}`;
          if(fromProvInput.trim().length>= 4){
            try{
                const res = await fetch(url);
                const data = await res.json()
                const sanatizeData = data.data.filter((address) => {
                    return address.label && address.locality && address.region_code
                    });
                setCities(sanatizeData);

            }
            catch(err){
                console.log(err)
            }
            
          }
          
        }, 1000);
      
        return () => clearTimeout(fetchCitiesTimeout);
      }, [fromProvInput]);

      useEffect(() => {
        if (destProvInput.trim() === '') return;
        const fetchAddressTimeout = setTimeout(async () => {
          let url = `http://api.positionstack.com/v1/forward?access_key=9cec2106fdf303b9e82a25feb084b836&country=ca&query=${destProvInput}`;
          if(destProvInput.trim().length>= 4){
            try{
                const res = await fetch(url);
                const data = await res.json()
                const sanatizeData = data.data.filter((address) => {
                    return address.label && address.locality && address.region_code
                    });
                setDestAddress(sanatizeData);

            }
            catch(err){
                console.log(err)
            }
            
          }
          
        }, 1000);
      
        return () => clearTimeout(fetchAddressTimeout);
      }, [destProvInput]);
    return (
        <form id="createForm" onSubmit={handleSubmit(onSubmit)}>
      <h1>Post Your Trip</h1>
      <input 
        type="text" 
        {...register('add_departure')} 
        onFocus={()=>setIsAddSelected(false)}
        onBlur={(e)=> {
            handleBlur(e, cities, setCities, setIsAddSelected)
       }}
        onChange={(e)=>{handleFromInput(e, setFromProvInput)}} 
        placeholder="departure address ex: 123 main street, city, province, Canada" 
        list="fromProvList"/>
      <input 
            {...register('city_departure')} 
            type="text" 
            value={isAddSelected && cities && cities.length > 0 ? cities[0].locality : ''}
            placeholder="departure City" readOnly
             />
      <select {...register('prov_departure')} value={isAddSelected && cities && cities.length > 0?cities[0].region_code:''} required>
        <ProvincesOptions />
      </select>
      <AddressDataList id="fromProvList" addresses={cities} />
      
      <input {...register('add_arrival')} type="text"
      onChange={(e)=>handleFromInput(e, setDestProvInput)}
      onBlur={(e)=>{handleBlur(e, destAddress, setDestAddress, setIsDestSelected)}}
      onFocus={(e)=>{setIsDestSelected(false)}}
      placeholder="Arrival address ex. 127 street name, city, PR, Canada"
      list="destProvList"
      />
       <AddressDataList id="destProvList" addresses={destAddress} />
      <input {...register('city_arrival')} 
        value={isDestSelected && destAddress && destAddress.length > 0 ? destAddress[0].locality : ''}
        type="text" 
        placeholder="arrival City"
         />
      <select {...register('prov_arrival')} value={isDestSelected && destAddress && destAddress.length > 0?destAddress[0].region_code:''} required>
        <ProvincesOptions />
      </select>
      <input {...register('seats_available')} type="number" min={1} max={7} placeholder="Available seats" />
      <input {...register('date')} type="date" placeholder="Date" />
      
      <input type="submit" value="Post" />
    </form>
    )
}