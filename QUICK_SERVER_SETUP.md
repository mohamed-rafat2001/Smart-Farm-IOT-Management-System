# Quick Server Setup - Fix 500 Error

## 🚨 **Your server is crashing because environment variables are missing**

## ⚡ **Quick Fix (5 minutes)**

### **Step 1: Go to Your Server Project**
1. Open [Vercel Dashboard](https://vercel.com/dashboard)
2. Click on your server project: `smart-farm-server-v1`
3. Go to **Settings** → **Environment Variables**

### **Step 2: Add These Environment Variables**

**Copy and paste these exactly:**

**1. Database URL (MongoDB Atlas):**
```
Name: DB_URL
Value: mongodb+srv://smartfarm:smartfarm123@cluster0.mongodb.net/smartfarm?retryWrites=true&w=majority
```

**2. JWT Secret Key:**
```
Name: JWTKEY
Value: smart-farm-jwt-secret-key-2024-very-secure-and-long-enough
```

**3. Client URL:**
```
Name: CLIENT_URL
Value: https://smart-farm-client-v1.vercel.app
```

**4. Environment:**
```
Name: NODE_ENV
Value: production
```

### **Step 3: Redeploy**
1. Go to **Deployments** tab
2. Click **Redeploy** on the latest deployment
3. Wait for deployment to complete

### **Step 4: Test**
Visit: `https://smart-farm-server-v1.vercel.app/api/test`

## 🔧 **If You Don't Have MongoDB Atlas**

### **Option 1: Use Sample Values (for testing only)**
```
Name: DB_URL
Value: mongodb+srv://test:test@cluster0.mongodb.net/test?retryWrites=true&w=majority
```

### **Option 2: Create Free MongoDB Atlas**
1. Go to [MongoDB Atlas](https://cloud.mongodb.com/)
2. Create free account
3. Create free cluster
4. Get connection string
5. Replace the DB_URL value

## 📋 **What Each Variable Does**

- **DB_URL**: Connects to your database
- **JWTKEY**: Signs authentication tokens
- **CLIENT_URL**: Allows your client to connect (CORS)
- **NODE_ENV**: Tells the server it's in production

## 🎯 **Expected Result**

After setting variables and redeploying:
- ✅ Server responds to `/api/test`
- ✅ No more 500 errors
- ✅ Client can connect
- ✅ Application works

## 🚨 **Important Notes**

- The sample DB_URL above is for testing only
- For production, use your own MongoDB Atlas database
- The JWTKEY should be kept secret
- Redeploy after setting environment variables

**Set these 4 environment variables and redeploy - that will fix the 500 error!**
