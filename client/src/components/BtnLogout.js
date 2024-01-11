import useGetFetch  from "../hooks/useGetFetch";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { TestComp } from "./TestComp";


export const BtnLogout = () => {
  const navigate = useNavigate();
  const [logout, setLogout] = useState(false);

 

  const handleLogout = () => {
        setLogout(true)
  };
 
 
  return (
    <>
    {logout?<TestComp />: undefined}
    <a className="navItem" onClick={handleLogout}>Logout</a>
    </>
  );
};
