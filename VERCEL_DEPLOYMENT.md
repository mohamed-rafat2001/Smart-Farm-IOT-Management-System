# Smart Farm Vercel Deployment Guide

This guide provides step-by-step instructions for deploying the Smart Farm IoT Management System to Vercel.

## Prerequisites

1. **Vercel Account**: Sign up at [vercel.com](https://vercel.com)
2. **GitHub Repository**: Your code must be pushed to GitHub
3. **MongoDB Atlas**: Set up a MongoDB Atlas cluster for production database
4. **Environment Variables**: Prepare all required environment variables

## Step 1: Prepare Your Repository

Ensure your repository structure is correct:

```
smart-Farm/
├── client/                 # React frontend
├── server/                 # Node.js backend
├── vercel.json            # Root configuration
└── README.md
```

## Step 2: Deploy the Backend (Server)

### 2.1 Create Server Project on Vercel

1. Go to [vercel.com](https://vercel.com) and sign in
2. Click "New Project"
3. Import your GitHub repository
4. **Important**: Set the root directory to `server`
5. Click "Continue"

### 2.2 Configure Server Environment Variables

In the Vercel project settings, add these environment variables:

```env
# Server Configuration
PORT=3000
NODE_ENV=production
MODE=PRODUCTION

# Database Configuration (MongoDB Atlas)
DB_URL=mongodb+srv://username:your_password@cluster.mongodb.net/smartfarm?retryWrites=true&w=majority
DB_PASSWORD=your_database_password

# JWT Configuration
JWTKEY=your-super-secret-jwt-key-here
JWTEXPIRE=90d
COOKIEEXPIRE=90

# Email Configuration (if using email features)
EMAIL_SERVICE=gmail
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USERNAME=your_email@gmail.com
EMAIL_PASSWORD=your_email_app_password
EMAIL_FROM=your_email@gmail.com
EMAIL_FROM_NAME=Smart Farm

# Cloudinary Configuration (if using image uploads)
cloud_name=your_cloudinary_cloud_name
api_key=your_cloudinary_api_key
api_secret=your_cloudinary_api_secret
secure=true
upload_preset=your_upload_preset

# Client URL (will be set after client deployment)
CLIENT_URL=https://your-client-app.vercel.app

# Redis Configuration (if using Redis)
REDIS_URL=your_redis_url

# Stripe Configuration (if using payments)
STRIPE_SECRET_KEY=your_stripe_secret_key
STRIPE_WEBHOOK_SECRET=your_stripe_webhook_secret
```

### 2.3 Deploy Server

1. Click "Deploy"
2. Wait for deployment to complete
3. Note the deployment URL (e.g., `https://smart-farm-server.vercel.app`)

## Step 3: Deploy the Frontend (Client)

### 3.1 Create Client Project on Vercel

1. Go to [vercel.com](https://vercel.com)
2. Click "New Project"
3. Import the same GitHub repository
4. **Important**: Set the root directory to `client`
5. Click "Continue"

### 3.2 Configure Client Environment Variables

Add these environment variables:

```env
# API URL (use your server deployment URL)
VITE_API_URL=https://smart-farm-server.vercel.app/api/v1

# Socket Configuration (if using real-time features)
VITE_SOCKET_URL=https://smart-farm-server.vercel.app

# Maps API Key (if using maps features)
VITE_MAPS_API_KEY=your_maps_api_key

# Weather API Key (if using weather features)
VITE_WEATHER_API_KEY=your_weather_api_key

# App Configuration
VITE_APP_NAME=Smart Farm
VITE_APP_VERSION=1.0.0
```

### 3.3 Configure Build Settings

Set the build configuration:

- **Build Command**: `npm run build`
- **Output Directory**: `dist`
- **Install Command**: `npm install`

### 3.4 Deploy Client

1. Click "Deploy"
2. Wait for deployment to complete
3. Note the deployment URL (e.g., `https://smart-farm-client.vercel.app`)

## Step 4: Update CORS Configuration

After both deployments are complete:

1. Go back to your server project on Vercel
2. Update the `CLIENT_URL` environment variable with your client deployment URL
3. Redeploy the server project

## Step 5: Test Your Deployment

### 5.1 Test Backend API

```bash
# Test health check endpoint
curl https://your-server-app.vercel.app/api/v1/health

# Test user registration
curl -X POST https://your-server-app.vercel.app/api/v1/auth/signup \
  -H "Content-Type: application/json" \
  -d '{"name":"Test User","email":"test@example.com","password":"password123"}'
```

### 5.2 Test Frontend

1. Visit your client deployment URL
2. Test user registration and login
3. Test farm creation and management
4. Test device management features

## Environment Variables Reference

### Server Environment Variables

| Variable         | Description                 | Required | Example                          |
| ---------------- | --------------------------- | -------- | -------------------------------- |
| `DB_URL`         | MongoDB connection string   | Yes      | `mongodb+srv://...`              |
| `DB_PASSWORD`    | MongoDB password            | Yes      | `your_password`                  |
| `JWTKEY`         | Secret key for JWT tokens   | Yes      | `your-secret-key`                |
| `JWTEXPIRE`      | JWT token expiration        | No       | `90d`                            |
| `COOKIEEXPIRE`   | Cookie expiration days      | No       | `90`                             |
| `EMAIL_USERNAME` | Email username              | No       | `your_email@gmail.com`           |
| `EMAIL_PASSWORD` | Email password/app password | No       | `your-password`                  |
| `cloud_name`     | Cloudinary cloud name       | No       | `your-cloud-name`                |
| `api_key`        | Cloudinary API key          | No       | `your-api-key`                   |
| `api_secret`     | Cloudinary API secret       | No       | `your-api-secret`                |
| `CLIENT_URL`     | Frontend URL for CORS       | Yes      | `https://your-client.vercel.app` |
| `NODE_ENV`       | Node environment            | No       | `production`                     |
| `MODE`           | Application mode            | No       | `PRODUCTION`                     |

### Client Environment Variables

| Variable               | Description         | Required | Example                                 |
| ---------------------- | ------------------- | -------- | --------------------------------------- |
| `VITE_API_URL`         | Backend API URL     | Yes      | `https://your-server.vercel.app/api/v1` |
| `VITE_SOCKET_URL`      | WebSocket URL       | No       | `https://your-server.vercel.app`        |
| `VITE_MAPS_API_KEY`    | Maps API key        | No       | `your-maps-key`                         |
| `VITE_WEATHER_API_KEY` | Weather API key     | No       | `your-weather-key`                      |
| `VITE_APP_NAME`        | Application name    | No       | `Smart Farm`                            |
| `VITE_APP_VERSION`     | Application version | No       | `1.0.0`                                 |

## Troubleshooting

### Common Issues

#### 1. CORS Errors

**Problem**: Frontend can't connect to backend
**Solution**:

- Ensure `CLIENT_URL` is set correctly in server environment variables
- Check that the URL includes the protocol (https://)
- Redeploy server after updating environment variables

#### 2. Database Connection Issues

**Problem**: Server can't connect to MongoDB
**Solution**:

- Verify MongoDB Atlas connection string
- Ensure IP whitelist includes Vercel's IP ranges
- Check database user credentials

#### 3. Build Failures

**Problem**: Client or server build fails
**Solution**:

- Check all dependencies are in package.json
- Verify Node.js version compatibility
- Check for syntax errors in code

#### 4. Environment Variables Not Working

**Problem**: Environment variables not accessible
**Solution**:

- Ensure variables are set in Vercel project settings
- Redeploy after adding environment variables
- Check variable names match exactly

### Vercel-Specific Issues

#### 1. Function Timeout

**Problem**: API requests timeout
**Solution**:

- Serverless functions have 10-second timeout by default
- Optimize database queries
- Use connection pooling

#### 2. File Upload Issues

**Problem**: Large file uploads fail
**Solution**:

- Vercel has file size limits
- Consider using external storage (Cloudinary)
- Implement chunked uploads

#### 3. Cold Starts

**Problem**: First request is slow
**Solution**:

- This is normal for serverless functions
- Consider using Vercel Pro for better performance
- Implement health checks to keep functions warm

## Monitoring and Maintenance

### 1. Set Up Monitoring

- Enable Vercel Analytics
- Set up error tracking (Sentry)
- Monitor API response times

### 2. Regular Maintenance

- Keep dependencies updated
- Monitor database performance
- Review and rotate secrets regularly

### 3. Backup Strategy

- Regular database backups
- Version control for all code changes
- Document configuration changes

## Security Considerations

1. **Environment Variables**: Never commit secrets to Git
2. **CORS**: Only allow necessary origins
3. **Rate Limiting**: Implement proper rate limiting
4. **Input Validation**: Validate all user inputs
5. **HTTPS**: Always use HTTPS in production

## Performance Optimization

1. **Database**: Use indexes and optimize queries
2. **Caching**: Implement caching where appropriate
3. **CDN**: Use Vercel's global CDN
4. **Images**: Optimize images and use WebP format
5. **Code Splitting**: Implement code splitting in React

## Support

If you encounter issues:

1. Check Vercel documentation: [vercel.com/docs](https://vercel.com/docs)
2. Review this deployment guide
3. Check the main README.md file
4. Create an issue in the repository
5. Contact Vercel support if needed
