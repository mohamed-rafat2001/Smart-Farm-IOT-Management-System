# Network Error Troubleshooting Guide

## 🔍 **What is a Network Error?**

A "Network Error" occurs when your client (frontend) cannot connect to your server (backend). This typically happens when:

1. **Server doesn't exist** - The server URL is incorrect or the server isn't deployed
2. **CORS issues** - Server doesn't allow requests from your client domain
3. **Environment variables not set** - Client is using wrong server URL
4. **Server is down** - Server is deployed but not responding

## 🚨 **Immediate Debugging Steps**

### **Step 1: Check Current API URL**

Open your browser console and run:

```javascript
console.log(
	"API URL:",
	import.meta.env.VITE_API_URL ||
		import.meta.env.VITE_APIURL ||
		"http://localhost:3000/api/v1"
);
```

### **Step 2: Test Server Endpoints**

Try visiting these URLs directly in your browser:

- `https://your-server-app.vercel.app/api/test`
- `https://your-server-app.vercel.app/api/v1/health`

**If these return errors, your server isn't deployed or configured properly.**

### **Step 3: Check Environment Variables**

In your Vercel client project settings:

1. Go to Settings → Environment Variables
2. Check if `VITE_API_URL` is set correctly
3. The value should be: `https://your-server-app.vercel.app/api/v1`

## 🔧 **Common Solutions**

### **Problem 1: Server Not Deployed**

**Symptoms:** Server URLs return 404 or don't load

**Solution:**

1. Deploy your server to Vercel
2. Get the server domain from Vercel dashboard
3. Update client environment variables

### **Problem 2: Wrong Server URL**

**Symptoms:** Network error with wrong domain

**Solution:**

1. Check your server domain in Vercel dashboard
2. Update `VITE_API_URL` in client environment variables
3. Redeploy client to pick up new environment variables

### **Problem 3: CORS Issues**

**Symptoms:** Network error with CORS message

**Solution:**

1. Verify server CORS configuration includes your client domain
2. Check server environment variables for `CLIENT_URL`

### **Problem 4: Environment Variables Not Set**

**Symptoms:** Client using localhost URL

**Solution:**

1. Set `VITE_API_URL` in Vercel client project settings
2. Redeploy client after setting environment variables

## 📋 **Step-by-Step Fix**

### **1. Deploy Server First**

```bash
# If you haven't deployed server yet:
# 1. Go to Vercel Dashboard
# 2. Create new project
# 3. Import your repository
# 4. Deploy server
```

### **2. Get Server Domain**

After server deployment, note the domain (e.g., `smart-farm-server.vercel.app`)

### **3. Set Server Environment Variables**

In your server project settings, add:

```env
DB_URL=mongodb+srv://username:password@cluster.mongodb.net/smartfarm?retryWrites=true&w=majority
JWTKEY=your-super-secret-jwt-key-here
CLIENT_URL=https://smart-farm-client-v1.vercel.app
NODE_ENV=production
```

### **4. Set Client Environment Variables**

In your client project settings, add:

```env
VITE_API_URL=https://your-server-app.vercel.app/api/v1
```

### **5. Test Server**

Visit: `https://your-server-app.vercel.app/api/test`

Should return:

```json
{
	"status": "success",
	"message": "Server is working!",
	"envVars": {
		"hasDbUrl": true,
		"hasDbPassword": true,
		"hasJwtKey": true
	}
}
```

### **6. Redeploy Client**

After setting environment variables, redeploy your client project

### **7. Test Full Application**

Visit: `https://smart-farm-client-v1.vercel.app`

## 🔍 **Debugging Commands**

### **Check Current Configuration**

```javascript
// Run in browser console
console.log("Environment:", {
	VITE_API_URL: import.meta.env.VITE_API_URL,
	VITE_APIURL: import.meta.env.VITE_APIURL,
	NODE_ENV: import.meta.env.NODE_ENV,
});
```

### **Test API Connection**

```javascript
// Run in browser console
fetch("https://your-server-app.vercel.app/api/test")
	.then((response) => response.json())
	.then((data) => console.log("Server response:", data))
	.catch((error) => console.error("Server error:", error));
```

## 📞 **Quick Checklist**

- [ ] **Server deployed** to Vercel
- [ ] **Server domain** noted (e.g., `smart-farm-server.vercel.app`)
- [ ] **Server environment variables** set (DB_URL, JWTKEY, CLIENT_URL)
- [ ] **Client environment variables** set (VITE_API_URL)
- [ ] **Server responds** to `/api/test` endpoint
- [ ] **Client redeployed** after setting environment variables
- [ ] **CORS configured** to allow client domain

## 🎯 **Expected URLs**

**Your Setup:**

- **Client**: `https://smart-farm-client-v1.vercel.app`
- **Server**: `https://your-server-app.vercel.app` (replace with actual domain)

**Environment Variables:**

- **Client**: `VITE_API_URL=https://your-server-app.vercel.app/api/v1`
- **Server**: `CLIENT_URL=https://smart-farm-client-v1.vercel.app`

## 🚨 **Most Common Issue**

The most common cause of "Network Error" is that **the server isn't deployed yet** or **the client is trying to connect to the wrong server URL**.

**Solution:** Deploy your server first, then update the client's `VITE_API_URL` environment variable with the correct server domain.
