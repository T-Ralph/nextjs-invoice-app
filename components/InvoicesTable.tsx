import Link from "next/link";
import { Invoice } from "@/types/Invoice";
import { InvoiceStatus } from "@/types/InvoiceStatus";

export default function InvoicesTable({ invoices } : { invoices: Invoice[] }) {
    return (
        <>
            <table className="min-w-full border border-gray-300">
                <thead>
                    <tr className="text-left">
                        <th className="py-2 px-4 bg-gray-100 text-black border-b">ID</th>
                        <th className="py-2 px-4 bg-gray-100 text-black border-b">Date</th>
                        <th className="py-2 px-4 bg-gray-100 text-black border-b">Due Date</th>
                        <th className="py-2 px-4 bg-gray-100 text-black border-b">Company</th>
                        <th className="py-2 px-4 bg-gray-100 text-black border-b">Total</th>
                        <th className="py-2 px-4 bg-gray-100 text-black border-b">Status</th>
                        <th className="py-2 px-4 bg-gray-100 text-black border-b"> </th>
                    </tr>
                </thead>
                <tbody>
                    {invoices.sort((invoice1, invoice2) => Number(invoice1.id < invoice2.id)).map((invoice) => (
                        <tr key={invoice.id}>
                            <td className="py-2 px-4 border-b">{invoice.id}</td>
                            <td className="py-2 px-4 border-b">{new Date(invoice.date).toLocaleDateString("en-CA")}</td>
                            <td className="py-2 px-4 border-b">{new Date(invoice.dueDate).toLocaleDateString("en-CA")}</td>
                            <td className="py-2 px-4 border-b">{invoice.company}</td>
                            <td className="py-2 px-4 border-b">${invoice.total}</td>
                            <td className="py-2 px-4 border-b">
                                {invoice.status != InvoiceStatus.Paid &&
                                    <span className="inline-block px-2 py-1 text-xs font-semibold leading-none text-red-800 bg-red-100 rounded-full">
                                        {new Date(invoice.dueDate) > new Date() ? InvoiceStatus[InvoiceStatus.Outstanding] : InvoiceStatus[InvoiceStatus.Late]}
                                    </span>
                                }
                                {invoice.status == InvoiceStatus.Paid &&
                                    <span className="inline-block px-2 py-1 text-xs font-semibold leading-none text-green-800 bg-green-100 rounded-full">
                                        {InvoiceStatus[InvoiceStatus.Paid]}
                                    </span>
                                }
                            </td>
                            <td className="py-2 px-4 border-b">
                                <Link href={`/invoice/${invoice.id}`} className="inline-block px-6 py-1 bg-gray-100 text-black rounded-md">View</Link>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    )
}