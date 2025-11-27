# 🧪 TEST MODE ENABLED

The app is currently in **TEST MODE** which means:
- ✅ You can access all pages without signing in
- ✅ No Firebase authentication required
- ✅ Perfect for testing the UI and features

## How to Access the App

1. The server should already be running at `http://localhost:3000`
2. Navigate directly to any page:
   - Dashboard: `http://localhost:3000/dashboard`
   - Lessons: `http://localhost:3000/lesson/1`
   - Flashcards: `http://localhost:3000/flashcards`
   - Progress: `http://localhost:3000/progress`
   - Profile: `http://localhost:3000/profile`
   - Quiz: `http://localhost:3000/quiz/1`

## What Works Without Firebase

- ✅ All pages and navigation
- ✅ UI and design
- ✅ Lessons viewing
- ✅ Flashcards
- ✅ Progress tracking (stored in localStorage)
- ✅ Quiz taking
- ✅ All visual features

## What Won't Work

- ❌ User authentication
- ❌ Firestore sync (progress won't sync to cloud)
- ❌ User profile data from Firebase
- ❌ Multi-device sync

## Disabling Test Mode

When you're ready to use Firebase authentication:

1. Open `frontend/src/components/ProtectedRoute.jsx`
2. Change `const TEST_MODE = true;` to `const TEST_MODE = false;`
3. Set up Firebase (see `FIREBASE_SETUP.md`)
4. Restart the server

## Quick Navigation

- **Home**: `/` - Landing page
- **Dashboard**: `/dashboard` - Main learning hub
- **Lesson 1**: `/lesson/1` - View first lesson
- **Quiz 1**: `/quiz/1` - Take first quiz
- **Progress**: `/progress` - See your progress
- **Profile**: `/profile` - User profile (won't show Firebase data in test mode)

Enjoy testing! 🚀

