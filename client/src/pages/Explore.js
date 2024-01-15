import { Trip } from "../components/Trip";
import useGetFetch from "../hooks/useGetFetch";
import { useNavigate } from "react-router-dom";
import { Spinning } from "../components/Spinning";
import { useState, useEffect } from "react";

export const Explore = () => {
  const [isAuth, setIsAuth] = useState('loading')
  const trips = useGetFetch('/trips');
  const navigate = useNavigate()
  
  {
    try{
      return (
        <div>
          {trips.data && trips.isLoading ? (
            <Spinning />
          ) : trips.error ? (
            navigate('/login')
          ) : (
            <>
              {trips && trips?.data?.data?.map((item, index) => {
                return (
                  <Trip key={index} trip={item} />
                );
              })}
            </>
          )}
        </div>
      );
    }
    catch{
      navigate('/login')
    }
  }
  
};
