import { useEffect, useState } from "react";
import { FetchAddress } from "../utilities/FetchAddress";

//This component expects to receive a datalist ID and an input as props
export const AddressDataList = (props) => {
    const [data, setData] = useState(null);
    

    useEffect(() => {
        const fetchData = async () => {
            try {
                let response = await FetchAddress( props.input);
                setData(response);
            } catch (err) {
                console.log(err);
            }
        };

        if (props.input.trim().length >= 3) {
            const timeoutId = setTimeout(fetchData, 1000);

            return () => clearTimeout(timeoutId);
        }

        return;
    }, [props.input]);

    return (
        <datalist id={props.id}>
            {data
                ? data.map((address, index) => {
                      return <option key={index}>{address.data.label}</option>;
                  })
                : ""}
        </datalist>
    );
};
