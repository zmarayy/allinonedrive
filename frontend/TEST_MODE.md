# Testing Without Firebase Setup

## Option 1: Quick Test Mode (No Firebase Required)

I can temporarily disable authentication so you can test the app immediately. This is just for testing purposes.

## Option 2: Quick Firebase Setup (5 minutes)

If you want to test the full authentication flow, follow these steps:

### Step 1: Create Firebase Project (2 minutes)

1. Go to https://console.firebase.google.com/
2. Click "Add project" or "Create a project"
3. Enter project name: "all-in-one-drive" (or any name)
4. Click "Continue"
5. Disable Google Analytics (or enable it if you want)
6. Click "Create project"
7. Wait for project to be created, then click "Continue"

### Step 2: Enable Authentication (1 minute)

1. In Firebase Console, click "Authentication" in the left menu
2. Click "Get started"
3. Click on "Email/Password"
4. Enable "Email/Password" (toggle it ON)
5. Click "Save"

### Step 3: Create Firestore Database (1 minute)

1. Click "Firestore Database" in the left menu
2. Click "Create database"
3. Select "Start in test mode" (for development)
4. Click "Next"
5. Choose your location (closest to you)
6. Click "Enable"

### Step 4: Get Your Config (1 minute)

1. Click the gear icon (⚙️) next to "Project Overview"
2. Scroll down to "Your apps"
3. Click the web icon (`</>`)
4. Register app name: "All In One Drive Web"
5. Click "Register app"
6. Copy the `firebaseConfig` object

### Step 5: Add Config to Project

1. Create a file named `.env` in the `frontend` directory
2. Add your config like this:

```env
REACT_APP_FIREBASE_API_KEY=your-api-key-here
REACT_APP_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
REACT_APP_FIREBASE_PROJECT_ID=your-project-id
REACT_APP_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=123456789
REACT_APP_FIREBASE_APP_ID=your-app-id
```

3. Replace the placeholder values with your actual Firebase config values
4. Restart the development server (stop with Ctrl+C, then run `npm start` again)

### Step 6: Create Your First Account

1. Go to `http://localhost:3000/signup`
2. Enter your name, email, and password
3. Click "Sign Up"
4. You'll be automatically logged in!

## Option 3: Test Mode (Bypass Auth)

If you want to test the app immediately without Firebase, I can modify the code to temporarily bypass authentication. Let me know if you want this option!

