import dotenv from 'dotenv';
dotenv.config();
console.log("CWD:", process.cwd());
console.log("DB_URL exists:", !!process.env.DB_URL);
console.log("DB_PASSWORD exists:", !!process.env.DB_PASSWORD);
