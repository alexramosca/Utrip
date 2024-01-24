import { Outlet } from "react-router-dom"
import {useState, useEffect} from 'react'
import { SearchBar } from "../components/SearchBar"
import { Menu } from "../components/Menu"
import { BtnLogout } from "../components/BtnLogout"
import './home.css'
import { set } from "react-hook-form"
import { ModalNotifications } from "../components/ModalNotifications"



export const Home = () => {
    const [isOpen, setIsOpen] = useState(false)
    const [isNotificationOpen, setIsNotificationOpen] = useState(false)

    const handleMenu = (setFunction, state)=>{
        setFunction(!state)
    }
    const navMenuItems = [
        { name: 'Explore', path: '/dash/explore' },
        {name: 'Create', path: '/dash/create'},
        { name: 'MyTrips', path: '/dash/mytrips' },
        { name: 'Settings', path: '/settings' },
        
      ];
      useEffect(() => {
        const body = document.querySelector('body');
        
        if (isOpen || isNotificationOpen) {
          body.classList.add('lock');
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
         {/*} <SearchBar />*/}
         
            <img 
            className={isOpen ? 'rotate90' : undefined} 
            onClick={()=>{handleMenu(setIsOpen, isOpen)}}
            id='hambMenu' src='/icons/menu.svg' />
            
            <div className="navWrapper">
              <ul>
                <Menu menu = {navMenuItems} />
                <BtnLogout />
              </ul>          
            </div>
            <div className={isOpen?"mobileMenu opacity100":"mobileMenu opacity0"} >
              <ul id="ulMenu">
                <Menu menu = {navMenuItems} />
                <BtnLogout />
                </ul>

            </div>
           
            
           
            <div onClick={()=>{handleMenu(setIsNotificationOpen, isNotificationOpen)}} className="notImgWrapper">
              <img id="iconBell" src="/icons/notification.svg" alt="bell icon" />
            </div>
        </nav>

        {isNotificationOpen?<ModalNotifications />:undefined}
        </>
    )
   
}

