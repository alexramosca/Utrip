import { useEffect, useState } from "react"
import { Spinning } from "../components/Spinning"
import { Trip } from "../components/Trip"
import useGetFetch from "../hooks/useGetFetch"
import { GetData } from "../utilities/GetData"
import { Home } from "./Home"

export const MyTrips = ()=>{
   
        const [trips, setTrips] = useState(null)
    
        useEffect(()=>{
            const fetch = async()=>{
                try{
                    const response =  await GetData('/trips/mytrips')
                    setTrips(response)
                }
                catch(err){
                    console.log("Error: ", err)
                }
            }
            fetch()
        }, [])

        if(trips){
            console.log(trips)
            return (
                <div className="tripsPageWrapper">
                <Home />
                {trips.map((item, index)=>{
                    return <Trip key={index} trip={item} >
                        </Trip>
                })}
                </div>
            )
        }
    
}