# Sholat Feature Migration to Aladhan API

We have successfully migrated the Prayer Schedule feature from MyQuran API to Aladhan API. This change addresses the reliability issues (404 on MyQuran v3) and improves location specificity (supporting district-level coordinates like "Secang").

## Key Changes

### 1. API Provider Switch
- **Old:** MyQuran API (City-based, limited specific location support).
- **New:** Aladhan API (Coordinate-based, high specificity).

### 2. Implementation Details
- **Frontend Hook (`useScheduleData.ts`)**: 
  - Now uses `GPS Coordinates` directly to fetch the schedule.
  - Eliminated the two-step process (GPS -> City Name -> City ID -> Schedule).
  - Reduced latency and potential failure points (City ID matching).
  
- **Backend Proxy (`[[...daily]].ts`)**:
  - Added new endpoint `/api/prayer-schedule/coordinate`.
  - Proxies requests to Aladhan API.
  - Automatically calculates "Dhuha" time (Sunrise + 20 mins) to maintain feature parity.
  - Maps Aladhan `timings` format to our internal `PrayerSchedule` interface.

- **Location Detection (`[[...coordinates]].ts`)**:
  - Improved robustness to prioritize "Kabupaten" or "Kota" names from the hierarchy.
  - Ensures that if fallback to MyQuran City Search is needed (e.g. manual search), it finds the correct city level.

### 3. Environment Config
- Updated `.env.local` to include `REST_API_URL_ALADHAN`.

## Verification
- **Coordinate Fetching**: Verified via code review that `latitude`/`longitude` are passed correctly.
- **Data Mapping**: Verified that keys like `subuh`, `maghrib`, etc. are correctly mapped from Aladhan's `Fajr`, `Maghrib`.
- **Dhuha Time**: Verified calculation logic (Sunrise + 20m).

## Refinements (Post-Migration)
- **Time Formatting**: Fixed issue where Imsak/Subuh showed full ISO date strings. Now displays clean "HH:MM".
- **Date Navigation**: Fixed empty date label in the navigator by correctly handling Aladhan's date format (DD-MM-YYYY).
- **Dhuha Time**: Fixed "NaN:NaN" display caused by incorrect parsing of ISO strings.

## UI/UX Redesign (Sholat Page)
- **Theme Overhaul**: Switched `SholatPage` from the app-wide Slate (Blue-Grey) theme to a custom **Neutral/Pro Theme** (Black/True Grey). This removes the blueish tint requested to be avoided.
- **Hero Section**: Replaced the standard Hero Header with a custom implementation tailored for a professional "Finance/Dashboard" look.
    - **Grayscale & Sepia Filter**: Applied to background image to remove original colors (often purple/blue) and give a classic look.
    - **Typography**: Enhanced size and spacing for a cleaner, more impactful display of the countdown.
- **Layout Adjustments**: Tweaked spacing and margins for a tighter, more professional mobile feel.

