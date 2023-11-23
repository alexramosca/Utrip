import Axios from 'axios';
import { useRef, useContext, useState} from 'react';
import { useQuery } from '@tanstack/react-query';
import { useNavigate } from "react-router-dom";
import { Modal } from '../components/Modal';
import { useForm } from 'react-hook-form';
import { UserContext } from '../App';



export const Home = () => {
    const [isCreateMode, setIsCreateMode] = useState(null)
    const [tripSelected, setTripSelected] = useState(null)
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
    const handleOpen = (mode, tripId)=>{
        setIsCreateMode(mode)
        if(!mode){
            fetchTrip(tripId).then(()=>{
                dialogRef.current.showModal()
            })
        }
        else
            dialogRef.current.showModal()
        
    }
    const handleClose = (e)=>{
        setIsCreateMode(null)
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

    const fetchTrip = async (tripId)=>{
        const response = await Axios.get(`${process.env.REACT_APP_API_BASE_URL}/trips/${tripId}`)
        if(response.status === 200)
            setTripSelected(response.data)
    }

    if(isLoading) return <h3>Loading...</h3>
    if(error) return <h3>Data not Found</h3>
    console.log(currentUser)
  return (
    <>
    
    <button onClick={()=>{handleOpen(true)}} >Create Trip</button>
    <Modal ref={dialogRef} >

    <h1>{isCreateMode?'Create ':'View '}trip</h1>
    <form onSubmit={handleSubmit(onSubmit)}>
  {!isCreateMode && (
    <>
      Trip Id: <input disabled value={tripSelected?.TripId || ''} />
      
    </>
  )}
  Origin: <input {...register('from')} type='text' value={isCreateMode ? '' : tripSelected?.from || ''} readOnly={!isCreateMode} /> <br />
  Destination: <input {...register('destiny')} type='text' value={isCreateMode ? '' : tripSelected?.destiny || ''} readOnly={!isCreateMode} /> <br />
  Date: <input {...register('date')} type='date' value={isCreateMode ? '' : tripSelected?.date || ''} readOnly={!isCreateMode} /> <br />
  Passengers Number: <input {...register('passagerLimit')} value={isCreateMode ? '' : tripSelected?.passagerLimit || ''} type='number' min={1} max={7} readOnly={!isCreateMode} />
  <input type='submit' value={isCreateMode ? 'Share' : 'Apply'} />
  <button onClick={handleClose}>Cancel</button>
</form>
        
    </Modal>
    {data.map((trip)=>{
        return <div onClick={()=>{handleOpen(false, trip.TripId)}} className='App' key={trip.TripId}>
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

