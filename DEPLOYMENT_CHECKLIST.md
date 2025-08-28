# Smart Farm Deployment Checklist

## 🎯 **Your Deployment Domains**

- **Client**: `https://smart-farm-client-v1.vercel.app`
- **Server**: `https://smart-farm-server-v1.vercel.app`

## 📋 **Pre-Deployment Checklist**

### ✅ **Client Deployment (Already Done)**

- [x] Client deployed to: `https://smart-farm-client-v1.vercel.app`
- [x] Build errors fixed (case sensitivity issues)
- [x] All imports working correctly

### ✅ **Server Deployment (Already Done)**

- [x] Server deployed to: `https://smart-farm-server-v1.vercel.app`
- [x] Server configuration updated with CORS
- [x] Error handling implemented

### 🔧 **Environment Variables Setup (Next Steps)**

#### **1. Set Server Environment Variables**
Go to your server project settings → Environment Variables and add:

```env
# Required Environment Variables
DB_URL=mongodb+srv://username:password@cluster.mongodb.net/smartfarm?retryWrites=true&w=majority
JWTKEY=your-super-secret-jwt-key-here
CLIENT_URL=https://smart-farm-client-v1.vercel.app

# Optional but recommended
NODE_ENV=production
MODE=PRODUCTION
```

#### **2. Set Client Environment Variables**
In your client project settings → Environment Variables, add:

```env
# API Configuration for Production
VITE_API_URL=https://smart-farm-server-v1.vercel.app/api/v1
```

## 🧪 **Testing Your Deployment**

### **1. Test Server Health**
Visit these endpoints:
- `https://smart-farm-server-v1.vercel.app/api/test`
- `https://smart-farm-server-v1.vercel.app/api/v1/health`

### **2. Test Client-Server Communication**
1. Visit: `https://smart-farm-client-v1.vercel.app`
2. Try to register/login
3. Check browser console for API errors

### **3. Test Database Connection**
The `/api/test` endpoint will show:
```json
{
  "envVars": {
    "hasDbUrl": true,
    "hasDbPassword": true,
    "hasJwtKey": true
  }
}
```

## 🔍 **Troubleshooting**

### **If Server Returns 500 Error:**
1. Check Vercel function logs
2. Verify environment variables are set
3. Test database connection
4. Check CORS configuration

### **If Client Can't Connect to Server:**
1. Verify `VITE_API_URL` is set correctly
2. Check server domain is accessible
3. Verify CORS allows your client domain
4. Check browser console for errors

### **If Database Connection Fails:**
1. Verify MongoDB Atlas cluster is running
2. Check connection string format
3. Ensure IP whitelist includes `0.0.0.0/0`
4. Verify username/password

## 📝 **Final Steps**

### **After Setting Environment Variables:**
1. **Redeploy server** to pick up environment variables
2. **Redeploy client** to pick up environment variables
3. **Test the full application**

### **Environment Variables Summary:**

**Server Project:**
- `DB_URL` - MongoDB connection string
- `JWTKEY` - JWT secret key
- `CLIENT_URL` - `https://smart-farm-client-v1.vercel.app`

**Client Project:**
- `VITE_API_URL` - `https://smart-farm-server-v1.vercel.app/api/v1`

## 🎉 **Success Indicators**

Your deployment is successful when:
- ✅ Server responds to `/api/test` and `/api/v1/health`
- ✅ Client loads without console errors
- ✅ User registration/login works
- ✅ Database operations succeed
- ✅ No CORS errors in browser console

## 📞 **Need Help?**

If you encounter issues:
1. Check Vercel function logs
2. Test endpoints individually
3. Verify environment variables
4. Check MongoDB Atlas status
