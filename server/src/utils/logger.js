/**
 * Logger utility that only logs in development mode
 * In production, all logs are silenced
 */

const isDev = process.env.NODE_ENV !== 'production';

const logger = {
  log: (...args) => {
    if (isDev) console.log(...args);
  },
  info: (...args) => {
    if (isDev) console.info(...args);
  },
  warn: (...args) => {
    // Warnings are always logged
    console.warn(...args);
  },
  error: (...args) => {
    // Errors are always logged
    console.error(...args);
  },
  debug: (...args) => {
    if (isDev) console.debug(...args);
  },
};

export default logger;
