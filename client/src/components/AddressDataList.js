export const AddressDataList = (props)=>{
    return (
        <datalist id={props.id}>
        {props.addresses && props.addresses.map((address, index)=>{
            return <option key={index}>{address.label}</option>
        })}
      </datalist>
    )
}