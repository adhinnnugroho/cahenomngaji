# Migration to MyQuran API v3

The goal is to update the Sholat feature to use the MyQuran API v3. This involves updating API endpoints, handling the new string-based City IDs (MD5 hashes), and ensuring all related features (search, schedule, countdown) work correctly.

## User Review Required
> [!IMPORTANT]
> The new API v3 uses MD5 hashes for City IDs instead of integers. This is a breaking change for the internal API contract of our application. All components depending on numeric `cityId` must be updated to string `cityId`.

> [!WARNING]
> We need to identify the correct URL structure for fetching schedules in v3. Initial tests with expected formats returned 404. We will confirm the endpoint during implementation.

## Proposed Changes

### Configuration
#### [MODIFY] [.env.local](file:///d:/Projects/next/cahenomngaji/.env.local)
- Update `REST_API_URL_SCHEDULE` to `https://api.myquran.com/v3`

### Backend / API Proxies
#### [MODIFY] [src/pages/api/geolocation/city/[[...city]].ts](file:///d:/Projects/next/cahenomngaji/src/pages/api/geolocation/city/[[...city]].ts)
- Update to use the v3 search endpoint.
- Ensure response format matches what the frontend expects (or update frontend types).
- v3 Search returns `[{ id: string, lokasi: string }]`.

#### [MODIFY] [src/pages/api/prayer-schedule/[[...daily]].ts](file:///d:/Projects/next/cahenomngaji/src/pages/api/prayer-schedule/[[...daily]].ts)
- Update URL construction to use v3 format (once confirmed).
- Accept `cityId` as string.

#### [MODIFY] [src/pages/api/geolocation/coordinates/[[...coordinates]].ts](file:///d:/Projects/next/cahenomngaji/src/pages/api/geolocation/coordinates/[[...coordinates]].ts)
- No major changes expected here as it returns city name, but we verify it feeds correctly into the city search.

### Core Logic & Types
#### [MODIFY] [src/core/api/types/prayer.types.ts](file:///d:/Projects/next/cahenomngaji/src/core/api/types/prayer.types.ts)
- Update `PrayerScheduleResponse` or relevant interfaces to change ID type from `number` to `string`.

#### [MODIFY] [src/core/api/prayer.api.ts](file:///d:/Projects/next/cahenomngaji/src/core/api/prayer.api.ts)
- Update `getDailySchedule` and `getMonthlySchedule` signatures to accept `string` for `cityId`.

#### [MODIFY] [src/core/api/geolocation.api.ts](file:///d:/Projects/next/cahenomngaji/src/core/api/geolocation.api.ts)
- Ensure compatibility with new response types.

#### [MODIFY] [src/core/api/types/geolocation.types.ts](file:///d:/Projects/next/cahenomngaji/src/core/api/types/geolocation.types.ts) (if exists)
- Update `CityData` type to have `id` as string.

### Frontend Hooks
#### [MODIFY] [src/core/hooks/sholat/useScheduleData.ts](file:///d:/Projects/next/cahenomngaji/src/core/hooks/sholat/useScheduleData.ts)
- Update state definitions (`city` state, `dailySchedule` state) to handle string IDs.
- Ensure `fetchLocationAndSchedule` handles the string ID correctly.

## Verification Plan
### Automated Tests
- None currently exist. API endpoints will be tested via browser.

### Manual Verification
1. **City Search**: Use the search feature (if available) or verify via logs that city search works.
2. **Reverse Geocoding**: Allow location access and verify the app correctly identifies the city and fetches the schedule.
3. **Schedule Display**: Verify the prayer times are displayed correctly for the current date.
4. **Countdown**: Verify the countdown to the next prayer works.
