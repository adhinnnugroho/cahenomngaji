import { getDailyPrayerSchedule } from '@/core/modulesApi/prayer/externalApiCallPrayer'
import { app, createHonoHandler } from '@/core/modulesApi/honoAdapter';

app.get('/api/prayer-schedule/daily/:cityId/:year/:month/:date', async (c) => {
    try {
        const cityId = c.req.param("cityId");
        const year = c.req.param("year");
        const month = c.req.param("month");
        const date = c.req.param("date");

        return c.json({
            status: true,
            statusCode: 200,
            message: "retrieved data jadwal daily successfully",
            data: await getDailyPrayerSchedule(cityId, year, month, date)
        });
    } catch (error) {
        console.error("Error while fetching data:", error);
        return c.json({ message: "Internal Server Error" }, 500);
    }
})

export default createHonoHandler();
