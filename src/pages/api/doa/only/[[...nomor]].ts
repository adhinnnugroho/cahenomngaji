
import { retrieveDataOnlyDoa } from "@/core/hooks/doa/useDoaData";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method !== "GET") {
        return res.status(405).json({ message: "Method Not Allowed" });
    }


    try {
        const { nomor }: any = req.query;
        const typeDoaId = nomor ? nomor[0] : null;
        const response = await retrieveDataOnlyDoa(typeDoaId);
        res.status(200).json({
            status: true,
            statusCode: 200,
            message: "retrieved data doa successfully",
            data: response.data.data
        });
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error" + error });
    }
}
