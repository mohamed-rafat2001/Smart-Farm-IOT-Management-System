import { useState } from 'react';
import useGetUserFarms from './useGetUserFarms';
import Button from '../../ui/Button';
import CreateFarm from './CreateFarm';
import Table from '../../ui/Table.jsx';
import useDeactivateFarm from './useDeactivateFarm';
import { useNavigate } from 'react-router-dom';
function UserFarms() {
  const navigate = useNavigate();
  const { userFarm } = useGetUserFarms();
  const [addFarm, setAddFarm] = useState(false);
  const { isDeactivate, deActive } = useDeactivateFarm();
  function handelEvent(id) {
    navigate(`/app/farms/${id}`);
  }
  function handelActiveButton(id) {
    deActive(id);
  }
  return (
    <div className="relative">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-white">Your Farms</h1>
        <p className="text-stone-400">
          Overview of your farm's list and add new farms
        </p>
      </div>

      <div
        className={`${addFarm ? 'pointer-events-none blur-sm' : ''} transition-all duration-300`}
      >
        <div className="mb-6 flex justify-end">
          <Button
            color="#c9fa75"
            className="rounded-xl bg-[#283039] px-6 py-3 font-bold shadow-lg transition-all hover:scale-105 active:scale-95"
            onClick={() => {
              setAddFarm(true);
            }}
          >
            <span className="flex items-center gap-2">
              <svg
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 4v16m8-8H4"
                />
              </svg>
              Add Farm
            </span>
          </Button>
        </div>

        {userFarm?.docs && (
          <div className="overflow-hidden rounded-xl border border-stone-700 bg-[#1b2127] shadow-xl">
            <Table
              head={[
                'Farm Name',
                'Location',
                { label: 'Url', className: 'hidden md:table-cell' },
                'Status',
              ]}
            >
              {userFarm.docs.map((el) => (
                <tr
                  onClick={() => {
                    handelEvent(el._id);
                  }}
                  key={el._id}
                  className="group cursor-pointer border-b border-stone-700 bg-transparent transition-colors hover:bg-stone-800/50"
                >
                  <td className="p-4 font-semibold text-white sm:p-5">
                    {el.name}
                  </td>
                  <td className="p-4 text-stone-400 sm:p-5">
                    <div className="flex items-center gap-2">
                      <svg
                        className="h-4 w-4 text-blue-500/70"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                      </svg>
                      <span className="max-w-[100px] truncate sm:max-w-none">
                        {el.location}
                      </span>
                    </div>
                  </td>
                  <td className="hidden max-w-[150px] overflow-hidden p-4 text-ellipsis whitespace-nowrap text-stone-500 sm:p-5 md:table-cell">
                    {el.firebaseUrl}
                  </td>

                  <td className="p-4 text-center sm:p-5">
                    <button
                      disabled={isDeactivate}
                      className={`inline-flex items-center rounded-full px-4 py-1 text-xs font-bold transition-all sm:text-sm ${
                        el.active
                          ? 'border border-green-500/20 bg-green-500/10 text-green-500'
                          : 'border border-red-500/20 bg-red-500/10 text-red-500'
                      } hover:scale-105 active:scale-95`}
                      onClick={(e) => {
                        e.stopPropagation();
                        handelActiveButton(el._id);
                      }}
                    >
                      <span
                        className={`mr-1.5 h-1.5 w-1.5 rounded-full sm:h-2 sm:w-2 ${el.active ? 'bg-green-500' : 'bg-red-500'}`}
                      />
                      {el.active ? 'Active' : 'Inactive'}
                    </button>
                  </td>
                </tr>
              ))}
            </Table>
          </div>
        )}
      </div>

      {/* Responsive Modal */}
      <div
        className={`fixed inset-0 z-50 flex items-center justify-center p-4 transition-all duration-300 ${
          addFarm ? 'visible opacity-100' : 'invisible opacity-0'
        }`}
      >
        <div
          className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          onClick={() => setAddFarm(false)}
        />
        <div
          className={`relative w-full max-w-2xl transform rounded-2xl border border-stone-700 bg-[#1b2127] p-6 shadow-2xl transition-all duration-300 ${
            addFarm ? 'scale-100' : 'scale-95'
          }`}
        >
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-xl font-bold text-white">Create New Farm</h2>
            <button
              className="rounded-lg p-2 text-stone-400 transition-colors hover:bg-stone-800 hover:text-white"
              onClick={() => {
                setAddFarm(false);
              }}
            >
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
          <CreateFarm />
        </div>
      </div>
    </div>
  );
}
export default UserFarms;
