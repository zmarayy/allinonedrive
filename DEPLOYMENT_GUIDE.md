# Deployment Guide for All In One Drive

## Important: Two Separate Deployments Needed

You have **two separate React applications** that need to be deployed separately:

1. **Main Website** (root folder) - Marketing site with packages, about, etc.
2. **PWA App** (frontend folder) - The learning app with access codes

## Deployment Options

### Option 1: Separate Netlify Sites (Recommended)

Deploy them as two separate Netlify sites:

1. **Main Website:**
   - Deploy the **root folder** (`/Users/ai/AllinOnedrive`)
   - Build command: `npm run build`
   - Publish directory: `build`
   - Site URL: `https://allinonedrive.com` (production domain)

2. **PWA App:**
   - Deploy the **frontend folder** (`/Users/ai/AllinOnedrive/frontend`)
   - Build command: `npm run build`
   - Publish directory: `build`
   - Site URL: `https://allinonedrive.netlify.app` (PWA subdomain)

### Option 2: Same Domain, Different Paths

If you want both on the same domain:

1. Deploy main website to root
2. Deploy PWA to a subdirectory (requires Netlify configuration)

## Update PWA URL in Main Website

After deploying the PWA, update the URL in `src/AppPage.js`:

```javascript
// PWA URL is configured in src/AppPage.js:
// Uses environment variable REACT_APP_PWA_URL or defaults to:
window.location.href = 'https://allinonedrive.netlify.app/access-code';
```

## Environment Variables

### Main Website
- No special env vars needed (unless you have API calls)

### PWA App
Set these in Netlify dashboard:
- `REACT_APP_API_URL` - Your backend API URL (e.g., `https://your-backend.herokuapp.com/api`)
- `REACT_APP_FIREBASE_API_KEY` - (if using Firebase)
- Other Firebase env vars if needed

## Testing

1. Deploy main website first
2. Deploy PWA app
3. Update PWA URL in main website's `AppPage.js`
4. Test "Launch the App Now" button on mobile
5. Test "Add to Home Screen" - should open PWA at `/access-code`

