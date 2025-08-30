/**
 * Middleware to handle request timeouts
 * Ensures that all requests either get a response or timeout error
 */
export const timeoutMiddleware = (timeout = 30000) => {
  return (req, res, next) => {
    // Set a timeout for all requests
    const timeoutId = setTimeout(() => {
      if (!res.headersSent) {
        return res.status(408).json({
          status: 'error',
          message: 'Request timeout - server took too long to respond',
          timestamp: new Date().toISOString(),
          path: req.originalUrl,
          method: req.method
        });
      }
    }, timeout);

    // Clear the timeout when the response is sent
    res.on('finish', () => {
      clearTimeout(timeoutId);
    });

    // Continue to the next middleware
    next();
  };
};

/**
 * Error boundary middleware to catch unhandled errors
 * Ensures all errors are properly formatted and sent to client
 */
export const errorBoundaryMiddleware = (err, req, res, next) => {
  // If headers already sent, delegate to default Express error handler
  if (res.headersSent) {
    return next(err);
  }

  console.error('Unhandled error:', err);

  // Send a formatted error response
  const statusCode = err.statusCode || 500;
  return res.status(statusCode).json({
    status: 'error',
    message: err.message || 'Internal server error',
    error: process.env.NODE_ENV === 'production' ? 'Something went wrong' : err.stack,
    timestamp: new Date().toISOString(),
    path: req.originalUrl,
    method: req.method,
    environment: process.env.NODE_ENV || 'development'
  });
};

/**
 * Catch unhandled promise rejections in route handlers
 */
export const asyncHandler = (fn) => {
  return (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
};