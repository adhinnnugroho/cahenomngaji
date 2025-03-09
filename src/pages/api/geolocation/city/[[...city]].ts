import instance from '@/core/libs/axios/instance';
import { app, createHonoHandler } from '@/core/modulesApi/honoAdapter';

app.get('/api/geolocation/city/:cityName', async (c) => {
    try {
        const cityName = c.req.param("cityName");
        const { data } = await instance.get(`${process.env.REST_API_URL_SCHEDULE}/sholat/kota/cari/${cityName}`);
        return c.json({
            status: true,
            statusCode: 200,
            message: "retrieved data jadwal daily successfully",
            data: data
        });
    } catch (error) {
        console.error("Error while fetching data:", error);
        return c.json({ message: "Internal Server Error" }, 500);
    }
})

export default createHonoHandler();
