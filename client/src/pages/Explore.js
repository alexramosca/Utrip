
import { useEffect, useState } from "react";
import { Trip } from "../components/Trip";
import useGetFetch from "../hooks/useGetFetch";
import { useNavigate } from "react-router-dom";

export const Explore = () => {
  const trips = useGetFetch('/trips');
  const navigate = useNavigate()
  
  {
    try{
      return (
        <div>
          {trips.data && trips.isLoading ? (
            <h1>Loading...</h1>
          ) : trips.error ? (
            <h1>Something went wrong</h1>
          ) : (
            <>
              {trips && trips?.data?.data?.map((item, index) => {
                return (
                  <Trip trip={item} />
                );
              })}
            </>
          )}
        </div>
      );
    }
    catch(err){
      navigate('/login')
    }
  }
  
};
