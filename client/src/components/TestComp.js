import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import useGetFetch from "../hooks/useGetFetch";

export const TestComp = () => {
  const [fetchSuccess, setFetchSuccess] = useState(false);
  const navigate = useNavigate();
  const { fetchData } = useGetFetch('/users/logout');

  useEffect(() => {
    const fetchDataAndProcess = async () => {
      try {
        const response = await fetchData();

        if (response.status === 200) {
          setFetchSuccess(true);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchDataAndProcess();
  }, [fetchData]);

  useEffect(() => {
    if (fetchSuccess) {
      navigate('/login');
    }
  }, [fetchSuccess, navigate]);

  return null; // This component doesn't render anything
};
