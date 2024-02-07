import { useState } from "react"
import useGetFetch from "../hooks/useGetFetch"
import { SearchBar } from "./SearchBar"

export const SearchToolBox = ({departure, arrival})=>{
    const [departureInput, setDepartureInput] = useState("")
    const [arrivalInput, setArrivalInput] = useState("")
    return(
        <>
            
            <SearchBar onChange={setDepartureInput} dlId="dlDeparture" input={departureInput} placeholder="Departure" />
            <SearchBar onChange={setArrivalInput} dlId="dlArrival" input={arrivalInput} placeholder="Arrival" />
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