# Quick Start Guide - Running the PWA on Localhost

## Step 1: Navigate to the Frontend Directory

Open your terminal and navigate to the frontend directory:

```bash
cd /Users/ai/AllinOnedrive/frontend
```

Or if you're already in the project root:

```bash
cd frontend
```

## Step 2: Install Dependencies (if not already done)

If you haven't installed the dependencies yet:

```bash
npm install
```

This will install all required packages (React, Firebase, Tailwind, etc.)

## Step 3: Start the Development Server

Run the start command:

```bash
npm start
```

This will:
- Start the React development server
- Automatically open your browser to `http://localhost:3000`
- Enable hot-reloading (changes update automatically)

## Step 4: Access the PWA

Once the server starts, you can access the PWA at:

**http://localhost:3000**

The app will automatically open in your default browser. If it doesn't, manually navigate to that URL.

## What You'll See

1. **Home Page** (`/`) - Landing page with language selector
2. **Login Page** (`/login`) - Sign in (you'll need Firebase configured)
3. **Sign Up Page** (`/signup`) - Create account
4. **Dashboard** (`/dashboard`) - Main learning interface (requires login)
5. **App Page** (`/app`) - PWA installation instructions

## Important Notes

### Firebase Configuration

Before you can use authentication features, you need to set up Firebase:

1. Create a `.env` file in the `frontend` directory
2. Add your Firebase config (see `FIREBASE_SETUP.md` for details)

If Firebase isn't configured yet, you can still:
- View the Home page
- Navigate the UI
- See the layout and design

### Default Port

If port 3000 is already in use, React will ask if you want to use a different port (like 3001).

### Stopping the Server

Press `Ctrl + C` in the terminal to stop the development server.

## Troubleshooting

**Port already in use?**
- React will automatically suggest an alternative port
- Or manually specify: `PORT=3001 npm start`

**Dependencies not installing?**
- Make sure you have Node.js installed (version 14 or higher)
- Try deleting `node_modules` and `package-lock.json`, then run `npm install` again

**White screen or errors?**
- Check the browser console (F12) for error messages
- Make sure all dependencies are installed
- Check if Firebase config is properly set up

## Next Steps

1. Configure Firebase (see `FIREBASE_SETUP.md`)
2. Test the authentication flow
3. Try the lessons and quizzes
4. Test on mobile devices by accessing `http://[your-ip-address]:3000`

