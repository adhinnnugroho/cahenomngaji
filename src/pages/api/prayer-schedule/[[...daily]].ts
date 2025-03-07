import { getDailyPrayerSchedule } from '@/core/modulesApi/prayer/externalApiCallPrayer'
import { Hono } from 'hono'
import { NextApiRequest, NextApiResponse } from 'next'

const app = new Hono()

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

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const request = new Request(`http://${req.headers.host}${req.url}`, {
        method: req.method,
        headers: req.headers as HeadersInit,
        body: req.method !== 'GET' && req.method !== 'HEAD' ? JSON.stringify(req.body) : undefined,
    })

    const response = await app.fetch(request)
    res.status(response.status)
    response.headers.forEach((value, key) => res.setHeader(key, value))
    const body = await response.text()
    res.send(body)
}
