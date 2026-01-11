import { useQuery } from '@tanstack/react-query';
import { useRef, useEffect } from 'react';
import { fetchFromFirebase } from '../services/farmService.js';
import { useNotifications } from '../notifications/useNotifications';

function useDevices(firebaseUrl, enableNotifications = false) {
  const { addNotification } = useNotifications();
  const prevDevicesRef = useRef();

  const {
    data: Devices,
    isLoading: isGetDevices,
    error,
  } = useQuery({
    queryKey: ['devices', firebaseUrl],
    queryFn: async () => {
      return fetchFromFirebase(firebaseUrl);
    },
    enabled: !!firebaseUrl,
    refetchInterval: 5000,
    refetchIntervalInBackground: true, // Keep monitoring even if tab is inactive
    structuralSharing: false, // Ensure reference change even on deep equal to trigger useEffect
  });

  useEffect(() => {
    const lastData = prevDevicesRef.current;

    // Only notify if we have previous data AND it's from the SAME farm
    if (
      enableNotifications &&
      Devices &&
      lastData &&
      lastData._url === firebaseUrl
    ) {
      Object.keys(Devices).forEach((deviceName) => {
        const device = Devices[deviceName];
        const prevDevice = lastData.data[deviceName];

        if (prevDevice) {
          // Normalize status for comparison
          const currentStatus = String(
            device.Status || device.status || 'Active'
          ).toLowerCase();
          const prevStatus = String(
            prevDevice.Status || prevDevice.status || 'Active'
          ).toLowerCase();

          // 1. Detect Status Change
          if (currentStatus !== prevStatus) {
            addNotification({
              type:
                currentStatus === 'online' || currentStatus === 'active'
                  ? 'success'
                  : 'critical',
              title: 'Device Status',
              message: `${deviceName} is now ${device.Status || device.status || 'Offline'}.`,
            });
          }

          // 2. Detect Mode Change (Auto/Manual)
          if (device.Auto_change !== prevDevice.Auto_change) {
            addNotification({
              type: 'success',
              title: 'Mode Switched',
              message: `${deviceName} is now in ${device.Auto_change ? 'Auto' : 'Manual'} Mode.`,
            });
          }

          // 3. Detect ANY other value changes
          const keysToIgnore = [
            'Status',
            'status',
            'last_seen',
            'updated_at',
            'Auto_change',
          ];
          Object.keys(device).forEach((key) => {
            if (keysToIgnore.includes(key)) return;

            if (device[key] !== prevDevice[key]) {
              addNotification({
                type: 'warning',
                title: 'Device Update',
                message: `${deviceName}: ${key.replace(/_/g, ' ')} changed to ${device[key]}`,
              });
            }
          });
        }
      });
    }

    // Update ref with fresh baseline
    if (Devices) {
      prevDevicesRef.current = {
        _url: firebaseUrl,
        data: JSON.parse(JSON.stringify(Devices)), // Deep copy to ensure no accidental mutation
      };
    }
  }, [Devices, addNotification, firebaseUrl, enableNotifications]);

  return { Devices, isGetDevices, error };
}
export default useDevices;
