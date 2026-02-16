import httpClient from "@/core/api/http-client";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method !== "GET") {
        return res.status(405).json({ message: "Method Not Allowed" });
    }

    try {
        const { jadwal }: { jadwal?: string[] } = req.query;
        const cityId = jadwal?.[1];
        const year = jadwal?.[2];
        const month = jadwal?.[3];
        const date = jadwal?.[4];

        const scheduleUrl = `${process.env.REST_API_URL_SCHEDULE}/sholat/jadwal/${cityId}/${year}/${month}/${date}`;
        const { data } = await httpClient.get(scheduleUrl);

        res.status(200).json({
            status: true,
            statusCode: 200,
            message: "Daily prayer schedule retrieved successfully",
            data: data.data,
        });
    } catch (error) {
        console.error("Error fetching daily prayer schedule:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}
