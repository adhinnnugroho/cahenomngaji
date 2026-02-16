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
        const { hijr }: { hijr?: string[] } = req.query;
        const hijrDate = hijr ? `${hijr[2]}-${hijr[1]}-${hijr[0]}` : null;

        if (!hijrDate) {
            return res.status(400).json({ message: "Invalid date parameter" });
        }

        const baseUrl = process.env.REST_API_URL_TANGGAL;
        if (!baseUrl) {
            return res.status(500).json({ message: "REST_API_URL_TANGGAL is not configured" });
        }

        const normalizedUrl = baseUrl.endsWith("/") ? baseUrl.slice(0, -1) : baseUrl;
        const { data } = await httpClient.get(`${normalizedUrl}/${hijrDate}`);
        const hijriDate = data.data?.date?.[1] ?? null;

        res.status(200).json({
            status: true,
            statusCode: 200,
            message: "Hijri date retrieved successfully",
            data: hijriDate,
            reformattedDate: hijrDate,
        });
    } catch (error: unknown) {
        const statusCode = (error as { response?: { status?: number } })?.response?.status ?? 500;
        const message = (error as { response?: { data?: { message?: string } } })?.response?.data?.message ?? "Failed to retrieve Hijri date";
        res.status(statusCode).json({ status: false, statusCode, message });
    }
}
