import { useQuery } from '@tanstack/react-query';
import Axios from 'axios'


export const Test = () =>{
    const {data, isLoading, error} = useQuery({
        queryKey: ['any'],
        queryFn: async ()=>{
        const res = await Axios.get(process.env.REACT_APP_API_BASE_URL + '/users/logout', {
            withCredentials: true
        });
            return res.data;
    }})

    return(
        <p>im out of here</p>
    )
}
