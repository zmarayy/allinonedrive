# Progressive Learning System Guide

## 🎯 Overview

The app is now a **progressive learning system** where students must complete each day before moving to the next. This ensures structured, sequential learning.

## 📚 User Journey

### 1. **Start Learning**
- User logs in with access code
- Day 1 is automatically unlocked
- Days 2-7 are locked until previous day is completed

### 2. **Study Phase (Each Day)**
- **View PDFs**: Students must open and view all PDFs for the day
- **Progress Tracking**: Shows "X/Y PDFs studied" with progress bar
- **No Downloads**: PDFs can only be viewed in-app (downloads disabled)

### 3. **Quiz Phase**
- Once all PDFs are viewed, "Start Quiz" button appears
- Quiz requires **80% or higher** to pass
- If passed: Can complete the day
- If failed: Must retry (can review PDFs again)

### 4. **Complete Day**
- After passing quiz, "Complete Day" button appears
- Clicking it:
  - Marks day as completed ✅
  - Unlocks next day 🔓
  - Shows celebration message

### 5. **Progress to Next Day**
- Next day becomes available
- Process repeats for all 7 days

## 🔒 Locking System

- **Day 1**: Always unlocked
- **Day 2-7**: Locked until previous day is completed
- Locked days show: 🔒 "Complete Day X to unlock"

## 📊 Progress Tracking

### What's Tracked:
- ✅ PDFs viewed (per day)
- ✅ Quiz scores (per day)
- ✅ Quiz pass/fail status (80% threshold)
- ✅ Day completion status
- ✅ Overall course progress (0-100%)

### Storage:
- All progress stored in `localStorage`
- Persists across sessions
- Can be reset for testing

## 🎨 Visual Indicators

### Day Status:
- **🔒 Locked**: Gray, disabled, shows lock icon
- **⏳ In Progress**: Normal card, shows "X/Y PDFs studied"
- **✅ Completed**: Green border, checkmark, "Completed" badge

### Progress Bars:
- PDF study progress per day
- Overall course progress on Dashboard

## 🚫 Restrictions

1. **No PDF Downloads**: PDFs can only be viewed in-app
2. **Sequential Learning**: Must complete days in order
3. **Quiz Requirement**: Must pass quiz (80%) to complete day
4. **All PDFs Required**: Must view all PDFs before quiz

## 📱 Mobile Optimized

- Touch-friendly buttons (48px minimum)
- Full-screen PDF viewer on mobile
- Responsive progress indicators
- Smooth animations and transitions

## 🔧 Technical Details

### Key Files:
- `utils/progressManager.js` - Progress tracking logic
- `components/DayCard.jsx` - Day display with locking
- `components/PdfPreviewCard.jsx` - PDF viewer (no downloads)
- `pages/Quiz.jsx` - Quiz with 80% pass requirement
- `pages/Dashboard.jsx` - Progress overview

### Key Functions:
- `isDayUnlocked(dayNumber)` - Check if day is accessible
- `completeDay(dayNumber)` - Mark day as done, unlock next
- `canCompleteDay(dayNumber, totalPdfs)` - Check if ready to complete
- `saveQuizScore(dayNumber, score, total)` - Save quiz results
- `getOverallProgress()` - Get 0-100% progress

## 🎓 Learning Flow Example

**Day 1 Journey:**
1. User opens Day 1 → Sees 8 PDFs
2. Opens each PDF → Progress: 1/8, 2/8, ... 8/8
3. "Start Quiz" button appears
4. Takes quiz → Gets 85% (passed!)
5. "Complete Day 1" button appears
6. Clicks complete → Day 1 ✅, Day 2 🔓 unlocked

**Day 2 Journey:**
1. Day 2 now accessible
2. Repeat process...
3. Complete Day 2 → Day 3 unlocked
4. And so on...

## 🧪 Testing

To reset all progress for testing:
```javascript
import { resetProgress } from './utils/progressManager';
resetProgress();
```

## 📈 Future Enhancements

- Flashcards based on PDF content
- Practice mode vs Test mode
- Review incorrect quiz answers
- Study time tracking
- Achievement badges
- Social sharing of progress

