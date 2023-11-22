import Axios from 'axios';
import { useQuery } from '@tanstack/react-query';

export const Home = () => {
    const {data, isLoading, error} = useQuery({
        queryKey: ['any'],
        queryFn: async ()=>{
        const res = await Axios.get(process.env.REACT_APP_API_BASE_URL + '/trips');
            return res.data;
    }})

    if(isLoading) return <h3>Loading...</h3>
    if(error) return <h3>Data not Found</h3>
    console.log(data)
  return (
    
    data.map((trip)=>{
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
    })
  )
};
