# Course Materials Setup Guide

## 📁 Where to Place Your PDFs

Place your Standard Package PDFs in:
```
frontend/public/course-materials/standard/
├── day-1/
│   └── day-1-main.pdf  ← Your Day 1 PDF here
├── day-2/
│   └── day-2-main.pdf  ← Your Day 2 PDF here
├── day-3/
│   └── day-3-main.pdf
├── day-4/
│   └── day-4-main.pdf
├── day-5/
│   └── day-5-main.pdf
├── day-6/
│   └── day-6-main.pdf
└── day-7/
    └── day-7-main.pdf
```

## 📝 File Naming

- **Main file for each day**: `day-X-main.pdf` (e.g., `day-1-main.pdf`)
- Use lowercase with hyphens
- The app is already configured to look for these files

## ✅ Quick Steps

1. **Copy your PDFs** to the appropriate day folders
2. **Name them correctly**: `day-1-main.pdf`, `day-2-main.pdf`, etc.
3. **Update file sizes** in `frontend/src/data/courseContent.js` (optional, but recommended)
4. **That's it!** The app will automatically display them with previews

## 🎨 Features

- **PDF Preview**: Users can preview PDFs in a modal without downloading
- **Download Button**: Direct download option
- **Responsive Design**: Works on all devices
- **Clean UI**: Professional presentation with cards

## 📊 Updating File Sizes

If you want to show accurate file sizes, edit `frontend/src/data/courseContent.js`:

```javascript
pdfNotes: [
  { 
    title: "Day 1 Course Material", 
    description: "Complete PDF notes and materials for Day 1", 
    fileSize: "2.5 MB",  // ← Update this with actual size
    filePath: "/course-materials/standard/day-1/day-1-main.pdf",
    downloadPath: "/course-materials/standard/day-1/day-1-main.pdf"
  }
]
```

## 🔄 Adding Multiple PDFs Per Day

If you have multiple PDFs for one day, add them like this in `courseContent.js`:

```javascript
pdfNotes: [
  { 
    title: "Day 1 - Highway Code", 
    description: "Highway code fundamentals", 
    fileSize: "1.2 MB", 
    filePath: "/course-materials/standard/day-1/highway-code.pdf",
    downloadPath: "/course-materials/standard/day-1/highway-code.pdf"
  },
  { 
    title: "Day 1 - Road Signs", 
    description: "Road signs and markings", 
    fileSize: "0.8 MB", 
    filePath: "/course-materials/standard/day-1/road-signs.pdf",
    downloadPath: "/course-materials/standard/day-1/road-signs.pdf"
  }
]
```

## 🎯 Testing

1. Start the app: `cd frontend && npm start`
2. Log in with a Standard Package access code
3. Navigate to "Course Content"
4. Click on any day to expand
5. Click "Preview" on a PDF to see it in action!

