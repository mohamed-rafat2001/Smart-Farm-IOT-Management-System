import { useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNotifications } from '../features/notifications/useNotifications';

const formatTime = (date) => {
  const seconds = Math.floor((new Date() - date) / 1000);
  if (seconds < 60) return "Just now";
  let interval = seconds / 31536000;
  if (interval > 1) return Math.floor(interval) + "y ago";
  interval = seconds / 2592000;
  if (interval > 1) return Math.floor(interval) + "mo ago";
  interval = seconds / 86400;
  if (interval > 1) return Math.floor(interval) + "d ago";
  interval = seconds / 3600;
  if (interval > 1) return Math.floor(interval) + "h ago";
  interval = seconds / 60;
  if (interval > 1) return Math.floor(interval) + "m ago";
  return Math.floor(seconds) + "s ago";
};

function NotificationsDropdown() {
  const { notifications, markAllAsRead, markAsRead, removeNotification } = useNotifications();

  const grouped = useMemo(() => {
    return {
      unread: notifications.filter(n => !n.isRead),
      read: notifications.filter(n => n.isRead)
    };
  }, [notifications]);

  const hasNotifications = notifications.length > 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 15, scale: 0.95, filter: 'blur(10px)' }}
      animate={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
      exit={{ opacity: 0, y: 15, scale: 0.95, filter: 'blur(10px)' }}
      transition={{ type: 'spring', damping: 25, stiffness: 350 }}
      className="absolute right-0 mt-4 w-[22rem] md:w-[26rem] overflow-hidden rounded-[2.5rem] border border-stone-800/80 bg-[#1b2127]/90 shadow-[0_25px_50px_-12px_rgba(0,0,0,0.7)] backdrop-blur-2xl z-[9999]"
    >
      {/* Header */}
      <div className="relative overflow-hidden border-b border-stone-800/40 px-6 py-6 group">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 via-transparent to-transparent opacity-50 group-hover:opacity-70 transition-opacity" />
        <div className="relative flex items-center justify-between">
          <div className="space-y-1">
            <h3 className="flex items-center gap-2 text-base font-black tracking-tight text-white">
              Notifications
              {grouped.unread.length > 0 && (
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-blue-500 text-[10px] font-black text-white shadow-[0_0_10px_rgba(59,130,246,0.5)]">
                  {grouped.unread.length}
                </span>
              )}
            </h3>
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-stone-500">
              Activity Stream
            </p>
          </div>
          <div className="flex items-center gap-3">
            {hasNotifications && (
              <button 
                onClick={markAllAsRead}
                className="text-[10px] font-black uppercase tracking-widest text-blue-500 hover:text-blue-400 transition-all hover:scale-105"
              >
                Mark all read
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="custom-scrollbar max-h-[450px] overflow-y-auto px-2 py-4">
        {hasNotifications ? (
          <div className="space-y-6">
            {/* Unread Section */}
            {grouped.unread.length > 0 && (
              <div className="space-y-3">
                <div className="px-4 text-[10px] font-black uppercase tracking-widest text-stone-500/80">
                  New
                </div>
                {grouped.unread.map((notif) => (
                  <NotificationItem 
                    key={notif.id} 
                    notif={notif} 
                    onRead={() => markAsRead(notif.id)} 
                    onRemove={() => removeNotification(notif.id)}
                  />
                ))}
              </div>
            )}

            {/* Read Section */}
            {grouped.read.length > 0 && (
              <div className="space-y-3">
                <div className="px-4 text-[10px] font-black uppercase tracking-widest text-stone-500/80">
                  Earlier
                </div>
                {grouped.read.map((notif) => (
                  <NotificationItem 
                    key={notif.id} 
                    notif={notif} 
                    onRead={() => markAsRead(notif.id)} 
                    onRemove={() => removeNotification(notif.id)}
                  />
                ))}
              </div>
            )}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-16 px-8 text-center">
            <div className="relative mb-6">
              <div className="absolute inset-0 scale-150 animate-pulse bg-blue-500/10 blur-2xl rounded-full" />
              <div className="relative flex h-20 w-20 items-center justify-center rounded-[2rem] bg-stone-800/30 border border-stone-800/50 text-stone-600 shadow-inner">
                <svg className="h-10 w-10 opacity-40" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                </svg>
              </div>
            </div>
            <h4 className="text-sm font-black text-stone-300">All caught up!</h4>
            <p className="mt-2 text-xs leading-relaxed text-stone-500">
              No new alerts right now. We'll monitor your farm and let you know if anything changes.
            </p>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="border-t border-stone-800/40 bg-stone-900/50 px-6 py-5">
        <button className="group relative flex w-full items-center justify-center gap-3 overflow-hidden rounded-[1.25rem] bg-stone-800/40 py-3 text-[10px] font-black uppercase tracking-[0.2em] text-stone-400 transition-all hover:bg-stone-800 hover:text-white border border-stone-700/30 shadow-lg">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600/0 via-white/5 to-blue-600/0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
          <span className="relative">View All Activity</span>
          <svg className="relative h-3 w-3 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </motion.div>
  );
}

function NotificationItem({ notif, onRead, onRemove }) {
  const isCritical = notif.type === 'critical';
  const isWarning = notif.type === 'warning';
  const isSuccess = notif.type === 'success';

  return (
    <motion.div
      layout
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className={`group relative flex gap-4 rounded-3xl p-4 transition-all hover:bg-white/[0.03] cursor-pointer border border-transparent hover:border-white/[0.05] ${
        !notif.isRead ? 'bg-blue-600/[0.03]' : ''
      }`}
      onClick={onRead}
    >
      {/* Unread Indicator */}
      {!notif.isRead && (
        <div className="absolute left-1.5 top-1/2 -translate-y-1/2 h-1.5 w-1.5 rounded-full bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,1)]" />
      )}

      {/* Action Buttons (Hover) */}
      <div className="absolute right-4 top-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
        <button 
          onClick={(e) => {
            e.stopPropagation();
            onRemove();
          }}
          className="flex h-7 w-7 items-center justify-center rounded-lg bg-stone-800/50 text-stone-500 hover:bg-red-500/20 hover:text-red-500 transition-all active:scale-90"
          title="Delete"
        >
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
        </button>
      </div>
      
      {/* Icon */}
      <div className={`relative flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border transition-transform duration-500 group-hover:scale-110 ${
        isCritical ? 'border-red-500/30 bg-red-500/10 text-red-500' :
        isWarning ? 'border-orange-500/30 bg-orange-500/10 text-orange-400' :
        isSuccess ? 'border-green-500/30 bg-green-500/10 text-green-400' :
        'border-blue-500/30 bg-blue-500/10 text-blue-400'
      }`}>
        <div className={`absolute inset-0 opacity-20 blur-lg rounded-full ${
          isCritical ? 'bg-red-500' : isWarning ? 'bg-orange-500' : isSuccess ? 'bg-green-500' : 'bg-blue-500'
        }`} />
        <div className="relative">
          {isCritical && (
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          )}
          {isWarning && (
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          )}
          {isSuccess && (
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          )}
          {!isCritical && !isWarning && !isSuccess && (
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          )}
        </div>
      </div>

      {/* Text Info */}
      <div className="flex-1 min-w-0 pr-6 space-y-1">
        <div className="flex items-center justify-between gap-2">
          <h4 className={`truncate text-xs font-black transition-colors ${!notif.isRead ? 'text-white' : 'text-stone-300 group-hover:text-white'}`}>
            {notif.title}
          </h4>
          <span className="shrink-0 text-[9px] font-bold text-stone-500 uppercase tracking-tighter">
            {formatTime(notif.time)}
          </span>
        </div>
        <p className="text-[11px] leading-relaxed text-stone-500 line-clamp-2 transition-colors group-hover:text-stone-400">
          {notif.message}
        </p>
      </div>
    </motion.div>
  );
}

export default NotificationsDropdown;
