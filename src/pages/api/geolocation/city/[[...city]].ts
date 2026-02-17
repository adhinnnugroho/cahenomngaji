import axios from 'axios';
import { createApp, createHonoHandler } from '@/core/modulesApi/honoAdapter';

const app = createApp();

app.get('/api/geolocation/city/:cityName', async (c) => {
    try {
        const cityName = c.req.param("cityName");
        const encodedCity = encodeURIComponent(cityName);
        const url = `${process.env.REST_API_URL_SCHEDULE}/sholat/kabkota/cari/${encodedCity}`;
        console.log("[city search] URL:", url, "| cityName:", cityName);

        const { data } = await axios.get(url);
        console.log("[city search] Response:", JSON.stringify(data));

        return c.json({
            status: true,
            statusCode: 200,
            message: "City data retrieved successfully",
            data: data.data
        });
    } catch (error: any) {
        // The myquran API returns 404 when no city matches the search term.
        // Return an empty array instead of 500, so the client can handle it gracefully.
        if (axios.isAxiosError(error) && error.response?.status === 404) {
            console.warn("[city search] No results for city:", c.req.param("cityName"));
            return c.json({
                status: true,
                statusCode: 200,
                message: "No matching city found",
                data: []
            });
        }

        console.error("Error while fetching city data:", error?.message, error?.response?.status, error?.response?.data);
        return c.json({
            status: false,
            statusCode: 500,
            message: "Failed to retrieve city data"
        }, 500);
    }
});

export default createHonoHandler(app);
