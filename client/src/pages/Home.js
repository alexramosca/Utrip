import Axios from 'axios';
import { useRef, useContext} from 'react';
import { useQuery } from '@tanstack/react-query';
import { useNavigate } from "react-router-dom";
import { Modal } from '../components/Modal';
import { useForm } from 'react-hook-form';
import { UserContext } from '../App';

export const Home = () => {
    const navigate = useNavigate()
    const {currentUser} = useContext(UserContext)
    const onSubmit = async (data, e) => {
        e.preventDefault()
        if(data){
            const response =  await Axios.post(`${process.env.REACT_APP_API_BASE_URL}/trips/create`,{
                userId: currentUser.UserId,
                ...data
            } 
            ,
            {
                headers: {
                  'Content-Type': 'application/json'
                },
            }
            )
            if(response.status === 200){
                handleClose(e)
                reset()
                navigate('/')
            }
        }
        
    }
    const { register, handleSubmit, reset} = useForm();
    
    const dialogRef = useRef(null)
    const handleOpen = ()=>{
        dialogRef.current.showModal()
    }
    const handleClose = (e)=>{
        e.preventDefault()
        reset()
        dialogRef.current.close()
    }
    
    const {data, isLoading, error} = useQuery({
        queryKey: ['any'],
        queryFn: async ()=>{
        const res = await Axios.get(process.env.REACT_APP_API_BASE_URL + '/trips');
            return res.data;
    }})

    if(isLoading) return <h3>Loading...</h3>
    if(error) return <h3>Data not Found</h3>
    console.log(currentUser)
  return (
    <>
    
    <button onClick={handleOpen} >Create Trip</button>
    <Modal ref={dialogRef} >
    <h1>Modal test</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        origin: <input {...register('from')} type='text' /> <br />
        destination: <input {...register('destiny')} type='text' /> <br />
        date: <input {...register('date')} type='date' /> <br />
        Passagers Number: <input {...register('passagerLimit')} type='number' min={1} max={7} />
        <input type='submit' value="send"/>
        <button onClick={handleClose}>cancel</button>
      </form>
        
    </Modal>
    {data.map((trip)=>{
        return <div className='App' key={trip.TripId}>
            <h1>{trip.from}</h1>
            <h1>{trip.destiny}</h1>
            <h2>{trip.date}</h2>
            <div>
                {trip.Users.map((user)=>{
                    return <p className={user.User_trip.isDriver?"green":"red"}
                            key={user.UserId}>{user.firstName}
                            </p>
                })}
            </div>
        </div>
    })}
    </>
  )
  
}

