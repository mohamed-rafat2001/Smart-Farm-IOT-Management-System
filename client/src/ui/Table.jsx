import { motion } from 'framer-motion';

function Table({ head, children, className = '' }) {
  return (
    <div className={`custom-scrollbar w-full overflow-x-auto ${className}`}>
      <table className="w-full min-w-full table-auto border-separate border-spacing-0">
        <thead className="sticky top-0 z-10 bg-[#283039]">
          <tr>
            {head.map((el, index) => {
              const isObject = typeof el === 'object';
              const label = isObject ? el.label : el;
              const headerClassName = isObject ? el.className : '';

              return (
                <th
                  className={`border-b border-stone-700 p-4 text-start text-xs font-bold tracking-wider text-[#c9fa75] uppercase sm:p-5 sm:text-sm ${index === 0 ? 'rounded-tl-xl' : ''} ${index === head.length - 1 ? 'rounded-tr-xl text-center' : ''} ${headerClassName} `}
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
          transition={{ duration: 0.3 }}
          className="divide-y divide-stone-700/50"
        >
          {children}
        </motion.tbody>
      </table>
    </div>
  );
}

export default Table;
