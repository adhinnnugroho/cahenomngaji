
import { retrieveDataDoa } from "@/core/hooks/doa/useDoaData";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method !== "GET") {
        return res.status(405).json({ message: "Method Not Allowed" });
    }



    try {
        const { doa }: any = req.query;
        const typeDoaId = doa ? doa[0] : null;
        const response = await retrieveDataDoa(typeDoaId);
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
