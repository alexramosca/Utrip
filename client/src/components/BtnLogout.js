import { useNavigate } from "react-router-dom";



export const BtnLogout = () => {
  const navigate = useNavigate();
  
  const handleLogout = async () => {
        try{
          let response = await fetch(`${process.env.REACT_APP_API_BASE_URL ?? 'https://utrip-apiv1.onrender.com/api'}/users/logout`, {
            method: 'POST',
            credentials: 'include'
          })
          response.ok && navigate('/login')
        }
        
        catch(err){
          console.log(err)
        }
  };
 
 
  return (
    <a className="navItem" onClick={()=>{handleLogout()}}>Logout</a>
  );
};
