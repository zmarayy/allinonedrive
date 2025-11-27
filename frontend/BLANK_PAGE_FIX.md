# Fixing Blank Page on PWA

## Most Likely Causes

### 1. **Build Failed or Incomplete**
The blank page usually means the React app didn't build correctly.

**Check:**
- Go to Netlify Dashboard → Your PWA Site → Deploys
- Look at the build logs
- Make sure build completed successfully (green checkmark)

**Fix:**
- If build failed, check the error message
- Make sure all dependencies are in `package.json`
- Try rebuilding

### 2. **Missing Environment Variables**
If `REACT_APP_API_URL` is missing, the app might crash.

**Fix:**
1. Netlify Dashboard → Site settings → Environment variables
2. Add: `REACT_APP_API_URL` = `https://your-backend-url.com/api`
3. Redeploy

### 3. **JavaScript Error**
The app might be crashing due to a JavaScript error.

**To Debug:**
1. On your phone, open the PWA
2. Connect phone to computer
3. Open Chrome DevTools → More tools → Remote devices
4. Select your phone
5. Check Console tab for errors

### 4. **CSS Not Loading**
If Tailwind CSS isn't building, the page might appear blank.

**Check:**
- Make sure `tailwind.config.js` exists in `frontend` folder
- Make sure `postcss.config.js` exists
- Check build logs for CSS compilation errors

## Quick Test

Test the build locally first:

```bash
cd frontend
npm install
npm run build
```

If this works locally but not on Netlify:
- Check Netlify build logs
- Verify Node version (should be 18)
- Make sure all files are included in deployment

## What I've Fixed

1. ✅ Root route now redirects to `/access-code` automatically
2. ✅ Added error boundary to catch and display errors
3. ✅ Added better error handling

## Next Steps

1. **Redeploy the PWA** with these changes
2. **Check Netlify build logs** for any errors
3. **Add environment variable** `REACT_APP_API_URL` in Netlify
4. **Test again** on your phone

If still blank, check the browser console on your phone for specific error messages.

