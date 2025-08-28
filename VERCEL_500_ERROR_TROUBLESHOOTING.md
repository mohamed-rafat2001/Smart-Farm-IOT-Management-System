# Vercel 500 Internal Server Error Troubleshooting

This guide helps resolve the `FUNCTION_INVOCATION_FAILED` error when deploying to Vercel.

## Common Causes of 500 Errors

### 1. Missing Environment Variables

**Problem**: Required environment variables are not set in Vercel
**Solution**:

1. Go to your Vercel project dashboard
2. Navigate to Settings > Environment Variables
3. Add the required variables:

```env
# Required for database connection
DB_URL=mongodb+srv://username:password@cluster.mongodb.net/smartfarm?retryWrites=true&w=majority
DB_PASSWORD=your_database_password

# Required for JWT authentication
JWTKEY=your-super-secret-jwt-key-here

# Required for CORS
CLIENT_URL=https://your-client-app.vercel.app

# Optional but recommended
NODE_ENV=production
MODE=PRODUCTION
```

### 2. Database Connection Issues

**Problem**: MongoDB Atlas connection fails
**Solution**:

1. **Check connection string format**:

   ```
   mongodb+srv://username:password@cluster-name.xxxxx.mongodb.net/database-name?retryWrites=true&w=majority
   ```

2. **Verify MongoDB Atlas settings**:

   - Ensure cluster is running
   - Check IP whitelist (add `0.0.0.0/0` for development)
   - Verify username and password

3. **Test connection locally**:
   ```bash
   node -e "
   const mongoose = require('mongoose');
   mongoose.connect('your_connection_string_here')
     .then(() => console.log('✅ Connected'))
     .catch(err => console.error('❌ Failed:', err.message));
   "
   ```

### 3. Import/Module Issues

**Problem**: ES modules not working properly
**Solution**:

1. Ensure all import statements use `.js` extensions
2. Check that `"type": "module"` is in package.json
3. Verify all dependencies are installed

### 4. Memory/Timeout Issues

**Problem**: Function runs out of memory or times out
**Solution**:

1. Check Vercel function logs for memory usage
2. Optimize database queries
3. Consider upgrading to Vercel Pro for more resources

## Debugging Steps

### Step 1: Test Basic Functionality

Visit your test endpoint to check if the server is working:

```
https://your-server-app.vercel.app/api/test
```

This will show you:

- If the server is responding
- Which environment variables are set
- Current environment status

### Step 2: Check Vercel Function Logs

1. Go to your Vercel project dashboard
2. Click on "Functions" tab
3. Look for error messages in the logs
4. Check the "Runtime Logs" for detailed error information

### Step 3: Verify Environment Variables

The test endpoint will show you which environment variables are missing:

```json
{
	"envVars": {
		"hasDbUrl": true,
		"hasDbPassword": false,
		"hasJwtKey": true
	}
}
```

### Step 4: Test Database Connection

If database connection is the issue:

1. Check MongoDB Atlas cluster status
2. Verify connection string format
3. Test connection locally
4. Check IP whitelist settings

## Environment Variables Checklist

### Required Variables

- [ ] `DB_URL` - MongoDB connection string
- [ ] `DB_PASSWORD` - MongoDB password (if using placeholder)
- [ ] `JWTKEY` - JWT secret key
- [ ] `CLIENT_URL` - Frontend URL for CORS

### Optional Variables

- [ ] `NODE_ENV=production`
- [ ] `MODE=PRODUCTION`
- [ ] `EMAIL_*` - Email configuration
- [ ] `cloud_name`, `api_key`, `api_secret` - Cloudinary configuration

## Common Error Messages and Solutions

### "Cannot read property 'replace' of undefined"

**Cause**: `DB_URL` environment variable is not set
**Solution**: Add `DB_URL` to Vercel environment variables

### "ENOTFOUND" error

**Cause**: Invalid MongoDB connection string or cluster not accessible
**Solution**: Verify connection string and MongoDB Atlas settings

### "Authentication failed"

**Cause**: Wrong username/password in connection string
**Solution**: Check MongoDB Atlas user credentials

### "Module not found"

**Cause**: Missing dependencies or import issues
**Solution**: Check package.json and import statements

## Quick Fix Checklist

1. [ ] **Set all required environment variables** in Vercel dashboard
2. [ ] **Test the `/api/test` endpoint** to verify server is working
3. [ ] **Check Vercel function logs** for specific error messages
4. [ ] **Verify MongoDB Atlas connection** string and settings
5. [ ] **Test database connection** locally
6. [ ] **Redeploy the function** after fixing issues

## Testing Your Fix

After making changes:

1. **Redeploy your Vercel function**
2. **Test the health endpoint**:
   ```
   https://your-server-app.vercel.app/api/v1/health
   ```
3. **Test the debug endpoint**:
   ```
   https://your-server-app.vercel.app/api/test
   ```
4. **Check Vercel logs** for any remaining errors

## Support Resources

- [Vercel Function Logs](https://vercel.com/docs/concepts/functions/function-logs)
- [Vercel Environment Variables](https://vercel.com/docs/concepts/projects/environment-variables)
- [MongoDB Atlas Documentation](https://docs.atlas.mongodb.com/)
- [Vercel Troubleshooting](https://vercel.com/docs/concepts/functions/troubleshooting)
