# Netlify Deploy Instructions for PWA

## For `allinonedrive.netlify.app` (PWA App)

### Build Settings in Netlify Dashboard:
- **Base directory:** `frontend`
- **Build command:** `npm install && npm run build`
- **Publish directory:** `frontend/build`

### Manual Drag-and-Drop Deploy:
1. Build the app:
   ```bash
   cd frontend
   npm install
   npm run build
   ```

2. Drag the `frontend/build` folder to Netlify deploy area

### Important:
- This site should serve the **PWA app** (learning app with access codes)
- The marketing website should be on `allinonedrive.com` (different Netlify site)

