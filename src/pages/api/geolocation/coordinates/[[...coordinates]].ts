import axios from 'axios';
import { createApp, createHonoHandler } from '@/core/modulesApi/honoAdapter';

const BIGDATACLOUD_URL = `${process.env.REST_API_URL_CITY}`;

const app = createApp();

app.get('/api/geolocation/coordinates/:latitude/:longitude', async (event) => {
    try {
        const latitude = event.req.param("latitude");
        const longitude = event.req.param("longitude");

        const { data } = await axios.get(BIGDATACLOUD_URL, {
            params: {
                latitude,
                longitude,
                localityLanguage: "id",
            },
        });

        const adminLevels = data.localityInfo?.administrative || [];

        // Extract province (adminLevel 4 = province in Indonesia)
        const province = adminLevels.find(
            (item: any) => item.adminLevel === 4
        );

        // Priority 1: Helper to find "Kabupaten" or "Kota" explicitly (Level 4, 5, 6, etc.)
        const cityLevel = adminLevels.find((item: any) =>
            /^(Kabupaten|Kota)\s+/i.test(item.name)
        );

        // Priority 2: Admin Level 6 (Standard for Indo Regency/City)
        const strictLevel6 = adminLevels.find(
            (item: any) => item.adminLevel === 6
        );

        // Priority 3: Fallback (Level 7 / Locality - e.g. "Kecamatan ...")
        const fallbackCity = adminLevels.find(
            (item: any) => item.adminLevel === 7
        );

        let cityName = cityLevel?.name || strictLevel6?.name || fallbackCity?.name || data.city || data.locality || "";
        // Remove "Kabupaten " or "Kota " prefix for cleaner matching with schedule API
        cityName = cityName.replace(/^(Kabupaten|Kota)\s+/i, "");

        const provinceName = province?.name || data.principalSubdivision || "";

        return event.json({
            status: true,
            statusCode: 200,
            message: "Retrieved user location successfully",
            locationData: {
                city: { name: cityName },
                province: { name: provinceName },
                latitude,
                longitude
            }
        });
    } catch (error: any) {
        console.error("BigDataCloud reverse geocode error:", error?.message);

        const statusCode = axios.isAxiosError(error) && error.response?.status
            ? error.response.status
            : 500;

        return event.json({
            status: false,
            statusCode,
            message: "Failed to retrieve location data",
            locationData: null
        }, 200);
    }
});

export default createHonoHandler(app);
