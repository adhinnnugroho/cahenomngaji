import instance from '@/core/libs/axios/instance';
import { app, createHonoHandler } from '@/core/modulesApi/honoAdapter';

app.get('/api/doa/type', async (c) => {
    try {
        const { data } = await instance.get(`${process.env.REST_API_URL_DOA}`);
        return c.json({
            status: true,
            statusCode: 200,
            message: "retrieved data jadwal daily successfully",
            data: data.data
        });
    } catch (error) {
        console.error("Error while fetching data:", error);
        return c.json({ message: "Internal Server Error" }, 500);
    }
})

export default createHonoHandler();
