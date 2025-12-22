/**
 * Logger utility that only logs in development mode
 * In production, all logs are silenced
 */

const isDev = process.env.NODE_ENV !== 'production';

const logger = {
  log: (...args) => {
    // In production/Vercel, we want these logs to appear for debugging crashes
    console.log(...args);
  },
  info: (...args) => {
    console.info(...args);
  },
  warn: (...args) => {
    console.warn(...args);
  },
  error: (...args) => {
    console.error(...args);
  },
  debug: (...args) => {
    if (isDev) console.debug(...args);
  },
};

export default logger;
