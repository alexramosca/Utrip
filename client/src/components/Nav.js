import { MobileNavBar } from '../components/MobileNavBar'
import { NavBar } from '../components/NavBar'
import {useEffect, useState} from 'react'


export const Nav = ()=>{
    const [isOpen, setIsOpen] = useState(false)

    const handleMenu = ()=>{
        setIsOpen(!isOpen)
    }
    useEffect(()=>{
        let modal = document.querySelector('dialog')
        let body = document.querySelector('body')
        let hamb = document.querySelector('#hambMenu')
        function handleOpen(modal){
            hamb.classList.add('rotate90')
            body.classList.add("stop")
            modal.show()
        }
        function handleClose(modal){
            hamb.classList.remove('rotate90')
            body.classList.remove("stop")
            modal.close()
        }
        isOpen ? handleOpen(modal, body, hamb):handleClose(modal, body)

    }, [isOpen])
    return(
        <>
        <nav>
            <div>
                <img id="navLogo" src='./icons/logo.png' />
            </div>
            <NavBar />
            <dialog className="mobileMenuWrapper">
             <MobileNavBar handleMenu = {handleMenu}/>
             </dialog>
            <img id='hambMenu' onClick={()=> handleMenu()} src='./icons/menu.svg' />
        </nav>
       
        </>
    )
}