import { Trip } from "../components/Trip";
import useGetFetch from "../hooks/useGetFetch";
import { useNavigate } from "react-router-dom";
import { Spinning } from "../components/Spinning";
import { useState, useEffect } from "react";
import './home.css';
import { PostData } from "../utilities/PostData";
import { Home } from "./Home";

export const Explore = () => {
  const [isAuth, setIsAuth] = useState('loading')
  const trips = useGetFetch('/trips');
  const navigate = useNavigate()

  
  const handleApplication = async (driver_id, TripId)=>{
    const body = {driver_id, TripId}
    const application = await PostData('/users/apply', body)
    if(application){
      console.log(application)
    }
  
  }
  
  {
    try{
      return (
        <div>
          <Home />
          {trips.data && trips.isLoading ? (
            <Spinning />
          ) : trips.error ? (
              navigate('/login')
          ) : (
            <div className="tripsPageWrapper">
              {trips && trips?.data?.data?.map((item, index) => {
                const driverUser = item.Users.find((user) => user.User_trip.isDriver);
                return (
                 
                  <Trip key={index} trip={item} >
                    <div className="ApplyDetailsWrapper">
                      <button className="btnApply"  onClick={()=>{handleApplication(driverUser.UserId, item.TripId)}}>Apply</button>
                    </div>
                    </Trip>
                 
                );
              })}
            </div>
          )}
        </div>
      );
    }
    catch(err){
      navigate('/login')
    }
  }
  
};
