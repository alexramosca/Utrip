import { useState } from "react"
import useGetFetch from "../hooks/useGetFetch"
import { SearchBar } from "./SearchBar"

export const SearchToolBox = ({departure, arrival})=>{
    const [departureInput, setDepartureInput] = useState("")
    const [arrivalInput, setArrivalInput] = useState("")
    return(
        <>
            
            <SearchBar onChange={setDepartureInput} dlId="dlDeparture" input={departureInput} placeholder="Departure City, Province Code, Country" />
            <SearchBar onChange={setArrivalInput} dlId="dlArrival" input={arrivalInput} placeholder="Arrival City, Province Code, Country" />
            <button
                className="btnApply"
                onClick={ ()=>{
                    departure(departureInput)
                    arrival(arrivalInput)
                }}
            >
                Go
            </button>
        </>
    )
}