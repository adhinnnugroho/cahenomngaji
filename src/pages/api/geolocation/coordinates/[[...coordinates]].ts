import instance from '@/core/libs/axios/instance';
import { app, createHonoHandler } from '@/core/modulesApi/honoAdapter';

app.get('/api/geolocation/coordinates/:latitude/:longitude', async (c) => {
    try {
        const latitude = c.req.param("latitude");
        const longitude = c.req.param("longitude");
        const { data } = await instance.get(`${process.env.REST_API_URL_CITY}?latitude=${latitude}&longitude=${longitude}`);
        return c.json({
            status: true,
            statusCode: 200,
            message: "retrieved data jadwal daily successfully",
            locationData: {
                city: data.city,
                province: data.province,
                latitude: latitude,
                longitude: longitude
            }
        });
    } catch (error) {
        console.error("Error while fetching data:", error);
        return c.json({ message: "Internal Server Error" }, 500);
    }
})

export default createHonoHandler();
