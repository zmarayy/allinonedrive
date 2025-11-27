# Course Materials Organization

## Folder Structure

Place your PDF files in the following structure:

```
public/course-materials/
├── standard/
│   ├── day-1/
│   │   ├── day-1-main.pdf
│   │   └── (any additional PDFs for day 1)
│   ├── day-2/
│   │   ├── day-2-main.pdf
│   ├── day-3/
│   │   ├── day-3-main.pdf
│   ├── day-4/
│   │   ├── day-4-main.pdf
│   ├── day-5/
│   │   ├── day-5-main.pdf
│   ├── day-6/
│   │   ├── day-6-main.pdf
│   └── day-7/
│       ├── day-7-main.pdf
├── elite-self-study/
│   └── (same structure as standard)
├── elite-live-support/
│   └── (same structure as standard)
└── driving-theory-full/
    └── (same structure as standard)
```

## File Naming Convention

- Use lowercase with hyphens: `day-1-main.pdf`
- Be descriptive: `day-1-highway-code.pdf`, `day-1-road-signs.pdf`
- Keep main content file as `day-X-main.pdf` for each day

## Adding Files

1. Upload PDFs to the appropriate folder
2. Update `frontend/src/data/courseContent.js` with the file paths
3. The app will automatically display them with previews

