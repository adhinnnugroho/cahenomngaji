import instance from '@/core/api/http-client';
import { createApp, createHonoHandler } from '@/core/modulesApi/honoAdapter';

const app = createApp();

const DOA_TYPES = ["quran", "hadits", "pilihan", "harian", "ibadah", "haji", "lainnya"];

app.get('/api/doa/type', (c) => {
    return c.json({
        status: true,
        statusCode: 200,
        message: "retrieved doa types successfully",
        data: DOA_TYPES
    });
});

app.get('/api/doa/specific/:id', async (c) => {
    try {
        const id = c.req.param("id");
        const { data } = await instance.get(`${process.env.REST_API_URL_ONLY_DOA}/${id}`);
        return c.json({
            status: true,
            statusCode: 200,
            message: "retrieved doa detail successfully",
            data: data.data
        });
    } catch (error) {
        console.error("Error while fetching doa detail:", error);
        return c.json({ message: "Internal Server Error" }, 500);
    }
})

app.get('/api/doa/:sumber', async (c) => {
    try {
        const sumber = c.req.param("sumber");
        const { data } = await instance.get(`${process.env.REST_API_URL_DOA}/${sumber}`);
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

export default createHonoHandler(app);
