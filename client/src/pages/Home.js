import {useState, useEffect} from 'react'
import { SearchBar } from "../components/SearchBar"
import { Menu } from "../components/Menu"
import { BtnLogout } from "../components/BtnLogout"
import './home.css'
import { ModalNotifications } from "../components/ModalNotifications"



export const Home = () => {
    const [isOpen, setIsOpen] = useState(false)
    const [update, setUpdate] = useState(false)
    const [isNotificationOpen, setIsNotificationOpen] = useState(false)

    const handleMenu = (setFunction, state)=>{
        setFunction(!state)
       
    }
    const navMenuItems = [
        { name: 'Explore', path: '/dash/explore' },
        {name: 'Create', path: '/dash/create'},
        { name: 'MyTrips', path: '/dash/mytrips' },
        { name: 'Settings', path: '/dash/settings' },
        
      ];
      //use effect to handle live notifications
      useEffect(()=>{
        const eventSource = new EventSource((process.env.REACT_APP_API_BASE_URL || 'https://utrip-apiv1.onrender.com/api')+'/users/sse', {withCredentials: true})
        eventSource.onmessage = (event) =>{
          const eventData = JSON.parse(event.data)
          if(eventData)
            setUpdate(true)
    
          eventSource.onerror = (error) => {
            // Handle SSE connection errors
            console.error('SSE Error:', error);
          };
      
          // Clean up the SSE connection when the component unmounts
          return () => {
            eventSource.close();
            setUpdate(false)
          };
        }
      }, [update])
      useEffect(() => {
        const body = document.querySelector('body');
        
        if (isOpen || isNotificationOpen) {
          body.classList.add('lock');
          setUpdate(false)
        } else {
          body.classList.remove('lock');
        }
    
        return () => {
          body.classList.remove('lock');
        };
      }, [isOpen, isNotificationOpen]);
      
    return(
        <>
        <nav className="painelNav">
          <div>
        <img id="navLogo" src='/icons/logo.png' />
        </div>
        
            <div className='mobileNotificationDiv'>
            <div onClick={()=>{handleMenu(setIsNotificationOpen, isNotificationOpen)}} className={update?'notImgWrapper circleClass': 'notImgWrapper'}>
                  <img id="iconBell" src="/icons/notification.svg" alt="bell icon" />
              </div> 
            </div>
            <img 
            className={isOpen ? 'rotate90' : undefined} 
            onClick={()=>{handleMenu(setIsOpen, isOpen)}}
            id='hambMenu' src='/icons/menu.svg' />
            
            <div className="navWrapper">
              <ul>
                <Menu menu = {navMenuItems} />
                <BtnLogout />
              </ul>
                <div onClick={()=>{handleMenu(setIsNotificationOpen, isNotificationOpen)}} className={update?'notImgWrapper circleClass': 'notImgWrapper'}>
                  <img id="iconBell" src="/icons/notification.svg" alt="bell icon" />
              </div>         
            </div>
            <div className={isOpen?"mobileMenu opacity100":"mobileMenu opacity0"} >
              <ul id="ulMenu" className={isOpen?"mobileMenu opacity100":"mobileMenu opacity0"}>
                <Menu menu = {navMenuItems} />
                <BtnLogout />
                </ul>

            </div>
           
            
           
            
           
        </nav>

        {isNotificationOpen?<ModalNotifications />:undefined}
        </>
    )
   
}

