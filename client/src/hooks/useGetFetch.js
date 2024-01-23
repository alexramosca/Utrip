import { useQuery } from "@tanstack/react-query";
import axios from 'axios';
import { useNavigate } from "react-router-dom";

const useGetFetch = (url) => {
  const navigate = useNavigate()
  const fetchData = async () => {
    const res = await axios.get(process.env.REACT_APP_API_BASE_URL + url, {
      withCredentials: true
    });
    if(res.status > 400){
      navigate('/login')
    }
    return res;
  };

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ['main'],
    queryFn: fetchData,
  });

  return { data, isLoading, error, fetchData, refetch};
};

export default useGetFetch;
