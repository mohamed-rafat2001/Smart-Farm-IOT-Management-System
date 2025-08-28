# Server Environment Variables Setup Guide

## 🚨 **Server is Crashing - Environment Variables Missing**

Your server is returning 500 errors because required environment variables are not set.

## 📋 **Step-by-Step Fix**

### **Step 1: Go to Your Server Project on Vercel**

1. Open [Vercel Dashboard](https://vercel.com/dashboard)
2. Find your server project: `smart-farm-server-v1`
3. Click on the project

### **Step 2: Set Environment Variables**

1. Go to **Settings** tab
2. Click on **Environment Variables**
3. Add these variables one by one:

#### **Required Variables:**

**1. Database URL:**

```
Name: DB_URL
Value: mongodb+srv://username:password@cluster.mongodb.net/smartfarm?retryWrites=true&w=majority
```

_Replace `username`, `password`, and `cluster.mongodb.net` with your actual MongoDB Atlas details_

**2. JWT Secret Key:**

```
Name: JWTKEY
Value: your-super-secret-jwt-key-here
```

_Replace with a strong secret key (at least 32 characters)_

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

### **Step 3: Redeploy Server**

1. After adding all environment variables
2. Go to **Deployments** tab
3. Click **Redeploy** on the latest deployment

### **Step 4: Test Server**

Visit: `https://smart-farm-server-v1.vercel.app/api/test`

Should return:

```json
{
	"status": "success",
	"message": "Server is working!",
	"envVars": {
		"hasDbUrl": true,
		"hasDbPassword": true,
		"hasJwtKey": true,
		"hasClientUrl": true
	}
}
```

## 🔍 **Troubleshooting**

### **If you don't have MongoDB Atlas:**

1. Go to [MongoDB Atlas](https://cloud.mongodb.com/)
2. Create a free cluster
3. Get your connection string
4. Replace the DB_URL value

### **If you need a JWT key:**

Generate a random string (at least 32 characters):

```
JWTKEY=smart-farm-jwt-secret-key-2024-very-secure-and-long
```

### **If server still crashes:**

1. Check Vercel function logs
2. Look for specific error messages
3. Verify all environment variables are set correctly

## 📞 **Quick Checklist**

- [ ] **DB_URL** - MongoDB connection string
- [ ] **JWTKEY** - JWT secret key
- [ ] **CLIENT_URL** - Client domain
- [ ] **NODE_ENV** - Set to production
- [ ] **Server redeployed** after setting variables
- [ ] **Server responds** to `/api/test`

## 🎯 **Expected Result**

After setting environment variables and redeploying:

- ✅ Server responds without 500 errors
- ✅ `/api/test` endpoint works
- ✅ Client can connect to server
- ✅ No more network errors
