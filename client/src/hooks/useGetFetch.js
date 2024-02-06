import { useQuery } from "@tanstack/react-query";
import axios from 'axios';


const useGetFetch = (url) => {
  const fetchData = async () => {
    const {data} = await axios.get(url, {
      withCredentials: true
    });
    return data;
  };

  const { data, isLoading, error} = useQuery({
    queryKey: ['main'],
    queryFn: fetchData,
  });

  return { data, isLoading, error, fetchData};
};

export default useGetFetch;
