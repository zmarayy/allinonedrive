# Troubleshooting Blank Page on PWA

## Common Causes of Blank Page

### 1. Missing Environment Variables

The PWA needs the API URL to verify access codes. If it's missing, the app might crash.

**Fix:**
1. Go to Netlify Dashboard → Your PWA Site → Site settings → Environment variables
2. Add: `REACT_APP_API_URL` = `https://your-backend-url.com/api`
3. Redeploy the site

### 2. JavaScript Errors

Check the browser console for errors:
- Open the PWA on your phone
- Use remote debugging (Chrome DevTools → More tools → Remote devices)
- Or check Netlify build logs

### 3. Build Issues

Make sure the build completed successfully:
- Check Netlify build logs
- Verify all dependencies are installed
- Make sure `npm run build` completes without errors

### 4. CSS Not Loading

If Tailwind CSS isn't building:
- Check `tailwind.config.js` is in the frontend folder
- Verify `postcss.config.js` exists
- Make sure build includes CSS files

### 5. Service Worker Issues

If service worker is blocking:
- Clear browser cache
- Unregister service worker
- Hard refresh the page

## Quick Fixes

### Test Locally First

```bash
cd frontend
npm install
npm run build
npm install -g serve
serve -s build
```

Visit `http://localhost:3000` - if it works locally, it's a deployment issue.

### Check Netlify Build Logs

1. Go to Netlify Dashboard
2. Click on your site
3. Go to "Deploys" tab
4. Click on the latest deploy
5. Check for any errors in the build log

### Verify Environment Variables

Make sure these are set in Netlify:
- `REACT_APP_API_URL` - Your backend API URL

### Check Browser Console

On your phone:
1. Connect to computer
2. Open Chrome DevTools
3. Go to "Remote devices"
4. Select your phone
5. Check console for errors

## If Still Blank

1. **Redeploy** - Sometimes a fresh deploy fixes issues
2. **Clear cache** - Clear browser cache and cookies
3. **Check build output** - Make sure `build` folder has `index.html` and all assets
4. **Verify routing** - Make sure `_redirects` file is in `public` folder

