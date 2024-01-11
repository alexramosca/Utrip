import { useQuery } from "@tanstack/react-query"
import axios from 'axios'

export const usePostFetch = (msg)=>{
    const {data, isLoading, error} = useQuery({
        queryKey: ['main'],
        queryFn: async ()=>{
        const res = await axios.get(process.env.REACT_APP_API_BASE_URL + '/trips', {
            withCredentials: true
        });
            return res.data;
    }})
}