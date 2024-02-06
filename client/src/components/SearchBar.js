



export const SearchBar = ({onChange})=>{
   
    return(
        <div  className="logoSearchWrapper">
            <div className="searchWrapper">
            <input onChange={(e)=>{
                onChange(e.target.value)
            }} list="searchList" id="searchBar" type="text"  />
            <datalist id="searchList">
            </datalist>
            <img src="../icons/search.svg" />
            </div>
        </div>
    )
}