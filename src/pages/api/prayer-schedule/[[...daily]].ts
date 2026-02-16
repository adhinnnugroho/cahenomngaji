import httpClient from "@/core/api/http-client";
import { app, createHonoHandler } from "@/core/modulesApi/honoAdapter";

app.get(
    "/api/prayer-schedule/daily/:cityId/:year/:month/:date",
    async (c) => {
        try {
            const cityId = c.req.param("cityId");
            const year = c.req.param("year");
            const month = c.req.param("month");
            const date = c.req.param("date");

            const scheduleUrl = `${process.env.REST_API_URL_SCHEDULE}/sholat/jadwal/${cityId}/${year}/${month}/${date}`;
            const { data } = await httpClient.get(scheduleUrl);

            return c.json({
                status: true,
                statusCode: 200,
                message: "Prayer schedule retrieved successfully",
                data: data.data,
            });
        } catch (error) {
            console.error("Error while fetching data:", error);
            return c.json({ message: "Internal Server Error" }, 500);
        }
    }
);

export default createHonoHandler();
