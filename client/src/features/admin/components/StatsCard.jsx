import { motion } from 'framer-motion';

function StatsCard({ icon, title, value, trend, color = 'blue' }) {
  const colors = {
    blue: 'from-blue-500/20 to-blue-600/5 border-blue-500/30',
    green: 'from-green-500/20 to-green-600/5 border-green-500/30',
    purple: 'from-purple-500/20 to-purple-600/5 border-purple-500/30',
    orange: 'from-orange-500/20 to-orange-600/5 border-orange-500/30',
  };

  const iconColors = {
    blue: 'text-blue-500',
    green: 'text-green-500',
    purple: 'text-purple-500',
    orange: 'text-orange-500',
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`relative overflow-hidden rounded-3xl border bg-gradient-to-br p-6 ${colors[color]}`}
    >
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-sm font-bold tracking-wider text-stone-400 uppercase">
            {title}
          </p>
          <motion.p
            initial={{ scale: 0.5 }}
            animate={{ scale: 1 }}
            className="mt-2 text-4xl font-black text-white"
          >
            {value?.toLocaleString() || 0}
          </motion.p>
          {trend && (
            <p className="mt-2 text-xs font-medium text-stone-500">{trend}</p>
          )}
        </div>
        <div className={`rounded-2xl bg-stone-900/50 p-4 ${iconColors[color]}`}>
          {icon}
        </div>
      </div>

      {/* Decorative gradient */}
      <div className="absolute -top-4 -right-4 h-24 w-24 rounded-full bg-white/5 blur-2xl" />
    </motion.div>
  );
}

export default StatsCard;
