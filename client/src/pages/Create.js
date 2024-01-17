import axios from "axios"
import { useForm } from "react-hook-form"

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
    return (
        <form onSubmit={handleSubmit(onSubmit)}>
      <h1>Post Your Trip</h1>
      <input {...register('from')} type="text" placeholder="From" />
      <input {...register('destination')} type="text" placeholder="Destination" />
      <input {...register('availableSeats')} type="number" min={1} max={7} placeholder="Available seats" />
      <input {...register('date')} type="date" placeholder="Date" />
      <input type="submit" value="Post" />
    </form>
    )
}