# Smart Farm IoT Management System

A comprehensive IoT management system for smart farming with real-time monitoring, device management, and data analytics.

## Features

- 🔐 **Authentication**: JWT-based authentication with secure login/signup
- 🏭 **Farm Management**: Create, update, and manage multiple farms
- 📱 **Device Management**: Monitor and control IoT devices
- 📊 **Real-time Analytics**: Live data visualization and insights
- 👤 **User Management**: Profile management and settings
- 🎨 **Responsive Design**: Mobile-first responsive UI
- 🔒 **Security**: Rate limiting, CORS, XSS protection

## Tech Stack

### Frontend

- React 19
- Vite
- Tailwind CSS
- React Router DOM
- Axios
- React Query
- Framer Motion

### Backend

- Node.js
- Express.js
- MongoDB with Mongoose
- JWT Authentication
- Multer (file uploads)
- Cloudinary (image storage)
- Nodemailer (email)

## Development

### Prerequisites

1. **Node.js**: Version 18 or higher
2. **MongoDB**: Local installation or MongoDB Atlas
3. **Git**: For version control

### Installation

1. **Clone the repository**:

   ```bash
   git clone <repository-url>
   cd smart-Farm
   ```

2. **Install dependencies**:

   ```bash
   # Install server dependencies
   npm install

   # Install client dependencies
   cd client
   npm install
   ```

3. **Set up environment variables**:

   - Copy `env.example` to `.env` in both client and server directories
   - Update the values according to your setup

4. **Start development servers**:

   ```bash
   # From root directory
   npm run dev
   ```

   This will start both client (port 5173) and server (port 3000)

### Environment Variables

#### Server Environment Variables

Create a `.env` file in the server directory:

```env
# Database
MONGODB_URI=mongodb://localhost:27017/smart-farm
# or for production: mongodb+srv://username:password@cluster.mongodb.net/smart-farm

# JWT Configuration
JWT_SECRET=your-super-secret-jwt-key
JWT_EXPIRES_IN=90d

# Email Configuration (optional)
EMAIL_FROM=noreply@smartfarm.com
EMAIL_PASSWORD=your-email-password

# Cloudinary Configuration (optional)
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret
```

#### Client Environment Variables

Create a `.env` file in the client directory:

```env
# API Configuration
VITE_APIURL=http://localhost:3000/api/v1

# Timeout Configuration (in milliseconds)
VITE_API_TIMEOUT=30000

# Development Configuration
VITE_NODE_ENV=development
```

## API Endpoints

The server provides the following API endpoints:

- `POST /api/v1/auth/login` - User login
- `POST /api/v1/auth/signup` - User registration
- `GET /api/v1/auth/logout` - User logout
- `GET /api/v1/user/profile` - Get user profile
- `PUT /api/v1/user/profile` - Update user profile
- `GET /api/v1/farm` - Get user farms
- `POST /api/v1/farm` - Create new farm
- `PUT /api/v1/farm/:id` - Update farm
- `DELETE /api/v1/farm/:id` - Delete farm

## Project Structure

```
smart-Farm/
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/     # React components
│   │   ├── pages/         # Page components
│   │   ├── hooks/         # Custom hooks
│   │   ├── utils/         # Utility functions
│   │   └── styles/        # CSS styles
│   ├── public/            # Static assets
│   └── package.json
├── server/                 # Node.js backend
│   ├── src/
│   │   ├── controllers/   # Route controllers
│   │   ├── models/        # Database models
│   │   ├── routes/        # API routes
│   │   ├── middleware/    # Custom middleware
│   │   └── utils/         # Utility functions
│   ├── index.js           # Server entry point
│   └── package.json
└── README.md
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the ISC License.
