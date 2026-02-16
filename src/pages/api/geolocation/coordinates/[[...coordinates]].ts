import axios from 'axios';
import { app, createHonoHandler } from '@/core/modulesApi/honoAdapter';

app.get('/api/geolocation/coordinates/:latitude/:longitude', async (event) => {
    try {
        const latitude = event.req.param("latitude");
        const longitude = event.req.param("longitude");

        const cityUrl = process.env.REST_API_URL_CITY;

        if (!cityUrl) {
            return event.json({
                status: false,
                statusCode: 500,
                message: "Configuration error: REST_API_URL_CITY is not set"
            }, 500);
        }

        const { data } = await axios.get(`${cityUrl}?latitude=${latitude}&longitude=${longitude}`);

        return event.json({
            status: true,
            statusCode: 200,
            message: "Retrieved user location successfully",
            locationData: {
                city: data.city,
                province: data.province,
                latitude,
                longitude
            }
        });
    } catch (error: any) {

        if (axios.isAxiosError(error) && error.response?.status === 404) {
            return event.json({
                status: false,
                statusCode: 404,
                message: "Location not found for supplied coordinates",
                locationData: null
            }, 200);
        }

        const statusCode = axios.isAxiosError(error) && error.response?.status
            ? error.response.status
            : 500;

        const message = axios.isAxiosError(error) && error.response?.data?.message
            ? error.response.data.message
            : "Failed to retrieve location data";

        return event.json({
            status: false,
            statusCode,
            message
        }, 200);
    }
});

export default createHonoHandler();
