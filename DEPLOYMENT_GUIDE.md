# Smart Farm - Vercel Deployment Guide

This guide will help you deploy both the client (React) and server (Node.js) applications to Vercel.

## Prerequisites

1. **Vercel Account**: Sign up at [vercel.com](https://vercel.com)
2. **GitHub Repository**: Push your code to GitHub
3. **MongoDB Atlas**: Set up a MongoDB database (if not already done)
4. **Cloudinary Account**: For image uploads (if using)

## Server Deployment

### Step 1: Prepare Environment Variables

1. Copy `.env.example` to `.env` in the server directory
2. Fill in all the required values:
   ```bash
   DATABASE_URI=mongodb+srv://...
   JWT_SECRET=your-super-secret-key
   CLOUDINARY_CLOUD_NAME=your-cloud-name
   # ... other variables
   ```

### Step 2: Deploy Server to Vercel

1. **Via Vercel Dashboard:**
   - Go to [vercel.com/dashboard](https://vercel.com/dashboard)
   - Click "New Project"
   - Import your GitHub repository
   - Set **Root Directory** to `server`
   - Configure environment variables in Vercel dashboard

2. **Via Vercel CLI:**
   ```bash
   cd server
   npx vercel
   # Follow the prompts
   ```

### Step 3: Configure Environment Variables in Vercel

In your Vercel project settings, add these environment variables:

- `DATABASE_URI`
- `JWT_SECRET`
- `JWT_EXPIRES_IN`
- `JWT_COOKIE_EXPIRES_IN`
- `CLOUDINARY_CLOUD_NAME`
- `CLOUDINARY_API_KEY`
- `CLOUDINARY_API_SECRET`
- `EMAIL_HOST`
- `EMAIL_PORT`
- `EMAIL_USERNAME`
- `EMAIL_PASSWORD`
- `CLIENT_URL` (your client domain)
- `NODE_ENV=production`
- `VERCEL=1`

## Client Deployment

### Step 1: Prepare Environment Variables

1. Copy `.env.example` to `.env` in the client directory
2. Update the API URL to your deployed server:
   ```bash
   VITE_API_BASE_URL=https://your-server-domain.vercel.app/api/v1
   VITE_API_URL=https://your-server-domain.vercel.app
   ```

### Step 2: Deploy Client to Vercel

1. **Via Vercel Dashboard:**
   - Create a new project
   - Import your GitHub repository
   - Set **Root Directory** to `client`
   - Vercel will auto-detect it's a Vite project
   - Configure environment variables

2. **Via Vercel CLI:**
   ```bash
   cd client
   npx vercel
   ```

### Step 3: Configure Environment Variables in Vercel

Add these environment variables in your client project:

- `VITE_API_BASE_URL`
- `VITE_API_URL`
- `VITE_APP_NAME`
- `VITE_NODE_ENV=production`

## Post-Deployment Configuration

### Update CORS Settings

After deploying both applications, update the server's CORS configuration:

1. Add your client domain to the CORS origins in `app.js`
2. Update the `CLIENT_URL` environment variable in your server deployment

### Test the Deployment

1. **Server Health Check:**
   ```
   GET https://your-server-domain.vercel.app/api/v1/health
   ```

2. **Database Status:**
   ```
   GET https://your-server-domain.vercel.app/api/v1/db-status
   ```

3. **Client Application:**
   - Visit your client URL
   - Test user registration/login
   - Test API connectivity

## Troubleshooting

### Common Issues

1. **CORS Errors:**
   - Ensure client domain is added to CORS origins
   - Check `CLIENT_URL` environment variable

2. **Database Connection:**
   - Verify `DATABASE_URI` is correct
   - Check MongoDB Atlas network access settings
   - Ensure database user has proper permissions

3. **Environment Variables:**
   - Double-check all required variables are set
   - Ensure no trailing spaces in values
   - Verify sensitive values are properly escaped

4. **Build Failures:**
   - Check build logs in Vercel dashboard
   - Ensure all dependencies are in `package.json`
   - Verify Node.js version compatibility

### Debugging

1. **Server Logs:**
   - Check Vercel function logs
   - Use `console.log` for debugging (temporary)

2. **Client Logs:**
   - Check browser console
   - Use network tab to inspect API calls

## Domain Configuration (Optional)

### Custom Domains

1. **Add Custom Domain:**
   - Go to project settings in Vercel
   - Add your custom domain
   - Configure DNS records

2. **Update Environment Variables:**
   - Update `CLIENT_URL` in server
   - Update API URLs in client

## Security Considerations

1. **Environment Variables:**
   - Never commit `.env` files
   - Use strong, unique secrets
   - Rotate secrets regularly

2. **CORS Configuration:**
   - Only allow necessary origins
   - Don't use wildcards in production

3. **Rate Limiting:**
   - Monitor API usage
   - Adjust rate limits as needed

## Monitoring and Maintenance

1. **Vercel Analytics:**
   - Enable analytics in Vercel dashboard
   - Monitor performance and usage

2. **Database Monitoring:**
   - Monitor MongoDB Atlas metrics
   - Set up alerts for issues

3. **Error Tracking:**
   - Consider integrating error tracking (Sentry, etc.)
   - Monitor application logs

## Support

If you encounter issues:

1. Check Vercel documentation
2. Review application logs
3. Test locally first
4. Check environment variable configuration

---

**Note:** This deployment uses serverless functions on Vercel. Each API request will spin up a new function instance, which may cause slight cold start delays but provides excellent scalability.