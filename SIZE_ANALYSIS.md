# Size Analysis: PDF Modal and Day Card

## PDF Modal Box Size (Multi-Language Content)

### Outer Container
- **Height**: `100vh` (full viewport height)
- **Max Width**: 
  - Mobile: `max-w-full` (100% of screen width)
  - Desktop: `max-w-6xl` (1152px on large screens)
- **Margin**: `m-0` (0px - no margin, edge-to-edge)
- **Padding**: `p-0` (0px - no padding on outer container)
- **Border**: `border-4` (4px border on all sides)

### Modal Header
- **Padding**: `py-1.5` (6px top + 6px bottom = 12px vertical)
- **Padding Horizontal**: `px-4 sm:px-6` (16px mobile, 24px desktop)
- **Border**: `border-b-2` (2px bottom border)
- **Close Button**: `min-h-[44px]` (44px minimum height)
- **Estimated Header Height**: ~58-60px total

### PDF Content Area
- **Height**: `calc(100vh - 70px)`
  - Full viewport height minus header space
  - Example: On 800px viewport = 730px PDF area
- **Min Height**: `800px` (guaranteed minimum)
- **Position**: `relative`
- **Overflow**: `overflow-y: auto` (scrollable)

### Iframe (PDF Viewer)
- **Height**: `100%` (fills parent container)
- **Width**: `100%` (fills parent container)
- **Position**: `absolute` with `top: 0, left: 0, right: 0, bottom: 0`
- **Border**: `2px solid #d1d5db`

### Summary for Multi-Language PDF Modal:
- **Total Modal Height**: 100vh (full screen)
- **PDF Viewing Area**: calc(100vh - 70px) with 800px minimum
- **Header Space**: ~70px (includes padding, border, content)

---

## Day Card Size (When Expanded)

### Day Card Container
- **Type**: `glass-card` (translucent card with backdrop blur)
- **Spacing**: `space-y-4` (16px vertical spacing between day cards)

### Day Header (Collapsed/Expanded Toggle)
- **Padding**: `p-4` (16px all around)
- **Height**: Auto (based on content)
- **Content**: 
  - Day number badge: `w-10 h-10` (40px × 40px)
  - Text: `text-base` (16px font size)
  - Chevron icon: `w-6 h-6` (24px × 24px)
- **Estimated Header Height**: ~60-70px

### Expanded Day Content Area
- **Padding**: `px-4 pb-4` 
  - Horizontal: 16px left/right
  - Bottom: 16px
  - Top: 0px (uses `mt-3` margin instead)
- **Margin Top**: `mt-3` (12px top margin)
- **Content Spacing**: `space-y-3` (12px vertical spacing between items)

### PdfPreviewCard Inside Expanded Day
- **Card Type**: Preview card (not modal - the card that shows before clicking)
- **Spacing**: `space-y-2 sm:space-y-3` (8px mobile, 12px desktop between cards)
- **No fixed height** - expands based on content

### Summary for Expanded Day Card:
- **Header Height**: ~60-70px
- **Content Padding**: 16px horizontal, 16px bottom, 12px top margin
- **Total Height**: Variable (depends on number of PDFs/videos inside)
- **No maximum height constraint** - can expand as needed

---

## Key Differences

1. **PDF Modal**: Fixed at 100vh height, full screen, edge-to-edge
2. **Day Card**: Variable height, constrained by page layout, scrollable within page
3. **PDF Content in Modal**: calc(100vh - 70px) with 800px minimum
4. **PDF Preview in Day Card**: Auto height based on card content

