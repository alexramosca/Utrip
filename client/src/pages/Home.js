import { Outlet } from "react-router-dom"
import {useState, useEffect} from 'react'
import { SearchBar } from "../components/SearchBar"
import { Menu } from "../components/Menu"
import { BtnLogout } from "../components/BtnLogout"
import './home.css'



export const Home = () => {
    const [isOpen, setIsOpen] = useState(false)
    const handleMenu = ()=>{
        setIsOpen(!isOpen)
    }
    const navMenuItems = [
        { name: 'Explore', path: '/dash/explore' },
        {name: 'Create', path: '/dash/create'},
        { name: 'MyTrips', path: '/dash/mytrips' },
        { name: 'Settings', path: '/settings' },
        
      ];
      useEffect(() => {
        const body = document.querySelector('body');
        
        if (isOpen) {
          body.classList.add('lock');
        } else {
          body.classList.remove('lock');
        }
    
        return () => {
          body.classList.remove('lock');
        };
      }, [isOpen]);
      
    return(
        <>
        <nav className="painelNav">
          <div>
        <img id="navLogo" src='/icons/logo.png' />
        </div>
          <SearchBar />
         
            <img 
            className={isOpen ? 'rotate90' : undefined} 
            onClick={handleMenu}
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
           
            
           
            
        </nav>
        </>
    )
   
}

