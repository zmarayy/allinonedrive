# All In One Drive Backend API

Backend API for handling purchase flow and access code generation for digital theory packages.

## 🚀 Setup

### 1. Install Dependencies

```bash
cd backend
npm install
```

### 2. Configure Environment Variables

Create a `.env` file in the `backend` directory:

```env
PORT=5000

# Firebase Admin SDK
FIREBASE_PROJECT_ID=your-project-id
# OR use service account key:
# FIREBASE_SERVICE_ACCOUNT_KEY={"type":"service_account",...}

# Resend API
RESEND_API_KEY=re_your_resend_api_key_here
RESEND_FROM_EMAIL=All In One Drive <noreply@yourdomain.com>
```

### 3. Firebase Admin SDK Setup

#### Option A: Service Account Key (Recommended for Production)

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select your project
3. Go to **Project Settings** > **Service Accounts**
4. Click **Generate New Private Key**
5. Download the JSON file
6. Add the entire JSON content to `.env` as `FIREBASE_SERVICE_ACCOUNT_KEY` (as a single-line JSON string)

#### Option B: Environment Variables (Development)

Set `FIREBASE_PROJECT_ID` in your `.env` file. Note: This requires additional Firebase Admin setup.

### 4. Resend API Setup

1. Sign up at [Resend](https://resend.com/)
2. Get your API key from the dashboard
3. Add `RESEND_API_KEY` to `.env`
4. Set `RESEND_FROM_EMAIL` (use a verified domain or `onboarding@resend.dev` for testing)

### 5. Run the Server

```bash
# Development (with auto-reload)
npm run dev

# Production
npm start
```

The server will run on `http://localhost:5000`

## 📡 API Endpoints

### Health Check

```
GET /health
```

Returns server status.

### Generate Access Code

```
POST /api/generate-code
```

Generates a unique access code and emails it to the user.

**Request Body:**
```json
{
  "email": "user@example.com",
  "package": "ultimate_pro",
  "metadata": {} // optional
}
```

**Package Types:**
- `standard` - Standard Theory Package
- `elite` - Elite Self-Study Package
- `pro` - Pro Package
- `ultimate_pro` - Ultimate Pro Package

**Response:**
```json
{
  "success": true,
  "message": "Access code generated and emailed successfully",
  "email": "user@example.com",
  "package": "ultimate_pro"
}
```

### Verify Access Code

```
POST /api/verify-code
```

Verifies an access code and returns package information.

**Request Body:**
```json
{
  "code": "A8D3F1XY"
}
```

**Response (Success):**
```json
{
  "success": true,
  "valid": true,
  "package": "ultimate_pro",
  "email": "user@example.com",
  "createdAt": "2025-01-XX..."
}
```

**Response (Error):**
```json
{
  "error": "Invalid code",
  "message": "The access code you entered is invalid or does not exist"
}
```

### Test Endpoint (Development)

```
GET /api/test-generate-code?email=user@example.com&package=ultimate_pro
```

Manually trigger code generation for testing.

## 🧪 Testing

### Using cURL

**Generate Code:**
```bash
curl -X POST http://localhost:5000/api/generate-code \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "package": "ultimate_pro"
  }'
```

**Verify Code:**
```bash
curl -X POST http://localhost:5000/api/verify-code \
  -H "Content-Type: application/json" \
  -d '{
    "code": "A8D3F1XY"
  }'
```

### Using Postman

1. Create a new POST request to `http://localhost:5000/api/generate-code`
2. Set headers: `Content-Type: application/json`
3. Add body (raw JSON):
```json
{
  "email": "test@example.com",
  "package": "ultimate_pro"
}
```

## 📦 Database Structure

Codes are stored in Firestore under the `codes` collection:

```json
{
  "code": "A8D3F1XY",
  "email": "user@example.com",
  "package": "ultimate_pro",
  "createdAt": "2025-01-XX...",
  "metadata": {}
}
```

## 🔐 Security Notes

- Access codes are not returned in the API response for security
- Codes are stored in Firestore with email and package information
- Email sending failures don't fail the request (code is still generated)
- In production, implement rate limiting and authentication

## 🔄 Next Steps

1. Integrate with Stripe webhooks for automatic code generation
2. Add authentication middleware for protected endpoints
3. Implement rate limiting
4. Add code expiration dates if needed
5. Add analytics and tracking

## 📝 Notes

- The code generation ensures uniqueness by checking against existing codes
- Email templates are HTML with plain text fallback
- The system is designed to be modular for easy Stripe integration later

