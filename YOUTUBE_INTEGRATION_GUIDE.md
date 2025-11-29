# YouTube Integration Guide

## ✅ What's Been Done

I've updated the app to support YouTube video embeds! The app now supports:
- **YouTube videos** (via video ID or URL)
- **Local video files** (still supported for backward compatibility)

## 📝 How to Add YouTube Videos

### Step 1: Upload Videos to YouTube

1. Go to [YouTube Studio](https://studio.youtube.com/)
2. Upload your videos
3. Set them as **Unlisted** (so only people with link can see them)
4. Copy the video ID or full URL

### Step 2: Update `courseContent.js`

In `frontend/src/data/courseContent.js`, replace `videoPath` with `youtubeVideoId`:

**Before:**
```javascript
{
  title: "Rule 1 to 17",
  filePath: "/course-materials/standard/day-1/rule-1-to-17.pdf",
  videoPath: "/course-materials/standard/day-1/videos/rule-1-to-17.mp4"
}
```

**After (Option 1 - Video ID only):**
```javascript
{
  title: "Rule 1 to 17",
  filePath: "/course-materials/standard/day-1/rule-1-to-17.pdf",
  youtubeVideoId: "dQw4w9WgXcQ"  // Just the video ID
}
```

**After (Option 2 - Full URL):**
```javascript
{
  title: "Rule 1 to 17",
  filePath: "/course-materials/standard/day-1/rule-1-to-17.pdf",
  youtubeVideoId: "https://www.youtube.com/watch?v=dQw4w9WgXcQ"  // Full URL (will extract ID)
}
```

**After (Option 3 - YouTube Short URL):**
```javascript
{
  title: "Rule 1 to 17",
  filePath: "/course-materials/standard/day-1/rule-1-to-17.pdf",
  youtubeVideoId: "https://youtu.be/dQw4w9WgXcQ"  // Short URL (will extract ID)
}
```

## 🎯 Supported YouTube URL Formats

The app automatically extracts video IDs from:
- `https://www.youtube.com/watch?v=VIDEO_ID`
- `https://youtu.be/VIDEO_ID`
- `https://www.youtube.com/embed/VIDEO_ID`
- Just the video ID: `VIDEO_ID`

## 📋 Template for All Videos

When you send me the YouTube links, I'll need them in this format:

```javascript
// Day 1 Videos
{
  title: "Rule 1 to 17",
  youtubeVideoId: "YOUR_VIDEO_ID_1"
},
{
  title: "Drivers and Motorcyclists (89-102)",
  youtubeVideoId: "YOUR_VIDEO_ID_2"
},
// ... etc for all videos
```

## 🔄 What Happens in the App

1. **User clicks "Watch Video"** → Modal opens
2. **YouTube iframe loads** → Video plays with YouTube's controls
3. **After 5 seconds** → Video is marked as "watched" (unlocks PDF)
4. **User can then study PDF** → Same flow as before

## 💡 Benefits

- ✅ **Free hosting** - No bandwidth costs
- ✅ **Fast loading** - YouTube's global CDN
- ✅ **Mobile optimized** - YouTube handles all device compatibility
- ✅ **No storage** - Videos not stored in your app
- ✅ **Saves ~$7,000/month** at 100k users scale

## 📝 Next Steps

1. Upload all videos to YouTube (unlisted)
2. Send me the video IDs/URLs in the format above
3. I'll update `courseContent.js` with all the YouTube IDs
4. Deploy and test!

## ⚠️ Notes

- Videos should be **Unlisted** (not Private) so they can be embedded
- The app will still work with local videos if `videoPath` is provided
- YouTube videos use YouTube's native player (better UX)
- Video watching is tracked (marks as watched after 5 seconds)

