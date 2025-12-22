import cors from "cors";

// Reusable CORS middleware for individual routes
const corsMiddleware = cors({
  origin: function(origin, callback) {
    const allowedOrigins = [
      "http://localhost:5173",
      "http://localhost:5174",
      "https://smart-farm-client.vercel.app",
      "https://smart-farm-client-git-main.vercel.app",
      "https://smart-farm-client-git-develop.vercel.app",
      "https://smart-farm-client-v1.vercel.app",
      "https://smart-farm-server-v1.vercel.app",
      process.env.CLIENT_URL,
    ].filter(Boolean);
    
    // Allow requests with no origin, common dev origins, Vercel subdomains, or anything in non-production
    const isVercel = origin && origin.endsWith('.vercel.app');
    if (!origin || allowedOrigins.indexOf(origin) !== -1 || process.env.NODE_ENV !== 'production' || isVercel) {
      callback(null, true);
    } else {
      callback(new Error(`Origin ${origin} not allowed by CORS`));
    }
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  allowedHeaders: [
    "Content-Type",
    "Authorization",
    "Content-Length",
    "X-Requested-With",
    "Accept",
    "Origin",
  ],
  exposedHeaders: ["Content-Disposition"],
  preflightContinue: false,
  optionsSuccessStatus: 204,
  maxAge: 86400, // 24 hours
});

export default corsMiddleware;