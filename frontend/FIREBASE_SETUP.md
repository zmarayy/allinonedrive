# Firebase Setup Instructions

## 1. Create a Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Add project" or select an existing project
3. Follow the setup wizard

## 2. Enable Authentication

1. In Firebase Console, go to **Authentication**
2. Click **Get Started**
3. Enable **Email/Password** authentication
4. Click **Save**

## 3. Create Firestore Database

1. In Firebase Console, go to **Firestore Database**
2. Click **Create database**
3. Start in **Test mode** (for development)
4. Choose your region
5. Click **Enable**

## 4. Get Your Firebase Config

1. In Firebase Console, go to **Project Settings** (gear icon)
2. Scroll down to **Your apps**
3. Click the **Web** icon (`</>`)
4. Register your app (if not already done)
5. Copy the `firebaseConfig` object

## 5. Set Up Environment Variables

Create a `.env` file in the `frontend` directory:

```env
REACT_APP_FIREBASE_API_KEY=your-api-key-here
REACT_APP_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
REACT_APP_FIREBASE_PROJECT_ID=your-project-id
REACT_APP_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=123456789
REACT_APP_FIREBASE_APP_ID=your-app-id
```

Replace the placeholder values with your actual Firebase config values.

## 6. Firestore Security Rules (Development)

For development, you can use these rules in **Firestore > Rules**:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Users can only read/write their own data
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
  }
}
```

## 7. Install Dependencies

The dependencies are already added to `package.json`. Run:

```bash
npm install
```

## Features Implemented

✅ **Sign Up Page** (`/signup`)
- Email + Password registration
- Creates user in Firebase Auth
- Creates user document in Firestore
- Updates user profile with display name

✅ **Login Page** (`/login`)
- Email + Password authentication
- Error handling
- Redirects to dashboard on success

✅ **Protected Routes**
- All lesson pages require authentication
- Dashboard, Progress, Profile pages are protected
- Auto-redirects to login if not authenticated

✅ **User Profile** (`/profile`)
- Shows user name and email
- Displays lessons completed (Day 1-7)
- Shows quiz scores
- Shows badges earned
- Logout button

✅ **Firestore Integration**
- Progress synced to Firestore under user's UID
- Progress structure:
  ```javascript
  {
    lessonsCompleted: [1, 2, 3],
    quizScores: {
      1: "6/7",
      2: "7/7"
    },
    badgesEarned: [1, 2],
    currentDay: 4
  }
  ```

✅ **Auto-Sync**
- Progress automatically syncs to Firestore when:
  - Lesson is marked complete
  - Quiz is completed
  - Badge is earned
- Progress loads from Firestore on login

## Testing

1. Start the app: `npm start`
2. Navigate to `/signup` to create an account
3. After signing up, you'll be redirected to `/dashboard`
4. Complete lessons and take quizzes to see progress sync
5. Check `/profile` to see your progress data
6. Logout and login again to verify data persistence

