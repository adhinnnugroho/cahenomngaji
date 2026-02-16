import instance from '@/core/api/http-client';
import { app, createHonoHandler } from '@/core/modulesApi/honoAdapter';

app.get('/api/doa/:sumber', async (c) => {
    try {
        const sumber = c.req.param("sumber");
        const { data } = await instance.get(`${process.env.REST_API_URL_DOA}/${sumber}`);
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
