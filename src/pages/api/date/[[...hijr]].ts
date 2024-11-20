
import { retrieveDateHijr } from "@/core/hooks/date/useDateHijr";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method !== "GET") {
        return res.status(405).json({ message: "Method Not Allowed" });
    }

    try {
        const { hijr }: any = req.query;
        const hijrDate = hijr ? hijr[2] + '-' + hijr[1] + '-' + hijr[0] : null;
        const response = hijrDate !== null ? await retrieveDateHijr(hijrDate) : null;
        const hijriDate = response?.data.data.date[1] || null;
        res.status(200).json({
            status: true,
            statusCode: 200,
            message: "retrieved date in hijr successfully",
            data: hijriDate,
            reformattedDate: hijrDate
        });
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error" + error });
    }
}
