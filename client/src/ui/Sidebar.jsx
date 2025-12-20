import { NavLink } from 'react-router-dom';
import useLogOut from '../features/authentication/useLogout';
import Logo from '../assets/logo.jpg';
import { motion } from 'framer-motion';

function Sidebar({ onClose }) {
  const { isLogOut, logOutUser } = useLogOut();

  const handleLogOut = () => {
    logOutUser();
  };

  const handleNavClick = () => {
    if (onClose) onClose();
  };

  const navItems = [
    {
      to: '/app/farms',
      label: 'Farms',
      icon: (
        <svg className="h-5 w-5" viewBox="0 0 640 512" fill="currentColor">
          <path d="M96 64c0-35.3 28.7-64 64-64L266.3 0c26.2 0 49.7 15.9 59.4 40.2L373.7 160 480 160l0-33.8c0-24.8 5.8-49.3 16.9-71.6l2.5-5c7.9-15.8 27.1-22.2 42.9-14.3s22.2 27.1 14.3 42.9l-2.5 5c-6.7 13.3-10.1 28-10.1 42.9l0 33.8 56 0c22.1 0 40 17.9 40 40l0 45.4c0 16.5-8.5 31.9-22.6 40.7l-43.3 27.1c-14.2-5.9-29.8-9.2-46.1-9.2c-39.3 0-74.1 18.9-96 48l-80 0c0 17.7-14.3 32-32 32l-8.2 0c-1.7 4.8-3.7 9.5-5.8 14.1l5.8 5.8c12.5 12.5 12.5 32.8 0 45.3l-22.6 22.6c-12.5 12.5-32.8 12.5-45.3 0l-5.8-5.8c-4.6 2.2-9.3 4.1-14.1 5.8l0 8.2c0 17.7-14.3 32-32 32l-32 0c-17.7 0-32-14.3-32-32l0-8.2c-4.8-1.7-9.5-3.7-14.1-5.8l-5.8 5.8c-12.5 12.5-32.8 12.5-45.3 0L40.2 449.1c-12.5-12.5-12.5-32.8 0-45.3l5.8-5.8c-2.2-4.6-4.1-9.3-5.8-14.1L32 384c-17.7 0-32-14.3-32-32l0-32c0-17.7 14.3-32 32-32l8.2 0c1.7-4.8 3.7-9.5 5.8-14.1l-5.8-5.8c-12.5-12.5-12.5-32.8 0-45.3l22.6-22.6c9-9 21.9-11.5 33.1-7.6l0-.6 0-32 0-96zm170.3 0L160 64l0 96 32 0 112.7 0L266.3 64zM176 256a80 80 0 1 0 0 160 80 80 0 1 0 0-160zM528 448a24 24 0 1 0 0-48 24 24 0 1 0 0 48zm0 64c-48.6 0-88-39.4-88-88c0-29.8 14.8-56.1 37.4-72c14.3-10.1 31.8-16 50.6-16c2.7 0 5.3 .1 7.9 .3c44.9 4 80.1 41.7 80.1 87.7c0 48.6-39.4 88-88 88z" />
        </svg>
      ),
    },
    {
      to: '/app/devices',
      label: 'Devices',
      icon: (
        <svg className="h-5 w-5" viewBox="0 0 640 512" fill="currentColor">
          <path d="M64 0C28.7 0 0 28.7 0 64L0 352c0 35.3 28.7 64 64 64l176 0-10.7 32L160 448c-17.7 0-32 14.3-32 32s14.3 32 32 32l256 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-69.3 0L336 416l176 0c35.3 0 64-28.7 64-64l0-288c0-35.3-28.7-64-64-64L64 0zM512 64l0 224L64 288 64 64l448 0z" />
        </svg>
      ),
    },
    {
      to: '/app/insights',
      label: 'Insights',
      icon: (
        <svg className="h-5 w-5" viewBox="0 0 640 512" fill="currentColor">
          <path d="M160 80c0-26.5 21.5-48 48-48l32 0c26.5 0 48 21.5 48 48l0 352c0 26.5-21.5 48-48 48l-32 0c-26.5 0-48-21.5-48-48l0-352zM0 272c0-26.5 21.5-48 48-48l32 0c26.5 0 48 21.5 48 48l0 160c0 26.5-21.5 48-48 48l-32 0c-26.5 0-48-21.5-48-48L0 272zM368 96l32 0c26.5 0 48 21.5 48 48l0 288c0 26.5-21.5 48-48 48l-32 0c-26.5 0-48-21.5-48-48l0-288c0-26.5 21.5-48 48-48z" />
        </svg>
      ),
    },
    {
      to: '/app/profile',
      label: 'Profile',
      icon: (
        <svg className="h-5 w-5" viewBox="0 0 448 512" fill="currentColor">
          <path d="M224 256c70.7 0 128-57.3 128-128S294.7 0 224 0 96 57.3 96 128s57.3 128 128 128zm89.6 32h-16.7c-22.2 10.2-46.9 16-72.9 16s-50.6-5.8-72.9-16h-16.7C60.2 288 0 348.2 0 422.4V464c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48v-41.6c0-74.2-60.2-134.4-134.4-134.4z" />
        </svg>
      ),
    },
    {
      to: '/app/settings',
      label: 'Settings',
      icon: (
        <svg className="h-5 w-5" viewBox="0 0 512 512" fill="currentColor">
          <path d="M487.4 315.7l-42.6-24.6c2.3-10.7 2.3-21.6 0-32.2l42.6-24.6c11.6-6.7 15.5-21.5 8.9-33.1-13.1-23.1-30-43.5-50-60.5-10-8.5-24.9-6.7-33.1 3.7l-35.5 45.2c-7.9-7.2-16.7-13.1-26.2-17.5V128c0-13.3-10.7-24-24-24-26.5 0-51.6 5.2-74.5 14.7-12.1 4.9-18.1 18.7-13.2 30.8l16.1 40.1c-9.5 4.4-18.3 10.3-26.2 17.5l-35.5-45.2c-8.3-10.5-23.1-12.2-33.1-3.7-20 17-36.9 37.4-50 60.5-6.6 11.6-2.7 26.4 8.9 33.1l42.6 24.6c-2.3 10.7-2.3 21.6 0 32.2l-42.6 24.6c-11.6 6.7-15.5 21.5-8.9 33.1 13.1 23.1 30 43.5 50 60.5 10 8.5 24.9 6.7 33.1-3.7l35.5-45.2c7.9 7.2 16.7 13.1 26.2 17.5V384c0 13.3 10.7 24 24 24 26.5 0 51.6-5.2 74.5-14.7 12.1-4.9 18.1-18.7 13.2-30.8l-16.1-40.1c9.5-4.4 18.3-10.3 26.2-17.5l35.5 45.2c8.3 10.5 23.1 12.2 33.1 3.7 20-17 36.9-37.4 50-60.5 6.6-11.6 2.7-26.4-8.9-33.1zM256 320c-35.3 0-64-28.7-64-64s28.7-64 64-64 64 28.7 64 64-28.7 64-64 64z" />
        </svg>
      ),
    },
  ];

  return (
    <aside className="flex h-full flex-col bg-[#283039] text-stone-400">
      {/* Brand Section */}
      <div className="flex h-20 items-center gap-3 border-b border-stone-700 px-6">
        <motion.img
          whileHover={{ rotate: 360 }}
          transition={{ duration: 0.5 }}
          src={Logo}
          alt="Logo"
          className="h-10 w-10 rounded-xl object-cover"
        />
        <div className="flex flex-col">
          <span className="text-sm font-bold tracking-wider text-white">
            SMART FARM
          </span>
          <span className="text-[10px] font-semibold tracking-widest text-stone-500 uppercase">
            Management
          </span>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-1 overflow-y-auto px-3 py-6">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            onClick={handleNavClick}
            className={({ isActive }) =>
              `group flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-all duration-200 ${
                isActive
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/20'
                  : 'text-stone-400 hover:bg-stone-700/50 hover:text-white'
              }`
            }
          >
            <span className="flex-shrink-0 transition-transform group-hover:scale-110">
              {item.icon}
            </span>
            <span>{item.label}</span>
          </NavLink>
        ))}
      </nav>

      {/* Logout Section */}
      <div className="border-t border-stone-700 p-4">
        <button
          onClick={handleLogOut}
          disabled={isLogOut}
          className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-stone-400 transition-all hover:bg-red-500/10 hover:text-red-500 disabled:opacity-50"
        >
          <svg className="h-5 w-5" viewBox="0 0 512 512" fill="currentColor">
            <path d="M160 96c17.7 0 32-14.3 32-32s-14.3-32-32-32H96C43 32 0 75 0 128V384c0 53 43 96 96 96h64c17.7 0 32-14.3 32-32s-14.3-32-32-32H96c-17.7 0-32-14.3-32-32V128c0-17.7 14.3-32 32-32h64zM490.7 233.4c12.5 12.5 12.5 32.8 0 45.3l-128 128c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L402.7 288H192c-17.7 0-32-14.3-32-32s14.3-32 32-32h210.7l-85.3-85.3c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l128 128z" />
          </svg>
          <span>{isLogOut ? 'Logging out...' : 'Logout'}</span>
        </button>
      </div>
    </aside>
  );
}

export default Sidebar;
