# Complete Package Structure Documentation

## Overview

The PWA now supports all four theory packages with a complete structure for each package type. Content is conditionally unlocked based on the user's purchased package.

## Package Hierarchy

1. **Standard** - Base package
2. **Elite** - Standard + Video lessons
3. **Pro** - Elite + Live classes (Day 1 & Day 7)
4. **Ultimate Pro** - Pro + Day 2 live class + WhatsApp support

## Page Structure

### 1. Dashboard (`/dashboard`)
- Welcome message with package badge
- Progress summary
- Quick access cards to all sections:
  - PDF Materials (all packages)
  - Video Lessons (Elite+)
  - Live Classes (Pro+)
  - WhatsApp Support (Ultimate Pro)
- Lesson cards (existing functionality)

### 2. PDF Materials (`/pdfs`)
**Available for:** All packages

**Content:**
- 307 Highway Code Rules (PDF)
- Essential Driving Skills (EDS) Topics (PDF)
- Exam Topics (PDF)
- Exam Summary Notes (PDF)
- DVSA Questions & Answers (PDF)

**Features:**
- Download buttons for each PDF
- File size and type information
- Placeholder for actual file uploads

### 3. Video Lessons (`/videos`)
**Available for:** Elite, Pro, Ultimate Pro

**Content Sections:**
- **307 Highway Code Rules Explained** (40+ video placeholders)
  - Each rule has its own video explanation
  - Grid layout with scrollable view
  
- **Exam Topics Explained** (8 videos)
  - Road Signs and Markings
  - Traffic Lights and Signals
  - Right of Way Rules
  - Parking Regulations
  - Speed Limits
  - Overtaking Rules
  - Roundabouts
  - Motorway Driving

- **Essential Driving Skills Explained** (6 videos)
  - Vehicle Controls
  - Mirrors and Blind Spots
  - Steering Techniques
  - Braking and Acceleration
  - Hazard Perception
  - Emergency Procedures

- **5-Minute Summary Videos** (3 videos)
  - Highway Code Summary
  - Exam Topics Summary
  - EDS Topics Summary

**Locked State:**
- Shows `LockedSection` component for Standard package users
- Displays upgrade message with current and required packages

### 4. Live Classes (`/live-classes`)
**Available for:** Pro, Ultimate Pro

**Content:**
- **Day 1 Live Class** (4 hours)
  - Available for Pro and Ultimate Pro
  - Comprehensive introduction to Highway Code
  
- **Day 7 Live Class** (4 hours)
  - Available for Pro and Ultimate Pro
  - Final review and exam preparation
  
- **Day 2 Live Class** (4 hours)
  - Available ONLY for Ultimate Pro
  - Advanced topics and in-depth practice

**Features:**
- Booking interface (placeholder for calendar integration)
- Class descriptions and schedules
- Locked indicators for unavailable classes
- Instructions for booking process

**Locked State:**
- Shows `LockedSection` component for Standard and Elite package users

### 5. WhatsApp Support (`/whatsapp-support`)
**Available for:** Ultimate Pro only

**Content:**
- Private WhatsApp support group information
- Support hours (Saturday & Sunday, 10 AM - 2 PM)
- What's included:
  - Direct access to instructors
  - 1 week of dedicated support
  - Quick answers to questions
  - Study tips and exam preparation guidance
- Contact information
- Placeholder for WhatsApp group link

**Locked State:**
- Shows `LockedSection` component for all packages except Ultimate Pro

## Navigation

### Bottom Navigation Bar
Updated to include:
- **Home** - Dashboard
- **PDFs** - PDF Materials page
- **Videos** - Video Lessons page
- **Profile** - User Profile with logout

### Quick Access Cards (Dashboard)
All sections accessible from dashboard with:
- Visual indicators for locked/unlocked status
- Locked sections show upgrade messages
- Clickable cards for navigation

## Components

### LockedSection Component
Reusable component for locked content:
- Shows lock icon
- Displays current package
- Shows required package
- Upgrade button linking to packages page
- Consistent styling across all locked sections

## Package Access Control

All pages use the `hasAccess()` function from `packageAccess.js`:

```javascript
import { hasAccess, getUserPackage } from '../utils/packageAccess';

// Check access
if (hasAccess('video_lessons')) {
  // Show video content
}

// Get package
const packageType = getUserPackage();
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

## File Structure

### New Pages Created
- `src/pages/PDFMaterials.jsx` - PDF downloads page
- `src/pages/VideoLessons.jsx` - Video lessons page
- `src/pages/LiveClasses.jsx` - Live class booking page
- `src/pages/WhatsAppSupport.jsx` - WhatsApp support page

### New Components
- `src/components/LockedSection.jsx` - Reusable locked content component

### Updated Files
- `src/App.js` - Added routes for new pages
- `src/pages/Dashboard.jsx` - Added quick access cards
- `src/components/BottomNavbar.jsx` - Updated navigation items

## Next Steps

1. **Upload Real Content:**
   - Replace PDF placeholders with actual files
   - Upload video files or embed video URLs
   - Add real calendar integration for live classes
   - Add actual WhatsApp group link

2. **Enhancements:**
   - Add search functionality for videos
   - Implement video player
   - Add calendar booking system
   - Add progress tracking for videos
   - Add download progress indicators

3. **Testing:**
   - Test with each package type
   - Verify locked sections work correctly
   - Test navigation flow
   - Verify upgrade links work

## Testing Checklist

- [ ] Standard package: Can access PDFs only
- [ ] Elite package: Can access PDFs and Videos
- [ ] Pro package: Can access PDFs, Videos, and Live Classes (Day 1 & 7)
- [ ] Ultimate Pro: Can access all features including Day 2 and WhatsApp
- [ ] Locked sections show correct upgrade messages
- [ ] Navigation works from all pages
- [ ] Logout clears access and redirects correctly

