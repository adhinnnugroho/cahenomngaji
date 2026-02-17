import httpClient from "@/core/api/http-client";
import { createApp, createHonoHandler } from "@/core/modulesApi/honoAdapter";

const app = createApp();

app.get(
    "/api/prayer-schedule/coordinate",
    async (c) => {
        try {
            const latitude = c.req.query("latitude");
            const longitude = c.req.query("longitude");
            const year = c.req.query("year");
            const month = c.req.query("month");
            const date = c.req.query("date");

            // Format date for Aladhan: DD-MM-YYYY
            const dateStr = `${String(date).padStart(2, '0')}-${String(month).padStart(2, '0')}-${year}`;
            const aladhanUrl = `${process.env.REST_API_URL_ALADHAN}/timings/${dateStr}`;

            const { data: aladhanRes } = await httpClient.get(aladhanUrl, {
                params: {
                    latitude,
                    longitude,
                    method: 20, // Kemenag Indonesia
                }
            });

            const timings = aladhanRes.data.timings;

            // Calculate Dhuha (Sunrise + 20 mins)
            // Aladhan returns time in "HH:MM (WIB)" or ISO depending on params. 
            // With iso8601=true? No, timings key returns string like "04:18 (WIB)".
            // Let's assume standard HH:MM format first.
            const sunriseTime = timings.Sunrise.split(" ")[0]; // remove (WIB) if present
            const [sHour, sMin] = sunriseTime.split(":").map(Number);
            const dhuhaDate = new Date();
            dhuhaDate.setHours(sHour, sMin + 20);
            const dhuhaTime = `${String(dhuhaDate.getHours()).padStart(2, '0')}:${String(dhuhaDate.getMinutes()).padStart(2, '0')}`;

            const jadwal = {
                id: "coordinate",
                lokasi: "Lokasi Anda",
                daerah: "Lokasi Anda",
                jadwal: {
                    tanggal: aladhanRes.data.date.readable,
                    imsak: timings.Imsak.split(" ")[0],
                    subuh: timings.Fajr.split(" ")[0],
                    terbit: timings.Sunrise.split(" ")[0],
                    dhuha: dhuhaTime,
                    dzuhur: timings.Dhuhr.split(" ")[0],
                    ashar: timings.Asr.split(" ")[0],
                    maghrib: timings.Maghrib.split(" ")[0],
                    isya: timings.Isha.split(" ")[0],
                    date: aladhanRes.data.date.gregorian.date
                }
            };

            return c.json({
                status: true,
                statusCode: 200,
                message: "Prayer schedule retrieved successfully",
                data: jadwal
            });
        } catch (error) {
            console.error("Error while fetching coordinate data:", error);
            return c.json({ message: "Internal Server Error" }, 500);
        }
    }
);

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

export default createHonoHandler(app);
