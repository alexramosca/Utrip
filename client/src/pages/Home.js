import Axios from 'axios';
import { useRef, useContext, useState} from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from "react-router-dom";
import { Modal } from '../components/Modal';
import { useForm } from 'react-hook-form';
import { UserContext } from '../App';
import axios from 'axios';



export const Home = () => {
    
    const [isCreateMode, setIsCreateMode] = useState(null)
    const [tripSelected, setTripSelected] = useState(null)
    const navigate = useNavigate()
    const queryClient = useQueryClient();
    const {currentUser, setCurrentUser} = useContext(UserContext)
    localStorage.setItem('userId', currentUser.UserId)
    const localId = localStorage.getItem('userId')
    localId && setCurrentUser(localId)
    
    const onSubmit = async (data, e) => {
        e.preventDefault()
        if(data){
            const response =  await Axios.post(`${process.env.REACT_APP_API_BASE_URL}/trips/create`,{
                userId: currentUser.UserId,
                ...data
            } 
            ,
            {
                withCredentials: true
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
    const handleApplication = async (tripId)=>{
        
        let response = await Axios.post(process.env.REACT_APP_API_BASE_URL + '/users/apply',{
            tripId : tripId,
            userId : currentUser.UserId
        })
        if(response.status === 201){
            alert("You have been added successfuly to the trip")
            queryClient.invalidateQueries('any');
           
        }
        else {
            alert("something went Wrong, please try again")
        }
    }
    const logOut = async()=>{
        //change to POST in production
        let response = await Axios.get(process.env.REACT_APP_API_BASE_URL + '/users/logout', 
        {withCredentials: true})
        navigate('/login')
    }
    
    //Main query
    const {data, isLoading, error} = useQuery({
        queryKey: ['any'],
        queryFn: async ()=>{
        const res = await Axios.get(process.env.REACT_APP_API_BASE_URL + '/trips', {
            withCredentials: true
        });
            return res.data;
    }})

    const fetchTrip = async (tripId)=>{
        const response = await Axios.get(`${process.env.REACT_APP_API_BASE_URL}/trips/${tripId}`,{withCredentials: true})
        if(response.status === 200)
            setTripSelected(response.data)
    }

    if(isLoading) return <h3>Loading...</h3>
    if(error) return <h3>Data not Found</h3>
    console.log(currentUser)
  return (
    <>
    
    <button onClick={()=>{handleOpen(true)}} >Create Trip</button>
    <button onClick={logOut}>Logout</button>
    <Modal ref={dialogRef} >

    <h1>{isCreateMode?'Create ':'View '}trip</h1>
    <form onSubmit={handleSubmit(onSubmit)}>
  {!isCreateMode && (
    <>
      Trip Id: <input disabled value={tripSelected?.TripId || ''} />
      
    </>
  )}
  Origin: <input {...register('from')} type='text' defaultValue={isCreateMode ? '' : tripSelected?.from || ''} readOnly={!isCreateMode} /> <br />
  Destination: <input {...register('destiny')} type='text' defaultValue={isCreateMode ? '' : tripSelected?.destiny || ''} readOnly={!isCreateMode} /> <br />
  Date: <input {...register('date')} type='date' defaultValue={isCreateMode ? '' : tripSelected?.date || ''} readOnly={!isCreateMode} /> <br />
  Passengers Number: <input {...register('passagerLimit')} defaultValue={isCreateMode ? '' : tripSelected?.passagerLimit || ''} type='number' min={1} max={7} readOnly={!isCreateMode} />
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
            <button onClick={(e) => { e.stopPropagation(); handleApplication(trip.TripId) }}>Apply</button>


        </div>
    })}
    </>
  )
  
}

