import httpClient from "@/core/api/http-client";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method !== "GET") {
        return res.status(405).json({ message: "Method Not Allowed" });
    }

    try {
        const endpointUrl = `${process.env.REST_API_URL}`;
        const { surah }: { surah?: string[] } = req.query;
        const surahId = surah?.[1] ?? null;

        const response = surahId
            ? await httpClient.get(`${endpointUrl}/${surahId}`)
            : await httpClient.get(endpointUrl);

        res.status(200).json({
            status: true,
            statusCode: 200,
            message: "Surah data retrieved successfully",
            data: response.data.data,
        });
    } catch (error) {
        console.error("Error fetching surah data:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}