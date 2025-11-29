# Firestore Database Setup Guide

## Step 1: Enable Firestore Database

1. In Firebase Console, go to **Build** → **Firestore Database**
2. Click **"Create database"**
3. Choose **"Start in production mode"** (we'll set rules)
4. Select a location (choose closest to your users, e.g., `europe-west` for UK)
5. Click **"Enable"**

## Step 2: Set Up Security Rules

Go to **Firestore Database** → **Rules** tab and paste this:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Codes collection - only backend can read/write
    match /codes/{codeId} {
      // Only allow reads/writes from authenticated backend (server-side only)
      // These rules are for client-side access. Backend uses Admin SDK which bypasses these rules.
      allow read, write: if false; // Client-side access blocked (backend uses Admin SDK)
    }
  }
}
```

**Note:** These rules block client-side access. Your backend uses Firebase Admin SDK which bypasses these rules, so it can read/write freely.

## Step 3: Get Your Firebase Project ID

1. In Firebase Console, go to **Project Settings** (gear icon next to "Project Overview")
2. Under **"General"** tab, find **"Project ID"**
3. Copy the Project ID (it should be something like `allinonedrive-84e21`)

## Step 4: Get Service Account Key (Recommended for Production)

1. In Firebase Console, go to **Project Settings** → **Service Accounts** tab
2. Click **"Generate New Private Key"**
3. Click **"Generate Key"** in the popup
4. A JSON file will download - **keep this secure!**

## Step 5: Update Your `.env` File

You have two options:

### Option A: Service Account Key (Recommended)

1. Open the downloaded JSON file
2. Copy the entire JSON content
3. In your `.env` file, add:
   ```env
   FIREBASE_SERVICE_ACCOUNT_KEY={"type":"service_account","project_id":"allinonedrive-84e21",...}
   ```
   (Paste the entire JSON as a single line, or use a JSON minifier)

### Option B: Project ID Only (Simpler, but less secure)

```env
FIREBASE_PROJECT_ID=allinonedrive-84e21
```

## Step 6: Test the Connection

After setting up, test if Firebase is working:

```bash
cd backend
node generate-test-code.js
```

This should create a test code in Firestore.

## Step 7: Verify in Firebase Console

1. Go to **Firestore Database** → **Data** tab
2. You should see a `codes` collection
3. When codes are generated, they'll appear here

## Troubleshooting

### "Firebase Admin not configured" error
- Make sure your `.env` file has either `FIREBASE_SERVICE_ACCOUNT_KEY` or `FIREBASE_PROJECT_ID`
- Check that the JSON is valid (if using service account key)

### "Permission denied" error
- Make sure Firestore is enabled in your Firebase project
- Check that your service account key has the correct permissions

### Codes not appearing in Firestore
- Check backend logs for errors
- Verify the `.env` file is in the `backend` directory
- Make sure you're using the correct project ID

