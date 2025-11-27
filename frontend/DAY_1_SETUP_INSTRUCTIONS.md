# Day 1 Materials Setup Instructions

## 📥 Step 1: Download Files from Google Drive

1. Go to your Google Drive folder: `day 1`
2. Download all the ODT files:
   - Summary of Rules H1 to 3.odt
   - Rules for pedestrians 1 to 35 pdf notes.odt
   - Rules for drivers and motorcyclists (89 to 102) pdf marked.odt
   - rukes for cyclists 59-82.odt
   - part two Attitude.odt
   - part one Alertness on the Road.odt
   - ANNEX 8.odt
   - 47-58 animals.odt

## 🔄 Step 2: Convert ODT to PDF

You have two options:

### Option A: Use Online Converter (Easiest)
1. Go to https://www.zamzar.com/convert/odt-to-pdf/ or https://cloudconvert.com/odt-to-pdf
2. Upload each ODT file
3. Download the converted PDFs

### Option B: Use LibreOffice (Free Software)
1. Download LibreOffice: https://www.libreoffice.org/
2. Open each ODT file
3. Go to File → Export as PDF
4. Save with the new names (see Step 3)

## 📁 Step 3: Rename Files

Rename your PDFs to match these exact names (use lowercase, hyphens):

1. `rules-pedestrians-1-35.pdf` (from "Rules for pedestrians 1 to 35 pdf notes.odt")
2. `rules-drivers-motorcyclists-89-102.pdf` (from "Rules for drivers and motorcyclists (89 to 102) pdf marked.odt")
3. `rules-cyclists-59-82.pdf` (from "rukes for cyclists 59-82.odt")
4. `animals-47-58.pdf` (from "47-58 animals.odt")
5. `summary-rules-h1-3.pdf` (from "Summary of Rules H1 to 3.odt")
6. `part-one-alertness.pdf` (from "part one Alertness on the Road.odt")
7. `part-two-attitude.pdf` (from "part two Attitude.odt")
8. `annex-8.pdf` (from "ANNEX 8.odt")

## 📂 Step 4: Place Files in Folder

Copy all 8 PDF files to:
```
frontend/public/course-materials/standard/day-1/
```

## ✅ Step 5: Verify

1. Check that all 8 files are in the `day-1` folder
2. Make sure file names match exactly (case-sensitive)
3. Test in the app by:
   - Starting the app: `cd frontend && npm start`
   - Logging in with Standard Package
   - Going to Course Content → Day 1
   - You should see all 8 PDFs listed!

## 🎥 Videos Folder (Optional)

If you want to add the "english videos" folder later:
- Create: `frontend/public/course-materials/standard/day-1/videos/`
- Add video files there
- We'll update the code to display them

## 📝 Quick Checklist

- [ ] Downloaded all 8 ODT files from Google Drive
- [ ] Converted all ODT files to PDF
- [ ] Renamed files to match the list above
- [ ] Placed all PDFs in `frontend/public/course-materials/standard/day-1/`
- [ ] Tested in the app

## 💡 Tips

- Keep the original ODT files as backup
- File names must be exact (lowercase, hyphens, no spaces)
- The app will automatically show preview and download buttons for each PDF

