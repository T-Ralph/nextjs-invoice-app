import type { NextApiRequest, NextApiResponse } from 'next'
import { Invoice } from '@/types/Invoice'
import { InvoiceStatus } from '@/types/InvoiceStatus'

const invoices: Invoice[] =
[
    {
        id: 1,
        date: new Date(2023, 0, 1),
        dueDate: new Date(2023, 1, 1),
        company: "Construction Company",
        contact: "John Doe",
        email: "john@ConstructionCompany.com",
        note: "Notes to Construction Company",
        items: [
            {
                item: "Web Design",
                rate: 50,
                hours: 20
            },
            {
                item: "Web Development",
                rate: 100,
                hours: 10
            }
        ],
        total: 2200,
        status: InvoiceStatus.Paid
    },
    {
        id: 2,
        date: new Date(2023, 0, 15),
        dueDate: new Date(2023, 1, 15),
        company: "Electrical Company",
        contact: "Mark Doe",
        email: "mark@ElectricalCompany.com",
        note: "Notes to Electrical Company",
        items: [
            {
                item: "Web Design",
                rate: 40,
                hours: 20
            },
            {
                item: "Web Development",
                rate: 100,
                hours: 10
            }
        ],
        total: 1980,
        status: InvoiceStatus.Paid
    },
    {
        id: 3,
        date: new Date(2023, 1, 1),
        dueDate: new Date(2023, 2, 1),
        company: "Plumbing Company",
        contact: "Matt Doe",
        email: "matt@PlumbingCompany.com",
        note: "Notes to Plumbing Company",
        items: [
            {
                item: "Web Design",
                rate: 30,
                hours: 20
            },
            {
                item: "Web Development",
                rate: 100,
                hours: 10
            }
        ],
        total: 1760,
        status: InvoiceStatus.Outstanding
    }
]

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Invoice[]>
) {
    res.status(200).json(invoices)
}