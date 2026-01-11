import { useRef, useEffect, useMemo } from 'react';
import useDevices from '../hooks/useDevices';
import useGetUserFarms from '../hooks/useGetUserFarms';
import { useNotifications } from '../notifications/useNotifications';

const FarmMonitor = ({ firebaseUrl }) => {
  // Call useDevices with enableNotifications = true for background monitoring
  useDevices(firebaseUrl, true);
  return null;
};

const GlobalDeviceMonitor = () => {
  const { userFarm, isLoading } = useGetUserFarms();
  const { addNotification } = useNotifications();
  const farms = useMemo(() => userFarm?.docs || [], [userFarm?.docs]);
  const prevFarmsRef = useRef();

  useEffect(() => {
    if (farms.length > 0 && prevFarmsRef.current) {
      farms.forEach(farm => {
        const prevFarm = prevFarmsRef.current.find(f => f._id === farm._id);
        
        if (prevFarm && prevFarm.active !== farm.active) {
          addNotification({
            type: farm.active ? 'success' : 'critical',
            title: 'Farm Status Updated',
            message: `Farm "${farm.name}" is now ${farm.active ? 'Active' : 'Deactivated'}.`,
          });
        }
      });
    }
    
    // Update ref with deep copy of current farms state
    if (!isLoading && userFarm?.docs) {
      prevFarmsRef.current = JSON.parse(JSON.stringify(userFarm.docs));
    }
  }, [farms, addNotification, isLoading, userFarm?.docs]);

  if (isLoading) return null;

  return (
    <>
      {farms.map(farm => (
        <FarmMonitor key={farm._id} firebaseUrl={farm.firebaseUrl} />
      ))}
    </>
  );
};

export default GlobalDeviceMonitor;

