import './landing.css'
import {useEffect, useState} from 'react'
import { MobileNavBar } from '../components/MobileNavBar'
import { Nav } from '../components/Nav'


import { LandingCard } from '../components/LandingCard'
import { BecomeCard } from '../components/BecomeCard'
import { Slider } from '../components/Slider'
import { Footer } from '../components/Footer'

export const Landing = () =>{
    
    //This obj is used to "feed" the becomeCards components
    
    return (
        <>
        <Nav />
        <section>
            
            <div className="bannerWrapper">
                <img src="images/banner.webp" />
            </div>
            <h1>We Connect Drivers and Passengers</h1>
            <div className='cardsWrapper'>
                
            <LandingCard
                 src="./icons/coin.svg" 
                 title="Sign up for free" 
                 text="Drivers and passengers don’t pay any registration or membership fee" />
            <LandingCard 
                src="./icons/car.svg" 
                title="Share costs" 
                text="Find a partner to share costs whenever is convenient for you. " />
            <LandingCard 
                src="./icons/geo.svg"
                title="Long Distances"
                text="Post or book a ride everywhere in Canada. Anytime you need" />
            <LandingCard
            src="./icons/credit-card.svg" 
            title="Online Payment" 
            text="Book and pay your seat online for long distance rides. We facilitate for you" />
            </div>
            <div className='actionDiv'>
                <h2>Come aboard with thousands of members</h2>
                <div>
                <button>Sign Up</button>
                <button>Sign In</button>
                </div>
            </div>
        </section>
        <article className='becomeCardsWrapper'>
            
              
        </article>
        <article>
      
            <BecomeCard image="./images/driver.webp" >

            </BecomeCard>
        
        <h2>How uTrip works</h2>
            <div className='howWorksCardsWrapper'>
            
                <LandingCard src={"./icons/geo.svg" } title="Posted ride offers" text="Driver posts a ride offer for a trip anywhere in Canada" />
                <LandingCard src={"./icons/credit-card.svg" } title="Seat booking & payment" text="You book your seat online. Driver & passenger then communicate." />
                <LandingCard src={"./icons/car.svg" } title="Start your Trip" text="Driver and passenger meet for the trip." />

            </div>
            
        </article>
        
        <section id="sliderSection">
            <h2>Explore New Destinations</h2>
            <Slider />
        </section>
      <Footer />
        </>
        
    )
}