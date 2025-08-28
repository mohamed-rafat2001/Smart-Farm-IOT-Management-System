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
# Server Configuration
PORT=3000
NODE_ENV=development
MODE=DEV

# Database Configuration
DB_URL=mongodb+srv://username:<db_password>@cluster.mongodb.net/smartfarm?retryWrites=true&w=majority
DB_PASSWORD=your_database_password

# JWT Configuration
JWTKEY=your-super-secret-jwt-key-here
JWTEXPIRE=90d
COOKIEEXPIRE=90

# Email Configuration
EMAIL_SERVICE=gmail
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USERNAME=your_email@gmail.com
EMAIL_PASSWORD=your_email_app_password
EMAIL_FROM=your_email@gmail.com
EMAIL_FROM_NAME=Smart Farm

# Cloudinary Configuration (for image uploads)
cloud_name=your_cloudinary_cloud_name
api_key=your_cloudinary_api_key
api_secret=your_cloudinary_api_secret
secure=true
upload_preset=your_upload_preset
```

#### Client Environment Variables

Create a `.env` file in the client directory:

```env
# API Configuration
VITE_API_URL=http://localhost:3000/api/v1

# Socket Configuration (if using real-time features)
VITE_SOCKET_URL=http://localhost:3000

# Maps API Key (if using maps features)
VITE_MAPS_API_KEY=your_maps_api_key

# Weather API Key (if using weather features)
VITE_WEATHER_API_KEY=your_weather_api_key

# App Configuration
VITE_APP_NAME=Smart Farm
VITE_APP_VERSION=1.0.0
```

## 🚀 Deployment to Vercel

This project is configured for deployment on Vercel with both client and server components.

### Quick Deployment

1. **Run the deployment script**:

   ```bash
   chmod +x deploy-vercel.sh
   ./deploy-vercel.sh
   ```

2. **Follow the deployment guide**: See [VERCEL_DEPLOYMENT.md](./VERCEL_DEPLOYMENT.md) for detailed instructions.

### Deployment Steps

1. **Deploy Backend (Server)**:

   - Go to [vercel.com](https://vercel.com)
   - Create new project
   - Import your GitHub repository
   - Set root directory to `server`
   - Configure environment variables
   - Deploy

2. **Deploy Frontend (Client)**:

   - Create another Vercel project
   - Import the same GitHub repository
   - Set root directory to `client`
   - Configure environment variables
   - Deploy

3. **Update CORS**: After both deployments, update the `CLIENT_URL` in your server environment variables.

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
├── vercel.json            # Vercel configuration
├── deploy-vercel.sh       # Deployment script
├── VERCEL_DEPLOYMENT.md   # Deployment guide
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
