import { motion } from 'framer-motion';
import { useState, useMemo } from 'react';
import SelectFarm from './SelectFarm';
import useDevices from './useDevices';
import LoadingCircul from '../../ui/LoadingCircul.jsx';

const Insights = () => {
  const [selectedFarm, setSelectedFarm] = useState(null);
  const { Devices, isGetDevices } = useDevices(selectedFarm?.firebaseUrl);

  console.log("Insights Debug - Selected Farm:", selectedFarm);
  console.log("Insights Debug - Raw Devices Data:", Devices);

  // Process real device data to create stats
  const stats = useMemo(() => {
    if (!Devices) return [];

    const devicesList = Object.keys(Devices).map(key => ({
      name: key,
      ...Devices[key]
    }));

    if (devicesList.length === 0) return [];

    // Keys we want to track and their display properties - lowercase for normalization
    const propertyMap = {
      'moisture': { color: 'blue', label: 'Soil Moisture', unit: '%' },
      'soil_moisture': { color: 'blue', label: 'Soil Moisture', unit: '%' },
      'temperature': { color: 'orange', label: 'Avg Temperature', unit: '°C' },
      'temp': { color: 'orange', label: 'Avg Temperature', unit: '°C' },
      'humidity': { color: 'green', label: 'Humidity Level', unit: '%' },
      'hum': { color: 'green', label: 'Humidity Level', unit: '%' },
      'water_usage': { color: 'cyan', label: 'Water Usage', unit: ' L' },
      'water': { color: 'cyan', label: 'Water Usage', unit: ' L' },
      'battery': { color: 'yellow', label: 'Battery Level', unit: '%' },
      'batt': { color: 'yellow', label: 'Battery Level', unit: '%' },
      'status': { color: 'green', label: 'Device Status', unit: '' }
    };

    const aggregatedStats = {};

    devicesList.forEach(device => {
      Object.entries(device).forEach(([key, value]) => {
        const normalizedKey = key.toLowerCase();
        if (propertyMap[normalizedKey]) {
          const targetKey = propertyMap[normalizedKey].label;
          if (!aggregatedStats[targetKey]) {
            aggregatedStats[targetKey] = { 
              counts: 0, 
              sum: 0, 
              values: [], 
              config: propertyMap[normalizedKey] 
            };
          }
          
          // Try to parse number if it's a string
          let numValue = value;
          if (typeof value === 'string') {
            numValue = parseFloat(value.replace(/[^0-9.-]/g, ''));
          }

          if (typeof numValue === 'number' && !isNaN(numValue)) {
            aggregatedStats[targetKey].sum += numValue;
            aggregatedStats[targetKey].counts += 1;
          } else if (value !== undefined && value !== null) {
            aggregatedStats[targetKey].values.push(value);
          }
        }
      });
    });

    return Object.entries(aggregatedStats).map(([label, data]) => {
      const config = data.config;
      let displayValue = 'N/A';
      
      if (data.counts > 0) {
        displayValue = `${Math.round(data.sum / data.counts)}${config.unit}`;
      } else if (data.values.length > 0) {
        displayValue = String(data.values[0]); 
      }

      return {
        title: label,
        value: displayValue,
        trend: 'LIVE',
        color: config.color
      };
    });
  }, [Devices]);

  const containerVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1],
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="relative space-y-12 pb-10"
    >
      {/* Decorative Gradients */}
      <div className="absolute -top-24 -right-24 -z-10 h-96 w-96 rounded-full bg-blue-600/5 blur-[120px]" />
      <div className="absolute bottom-24 -left-24 -z-10 h-96 w-96 rounded-full bg-purple-600/5 blur-[120px]" />

      <header className="relative flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
        <div className="space-y-2">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-4"
          >
            <div className="h-12 w-1.5 rounded-full bg-blue-600 shadow-[0_0_15px_rgba(37,99,235,0.5)]" />
            <h1 className="text-4xl font-black tracking-tight text-white">
              Farm Insights<span className="text-blue-500">.</span>
            </h1>
          </motion.div>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="max-w-xl text-lg font-medium text-stone-400"
          >
            Analyze your farm's performance, resource usage, and growth metrics in
            real-time.
          </motion.p>
        </div>

        <motion.div 
          variants={itemVariants} 
          className="w-full lg:w-80"
        >
          <SelectFarm onFarmSelect={setSelectedFarm} />
        </motion.div>
      </header>



      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {isGetDevices ? (
          <div className="col-span-full flex min-h-[400px] items-center justify-center">
            <LoadingCircul />
          </div>
        ) : stats.length > 0 ? (
          stats.map((stat, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ y: -8, scale: 1.01 }}
              className="group relative overflow-hidden rounded-[2.5rem] border border-stone-800/50 bg-[#1b2127]/40 p-8 shadow-2xl backdrop-blur-md transition-all duration-500 hover:border-stone-700/50"
            >
              <div
                className={`absolute -top-8 -right-8 h-24 w-24 rounded-full bg-${stat.color}-500/5 blur-2xl transition-all group-hover:bg-${stat.color}-500/10`}
              />

              <div className="flex items-center justify-between">
                <h3 className="text-xs font-black tracking-[0.2em] text-stone-500 uppercase">
                  {stat.title}
                </h3>
                <span
                  className="rounded-xl bg-green-500/10 px-3 py-1.5 text-xs font-black tracking-wider text-green-500 shadow-sm"
                >
                  {stat.trend}
                </span>
              </div>

              <div className="mt-8 flex items-end justify-between">
                <div className="space-y-1">
                  <span className="text-4xl font-black tracking-tight text-white">
                    {stat.value}
                  </span>
                  <p className="text-xs font-bold tracking-widest text-stone-500 uppercase">
                    current state
                  </p>
                </div>
                <div
                  className={`flex h-14 w-14 items-center justify-center rounded-2xl bg-${stat.color}-500/10 text-${stat.color}-500 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-12`}
                >
                  <div
                    className={`h-3 w-3 rounded-full bg-${stat.color}-500 shadow-[0_0_15px_rgba(59,130,246,0.6)]`}
                  />
                </div>
              </div>
            </motion.div>
          ))
        ) : (
          <div className="col-span-full py-24 text-center">
            <p className="text-xl font-bold text-stone-500">
              {selectedFarm 
                ? "No device metrics available for this farm." 
                : "Please select a farm to visualize real-time insights."}
            </p>
          </div>
        )}
      </div>

      {!isGetDevices && stats.length > 0 && (
        <motion.div variants={itemVariants} className="space-y-6">
          <div className="flex items-center gap-4">
            <div className="h-8 w-1.5 rounded-full bg-green-500 shadow-[0_0_15px_rgba(34,197,94,0.4)]" />
            <h2 className="text-2xl font-black text-white">Device Status Summary</h2>
          </div>
          
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {Object.keys(Devices || {}).map((deviceName, idx) => {
              const status = String(Devices[deviceName].Status || 'active').toLowerCase();
              const isOnline = status === 'online' || status === 'active';
              return (
                <motion.div 
                  key={deviceName}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: idx * 0.05 }}
                  whileHover={{ scale: 1.02, y: -2 }}
                  className="flex items-center justify-between rounded-2xl border border-stone-800/50 bg-[#1b2127]/60 p-5 backdrop-blur-sm shadow-sm transition-all duration-300"
                >
                  <div className="flex items-center gap-3">
                    <div className={`h-2.5 w-2.5 rounded-full ${isOnline ? 'bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.4)]' : 'bg-stone-600'}`} />
                    <span className="text-sm font-bold text-stone-200">
                      {deviceName}
                    </span>
                  </div>
                  <span className={`text-[10px] font-black uppercase tracking-widest transition-colors ${isOnline ? 'text-green-500' : 'text-stone-500'}`}>
                    {Devices[deviceName].Status || 'active'}
                  </span>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      )}

      <motion.div
        variants={itemVariants}
        whileHover={{ y: -8 }}
        className="relative overflow-hidden rounded-[3rem] border border-stone-800/50 bg-[#1b2127]/40 p-12 text-center shadow-2xl backdrop-blur-md transition-all duration-500 hover:border-stone-700/50"
      >
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-blue-600/5 to-transparent" />

        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-[2rem] bg-blue-600/10 text-blue-500 shadow-xl shadow-blue-900/10 transition-transform duration-700 hover:rotate-[360deg]">
          <svg
            className="h-10 w-10"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
            />
          </svg>
        </div>

        <h3 className="mt-8 text-3xl font-black tracking-tight text-white">
          Advanced Analytics <span className="text-blue-500">Coming Soon.</span>
        </h3>
        <p className="mx-auto mt-4 max-w-xl text-lg leading-relaxed font-medium text-stone-400">
          We're engineering deep learning models to provide hyper-accurate
          predictions for your farm's metabolic health, resource efficiency, and
          projected yield.
        </p>

        <div className="mt-10 flex justify-center gap-4">
          <div className="h-1.5 w-12 rounded-full bg-blue-600/30" />
          <div className="h-1.5 w-1.5 rounded-full bg-blue-600/30" />
          <div className="h-1.5 w-1.5 rounded-full bg-blue-600/30" />
        </div>
      </motion.div>
    </motion.div>
  );
};
export default Insights;
