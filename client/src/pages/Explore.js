import { Trip } from "../components/Trip";
import useGetFetch from "../hooks/useGetFetch";
import { useNavigate } from "react-router-dom";
import { Spinning } from "../components/Spinning";
import { useState, useEffect } from "react";
import './home.css';
import { PostData } from "../utilities/PostData";
import { Home } from "./Home";
import { GetData } from "../utilities/GetData";
import { SearchToolBox } from "../components/SeachToolBox";

export const Explore = () => {
  const [currentPage, setCurrentPage] = useState(1)
  const [departParam, setDepartParam] = useState("")
  const [arrivalParam, setArrivalParam] = useState("")
  const [trips, setTrips] = useState(null)
  const navigate = useNavigate()
  
  
  useEffect(()=>{
      const fetchTrips = async()=>{
        const [arrCity, arrProv] = arrivalParam.split(',').map(part => part.trim());
        const [depCity, depProv] = departParam.split(',').map(part => part.trim());
        
        try{
          let param = ""
          param += departParam?`city_departure=${depCity ?? ''}&prov_departure=${depProv ?? ''}&`:''
          param += arrivalParam?`city_arrival=${arrCity ?? ''}&prov_arrival=${arrProv ?? ''}&`:''
          const response = await GetData(`/trips?page=${currentPage}&${param}`)
          setTrips(response)
        }
        catch(err){
          console.log(err)
        }
        
      }
      fetchTrips()
      

  }, [currentPage, departParam, arrivalParam])

  useEffect(() => {
    setCurrentPage(1);
}, [departParam, arrivalParam]);

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
          <div className="searchToolsWrapper">
              <SearchToolBox departure={setDepartParam} arrival={setArrivalParam}/>
          </div>
          {trips.trips && trips.isLoading ? (
            <Spinning />
          ) : trips.error ? (
              navigate('/login')
          ) : (
            <div className="tripsPageWrapper">
              {trips && trips.trips.map((item, index) => {
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
            <div className="pageControls">
            {
            Array.from({length: trips.totalPages}, (_, index)=>{
               return (
               <small
                  onClick={()=>{
                    setCurrentPage(index + 1)
                  }}
                  className="btnPageControl" 
                  key={index+1}>
                  {index+1}
              </small>
               )
            })
            
             }
          </div>
        </div>
      );
    }
    catch(err){
      navigate('/login')
    }
  }
  
}
