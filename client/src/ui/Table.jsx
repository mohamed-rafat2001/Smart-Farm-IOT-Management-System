function Table({ head, children }) {
  return (
    <div className="mt-5 w-full overflow-x-auto">
      <table className="w-full table-auto border-separate border-spacing-0 rounded-lg border border-stone-700 min-w-full">
        <thead className="bg-[#283039]">
          <tr>
            {head.map((el, index) => (
              <th
                className="border-b border-stone-700 p-3 text-start text-sm font-medium text-[#c9fa75] first:rounded-tl-lg last:rounded-tr-lg last:text-center sm:p-5 sm:text-base lg:text-xl"
                key={index}
              >
                {el}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {children}
        </tbody>
      </table>
    </div>
  );
}

export default Table;
