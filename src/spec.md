# Specification

## Summary
**Goal:** Replace the app’s school logo with a new emblem sourced from the user-provided photos.

**Planned changes:**
- Create a new square, tightly-cropped logo PNG (512×512) from the uploaded emblem photos and add it under `frontend/public/assets/generated/`.
- Update the centralized branding constant to point to the new logo asset path.
- Ensure the Header branding logo and Home screen hero logo render the new logo via the branding constant, with no layout distortion and no remaining references to the old logo path.

**User-visible outcome:** The app displays the updated school emblem logo consistently in the sticky header and on the Home screen hero.
