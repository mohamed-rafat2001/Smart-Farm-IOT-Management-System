import { motion } from 'framer-motion';

function Table({ head, children, className = '' }) {
  return (
    <div className={`custom-scrollbar w-full overflow-x-auto ${className}`}>
      <table className="w-full min-w-full table-auto border-separate border-spacing-0">
        <thead className="sticky top-0 z-10 bg-[#1b2127]/95 backdrop-blur-md">
          <tr>
            {head.map((el, index) => {
              const isObject = typeof el === 'object';
              const label = isObject ? el.label : el;
              const headerClassName = isObject ? el.className : '';

              return (
                <th
                  className={`border-b border-stone-800/50 p-6 text-start text-xs font-black tracking-[0.2em] text-stone-500 uppercase sm:text-sm ${index === 0 ? 'rounded-tl-[2rem]' : ''} ${index === head.length - 1 ? 'rounded-tr-[2rem] text-center' : ''} ${headerClassName} `}
                  key={index}
                >
                  {label}
                </th>
              );
            })}
          </tr>
        </thead>
        <motion.tbody
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="divide-y divide-stone-800/50"
        >
          {children}
        </motion.tbody>
      </table>
    </div>
  );
}

export default Table;
