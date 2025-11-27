# Quick Guide: Deploy PWA to Fix "Launch App" Button

## The Problem
When you click "Launch the App Now" on mobile, it's trying to go to a PWA site that doesn't exist yet.

## Solution: Deploy the PWA Separately

### Step 1: Deploy PWA to Netlify

1. **Go to Netlify Dashboard**
   - Visit https://app.netlify.com
   - Click "Add new site" → "Deploy manually" (or connect to Git if you prefer)

2. **Deploy the Frontend Folder**
   - **IMPORTANT**: You need to deploy the `frontend` folder, NOT the root folder
   - Drag and drop the `frontend` folder from your workspace
   - Or if using Git, make sure you're deploying from the `frontend` directory

3. **Configure Build Settings**
   - Build command: `npm run build`
   - Publish directory: `build`
   - Node version: 18 (or 16+)

4. **Wait for Deployment**
   - Netlify will build and deploy your PWA
   - You'll get a URL like: `https://random-name-12345.netlify.app`
   - **Copy this URL!**

### Step 2: Update Main Website with PWA URL

1. **Go to Your Main Website's Netlify Dashboard**
   - Find the site you deployed earlier (the main website)

2. **Add Environment Variable**
   - Go to: Site settings → Environment variables → Add variable
   - Name: `REACT_APP_PWA_URL`
   - Value: `https://your-pwa-url.netlify.app/access-code`
   - (Replace `your-pwa-url` with the actual URL from Step 1)

3. **Redeploy Main Website**
   - Go to: Deploys → Trigger deploy → Deploy site
   - This will rebuild with the new environment variable

### Step 3: Test

1. **On your phone**, visit your main website
2. Click "Launch the App Now"
3. It should now navigate to your PWA's access code page

## Alternative: If You Want Both on Same Domain

If you want the PWA at a path like `/app` on your main domain:

1. Deploy PWA to a subdirectory (requires Netlify configuration)
2. Update `REACT_APP_PWA_URL` to: `https://yourdomain.com/app/access-code`

## Need Help?

- Check Netlify build logs if deployment fails
- Make sure you're deploying the `frontend` folder, not the root
- Verify the build command is `npm run build`
- Verify publish directory is `build`

