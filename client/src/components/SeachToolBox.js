import { useState } from "react"
import useGetFetch from "../hooks/useGetFetch"
import { SearchBar } from "./SearchBar"

export const SearchToolBox = ({departure, arrival})=>{
    const [departureInput, setDepartureInput] = useState("")
    const [arrivalInput, setArrivalInput] = useState("")
    return(
        <>
            
            <SearchBar onChange={setDepartureInput} placeholder="Departure City" />
            <SearchBar onChange={setArrivalInput} placeholder="Arrival City" />
            <button
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