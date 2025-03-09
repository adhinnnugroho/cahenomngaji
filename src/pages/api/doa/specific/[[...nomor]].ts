import instance from '@/core/libs/axios/instance';
import { app, createHonoHandler } from '@/core/modulesApi/honoAdapter';

app.get('/api/doa/specific/:number', async (c) => {
    try {
        const number = c.req.param("number");
        const { data } = await instance.get(`${process.env.REST_API_URL_ONLY_DOA}/${number}`);
        return c.json({
            status: true,
            statusCode: 200,
            message: "retrieved specific  doa successfully",
            data: data.data
        });
    } catch (error) {
        console.error("Error while fetching data:", error);
        return c.json({ message: "Internal Server Error" }, 500);
    }
})

export default createHonoHandler();
