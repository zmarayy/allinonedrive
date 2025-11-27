# Quick Setup Guide

## Step 1: Install Dependencies

```bash
cd backend
npm install
```

## Step 2: Set Up Firebase Admin SDK

### Option A: Service Account Key (Recommended)

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select your project (same one used in frontend)
3. Click the gear icon ⚙️ → **Project Settings**
4. Go to **Service Accounts** tab
5. Click **Generate New Private Key**
6. Download the JSON file
7. Copy the entire JSON content
8. In your `.env` file, add:
   ```
   FIREBASE_SERVICE_ACCOUNT_KEY={"type":"service_account","project_id":"...","private_key":"..."}
   ```
   (Paste the entire JSON as a single line, or use a JSON minifier)

### Option B: Environment Variables (Simpler for Development)

Just add to `.env`:
```
FIREBASE_PROJECT_ID=your-project-id-here
```

Note: This requires additional setup. Option A is recommended.

## Step 3: Set Up Resend

1. Sign up at [Resend](https://resend.com/)
2. Go to **API Keys** in dashboard
3. Create a new API key
4. Add to `.env`:
   ```
   RESEND_API_KEY=re_xxxxxxxxxxxxx
   RESEND_FROM_EMAIL=All In One Drive <noreply@yourdomain.com>
   ```

   For testing, you can use:
   ```
   RESEND_FROM_EMAIL=onboarding@resend.dev
   ```

## Step 4: Create `.env` File

Create a file named `.env` in the `backend` directory:

```env
PORT=5000
FIREBASE_PROJECT_ID=your-project-id
RESEND_API_KEY=re_your_key_here
RESEND_FROM_EMAIL=All In One Drive <noreply@yourdomain.com>
```

## Step 5: Start the Server

```bash
npm start
# or for development with auto-reload:
npm run dev
```

## Step 6: Test the API

### Test Code Generation (GET request in browser or Postman):

```
http://localhost:5000/api/test-generate-code?email=test@example.com&package=ultimate_pro
```

### Test Code Generation (POST request):

```bash
curl -X POST http://localhost:5000/api/generate-code \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","package":"ultimate_pro"}'
```

### Test Code Verification:

```bash
curl -X POST http://localhost:5000/api/verify-code \
  -H "Content-Type: application/json" \
  -d '{"code":"A8D3F1XY"}'
```

## Troubleshooting

### Firebase Admin Error
- Make sure your service account key is valid
- Check that the project ID matches your Firebase project
- Ensure Firestore is enabled in your Firebase project

### Resend Email Error
- Verify your API key is correct
- Check that the `from` email is valid
- For production, verify your domain in Resend

### Port Already in Use
- Change `PORT` in `.env` to a different port (e.g., 5001)

