import { motion } from 'framer-motion';

const Toggle = ({ enabled, onChange, label, description }) => {
  return (
    <div className="flex items-center justify-between gap-4 py-2">
      <div className="flex flex-col gap-1">
        {label && (
          <span className="text-sm font-bold tracking-wide text-white">
            {label}
          </span>
        )}
        {description && (
          <span className="text-[11px] leading-tight font-medium text-stone-500">
            {description}
          </span>
        )}
      </div>
      <button
        type="button"
        onClick={() => onChange(!enabled)}
        className={`relative inline-flex h-7 w-12 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-300 ease-in-out focus:ring-2 focus:ring-blue-500/20 focus:outline-none ${
          enabled ? 'bg-blue-600' : 'bg-stone-800'
        }`}
      >
        <motion.span
          animate={{ x: enabled ? 20 : 0 }}
          transition={{ type: 'spring', stiffness: 500, damping: 30 }}
          className="pointer-events-none inline-block h-6 w-6 transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out"
        />
      </button>
    </div>
  );
};

export default Toggle;
