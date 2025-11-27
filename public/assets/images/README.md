# Assets Folder

This folder contains all the static assets for the All In One Drive website.

## Logo Files

### How to Add Your Logo

1. **Drop your logo file** into this folder: `/public/assets/images/`
2. **Name it exactly:** `logo.png` (or `logo.jpg`, `logo.svg`, etc.)
3. **Supported formats:** PNG, JPG, SVG, WebP
4. **Recommended size:** 200x200px or larger (will be scaled automatically)

### Current Setup

The website is currently looking for: `/public/assets/images/logo.png`

If your logo file has a different name or format, you can either:
- Rename it to `logo.png`
- Or update the Logo component in `/src/Logo.js` to point to your file name

### Fallback

If no logo file is found, the website will automatically show a teal-colored SVG version of the logo design.

## File Structure

```
public/
├── assets/
│   └── images/
│       ├── logo.png          ← Drop your logo here
│       ├── logo@2x.png       ← Optional: High-res version
│       └── logo.svg          ← Optional: Vector version
```

## Usage

The logo will automatically appear:
- ✅ Top left of every page (next to "All In One Drive")
- ✅ Footer of every page
- ✅ All 7 pages: Home, About, Booking, Instructors, Contact, FAQ, Terms

## Technical Details

- **Responsive:** Logo scales automatically on mobile/desktop
- **Optimized:** Uses `object-contain` for proper aspect ratio
- **Accessible:** Includes proper alt text
- **Fallback:** Shows SVG version if image fails to load
