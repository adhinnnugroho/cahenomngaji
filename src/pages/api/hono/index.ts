import { getDailyPrayerSchedule } from '@/core/modulesApi/prayer/externalApiCallPrayer'
import { Hono } from 'hono'
import { NextApiRequest, NextApiResponse } from 'next'

// Inisialisasi Hono
const app = new Hono()

// Tambah endpoint
app.get('/api/hono', (c) => {
    console.log(c);
    return c.json({ message: 'Hello from Hono in Next.js!' })
})

app.get('/api/prayer-schedule/daily/:cityId/:year/:month/:date', async (c) => {
    try {
        const cityId = c.req.param("cityId");
        const year = c.req.param("year");
        const month = c.req.param("month");
        const date = c.req.param("date");

        const DailyPrayerSchedule = await getDailyPrayerSchedule(cityId, year, month, date);
        return c.json({
            status: true,
            statusCode: 200,
            message: "retrieved data jadwal daily successfully",
            data: DailyPrayerSchedule.data
        });
    } catch (error) {
        console.error("Error while fetching data:", error);
        return c.json({ message: "Internal Server Error" }, 500);
    }
})

// Konversi Next.js API Request ke Fetch API Request
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    console.log("Incoming request:", req.method, req.url);

    const request = new Request(`http://${req.headers.host}${req.url}`, {
        method: req.method,
        headers: req.headers as HeadersInit,
        body: req.method !== 'GET' && req.method !== 'HEAD' ? JSON.stringify(req.body) : undefined,
    })

    const response = await app.fetch(request)

    // Kirim response ke Next.js
    res.status(response.status)
    response.headers.forEach((value, key) => res.setHeader(key, value))
    const body = await response.text()
    res.send(body)
}
