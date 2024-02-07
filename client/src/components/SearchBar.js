import { AddressDataList } from "./AddressDataList"




export const SearchBar = ({onChange, dlId, input, placeholder})=>{
   
    return(
        <div  className="logoSearchWrapper">
            <div className="searchWrapper">
            <input onChange={(e)=>{
                onChange(e.target.value)
            }}
                 list={dlId} 
                 id="searchBar" 
                 type="text"
                 placeholder={placeholder}
                 />
            <AddressDataList id={dlId} input={input} />
            <img src="../icons/search.svg" />
            </div>
        </div>
    )
}