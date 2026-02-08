# Specification

## Summary
**Goal:** Add a dedicated in-app Images/Gallery section that displays the 8 uploaded photos as static assets, with navigation access and a larger-image preview.

**Planned changes:**
- Add the 8 specified JPG files to the frontend’s static/public assets and reference them by their exact filenames in the UI.
- Create a clearly labeled Images/Gallery section that renders the 8 images in a responsive grid with consistent spacing, rounded corners, and stable aspect-ratio handling to avoid layout shifts.
- Add navigation entry to reach the Images/Gallery section using the app’s existing navigation pattern, without removing or breaking current sections (Home/Education/Discipline/Sports/Notices/Dashboard).
- Implement click/tap-to-preview behavior so each image can be viewed larger in an overlay/dialog with a clear close action to return to the grid.

**User-visible outcome:** Users can open an Images/Gallery section from the app navigation, browse all 8 photos in a responsive grid, and tap any photo to view it larger and close the preview to return to the gallery.
