# All In One Drive PWA

A modern, mobile-optimized Progressive Web App for the All In One Drive DVSA Theory Course.

## Features

- 📱 **PWA Support**: Installable on mobile devices and desktops
- 🎨 **Glassmorphism Design**: Apple-inspired modern UI
- 🌍 **Multi-language**: Support for Pashto, Urdu, Dari, and English
- 📴 **Offline Support**: Service worker for offline caching
- 📱 **Mobile-First**: Optimized for mobile devices
- ⚡ **Fast**: Optimized performance with React

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

The app will open at `http://localhost:3000`

### Building for Production

```bash
npm run build
```

This creates an optimized production build in the `build` folder.

## Project Structure

```
frontend/
├── public/
│   ├── manifest.json      # PWA manifest
│   ├── sw.js              # Service worker
│   ├── index.html         # HTML template
│   └── icon-*.png         # App icons (to be added)
├── src/
│   ├── components/        # Reusable components
│   │   ├── LanguageSelector.js
│   │   └── InstallButton.js
│   ├── pages/             # Page components
│   │   └── Home.js
│   ├── App.js             # Main app component
│   ├── App.css            # App styles
│   ├── index.js           # Entry point
│   └── index.css          # Global styles
├── package.json
├── tailwind.config.js     # Tailwind configuration
└── README.md
```

## Future Expansion

The structure is prepared for:
- 📚 Lessons module
- 🃏 Flashcards
- 🔐 Authentication/Login
- 📊 Progress tracking
- 💬 Chat/Support
- 📝 Quizzes

## PWA Features

### Manifest
- App name and icons configured
- Theme colors set
- Standalone display mode

### Service Worker
- Basic offline caching
- Cache versioning
- Automatic cache cleanup

### Install Prompt
- Automatic detection of install capability
- Custom install button
- User-friendly installation flow

## Icons Needed

Place the following icon files in the `public` folder:
- `icon-192x192.png`
- `icon-512x512.png`
- `favicon.ico`

## Browser Support

- Chrome/Edge (recommended for PWA features)
- Firefox
- Safari (iOS 11.3+)
- Samsung Internet

## License

All In One Drive © 2025

