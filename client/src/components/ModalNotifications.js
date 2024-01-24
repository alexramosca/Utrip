import { useEffect, useState } from "react";
import { GetData } from "../utilities/GetData";
import { NotificationLine } from "./NotificationLine";

export const ModalNotifications = () => {
  const [applications, setApplications] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await GetData('/users/applicationsbyuser');
        const filteredResponse = response.filter((item)=>{
            return item.is_active === false
        })
        setApplications(filteredResponse);
      } catch (error) {
        console.error('Error fetching data:', error);
        
      }
    };

    fetchData(); // Call the async function within the useEffect

  }, []); // Empty dependency array means it will run once when the component mounts

  return (
    <div className="modal">
      <h1>Notifications</h1>
      {applications && applications?.map((item, index) => {
        return <NotificationLine key={index} application={item} />
      }
        
      )}
    </div>
  );
};
