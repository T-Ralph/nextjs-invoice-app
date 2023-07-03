import { Invoice } from "@/types/Invoice"
import { NextApiRequest, NextApiResponse } from "next"

export default function handler(
    req: NextApiRequest,
    res: NextApiResponse<Invoice>
) {
    if (req.method !== "POST") {
        res.status(405)
        return
    }

    const invoice: Invoice = req.body

    //Implement email service
    //Send Invoice to invoice.email

    res.status(200).json(invoice)
}