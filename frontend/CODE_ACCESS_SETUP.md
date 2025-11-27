# Code-Based Access System Setup

## Overview

The PWA now uses a code-based access system where users enter a unique 8-character access code to unlock content based on their purchased package.

## Features Implemented

### 1. Access Code Entry Screen (`/access-code`)
- Clean, centered input screen
- 8-character alphanumeric code validation
- Real-time format checking
- Calls backend `/verify-code` endpoint
- Stores code and package info in localStorage
- Redirects to dashboard on success

### 2. Code Verification
- Validates code format (A-Z, 0-9, 8 characters)
- Calls backend API to verify code
- Stores verified code and package type
- Shows error messages for invalid codes

### 3. Protected Routes
- All protected routes check for verified access code
- Redirects to `/access-code` if no code found
- Persistent across page reloads

### 4. Package-Based Content Locking
- Content visibility based on purchased package:
  - **Standard**: PDFs, flashcards, summary sheets
  - **Elite**: Standard + video lessons
  - **Pro**: Elite + Day 1 & Day 7 live classes
  - **Ultimate Pro**: Pro + Day 2 live class + WhatsApp support

### 5. Logout Functionality
- Clears access code from localStorage
- Redirects to access code entry screen
- Reloads app to clear all state

## Configuration

### Backend API URL

Set the backend API URL in your `.env` file:

```env
REACT_APP_API_URL=http://localhost:5000/api
```

For production, update to your deployed backend URL.

### Default Behavior

If `REACT_APP_API_URL` is not set, it defaults to `http://localhost:5000/api`.

## File Structure

### New Files Created

- `src/pages/AccessCodeEntry.jsx` - Access code input screen
- `src/utils/codeAccess.js` - Code storage and validation utilities
- `src/utils/api.js` - Backend API service
- `src/utils/packageAccess.js` - Package-based access control

### Modified Files

- `src/App.js` - Added `/access-code` route
- `src/components/ProtectedRoute.jsx` - Now checks for access code instead of Firebase auth
- `src/pages/Dashboard.jsx` - Shows package badge
- `src/pages/UserProfile.jsx` - Added logout and package info display
- `src/pages/Home.js` - Redirects to access code if not verified

## Usage Flow

1. User opens PWA → Redirected to `/access-code` if no code
2. User enters 8-character code → Validates format
3. Code verified with backend → Stores code and package
4. User redirected to dashboard → Content unlocked based on package
5. On future visits → Code persists, user goes directly to dashboard
6. User can logout → Clears code, returns to access code entry

## Testing

### Test Code Generation

Use the backend test endpoint:
```
GET http://localhost:5000/api/test-generate-code?email=test@example.com&package=ultimate_pro
```

This will return a code you can use for testing.

### Test Code Verification

Enter the generated code in the PWA access code entry screen.

## Next Steps

1. **Content Locking Implementation**: Update individual pages (LessonViewer, Flashcards, etc.) to check package access using `hasAccess()` from `packageAccess.js`

2. **Package-Specific UI**: Show/hide features based on package:
   - Video lesson buttons (Elite+)
   - Live class booking (Pro+)
   - WhatsApp support info (Ultimate Pro)

3. **Stripe Integration**: Connect backend `/generate-code` endpoint to Stripe webhooks for automatic code generation after payment

## Package Access Functions

Use these utilities to check access:

```javascript
import { hasAccess, getUserPackage, getPackageDisplayName } from '../utils/packageAccess';

// Check if user has access to a feature
if (hasAccess('video_lessons')) {
  // Show video lessons
}

// Get current package
const packageType = getUserPackage();

// Get display name
const displayName = getPackageDisplayName(packageType);
```

## Available Features to Check

- `pdfs` - PDF materials (all packages)
- `flashcards` - Flashcards (all packages)
- `summary_sheets` - Summary sheets (all packages)
- `video_lessons` - Video lessons (Elite+)
- `rules_video` - 307 Rules video (Elite+)
- `exam_topics_video` - Exam topics video (Elite+)
- `eds_video` - EDS topics video (Elite+)
- `day1_live_class` - Day 1 live class (Pro+)
- `day7_live_class` - Day 7 live class (Pro+)
- `day2_live_class` - Day 2 live class (Ultimate Pro)
- `whatsapp_support` - WhatsApp support (Ultimate Pro)

