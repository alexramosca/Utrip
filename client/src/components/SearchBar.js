import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

export const SearchBar = ()=>{
    const [searchFocus, setSearchFocus] = useState(false)
    const navigate = useNavigate()
    const handleFocus = ()=>{
        setSearchFocus(true)
    }
    const handleBlur = ()=>{
        setSearchFocus(false)
    }
    useEffect(()=>{
        searchFocus && navigate('/home')
    }, [searchFocus, setSearchFocus])
    return(
        <div onFocus={handleFocus} onBlur={handleBlur} className="logoSearchWrapper">
            <div className="searchWrapper">
            <input list="searchList" id="searchBar" type="text"  />
            <datalist id="searchList">
            </datalist>
            <img src="../icons/search.svg" />
            </div>
        </div>
    )
}