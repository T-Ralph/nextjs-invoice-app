import { Invoice } from "@/types/Invoice"
import { InvoiceStatus } from "@/types/InvoiceStatus"

export default function InvoiceView({ invoice } : { invoice : Invoice}) {
    return(
        <>
            <div className="flex flex-wrap -mx-2">
                <div className="w-full md:w-1/3 px-2">
                    <label className="block mb-2 font-medium text-gray-700">ID</label>
                    <span className="block w-full px-4 py-2 mb-4 leading-tight text-white-700 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500">{invoice.id}</span>
                </div>

                <div className="w-full md:w-1/3 px-2">
                    <label className="block mb-2 font-medium text-gray-700">Date</label>
                    <span className="block w-full px-4 py-2 mb-4 leading-tight text-white-700 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500">{new Date(invoice.date).toLocaleDateString("en-CA")}</span>
                </div>

                <div className="w-full md:w-1/3 px-2">
                    <label className="block mb-2 font-medium text-gray-700">Due Date</label>
                    <span className="block w-full px-4 py-2 mb-4 leading-tight text-white-700 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500">{new Date(invoice.dueDate).toLocaleDateString("en-CA")}</span>
                </div>

                <div className="w-full md:w-1/3 px-2">
                    <label className="block mb-2 font-medium text-gray-700">Company</label>
                    <span className="block w-full px-4 py-2 mb-4 leading-tight text-white-700 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500">{invoice.company}</span>
                </div>

                <div className="w-full md:w-1/3 px-2">
                    <label className="block mb-2 font-medium text-gray-700">Contact</label>
                    <span className="block w-full px-4 py-2 mb-4 leading-tight text-white-700 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500">{invoice.contact}</span>
                </div>

                <div className="w-full md:w-1/3 px-2">
                    <label className="block mb-2 font-medium text-gray-700">Email</label>
                    <span className="block w-full px-4 py-2 mb-4 leading-tight text-white-700 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500">{invoice.email}</span>
                </div>

                <div className="w-full md:w-1/3 px-2">
                    <label className="block mb-2 font-medium text-gray-700">Tax</label>
                    <span className="block w-full px-4 py-2 mb-4 leading-tight text-white-700 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500">{invoice.tax}</span>
                </div>

                <div className="w-full md:w-1/3 px-2">
                    <label className="block mb-2 font-medium text-gray-700">Total</label>
                    <span className="block w-full px-4 py-2 mb-4 leading-tight text-white-700 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500">{invoice.total}</span>
                </div>

                <div className="w-full md:w-1/3 px-2">
                    <label className="block mb-2 font-medium text-gray-700">Status</label>
                    {invoice.status != InvoiceStatus.Paid &&
                        <span className="block w-full px-4 py-2 mb-4 leading-tight text-white-700 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500">
                            {new Date(invoice.dueDate) > new Date() ? InvoiceStatus[InvoiceStatus.Outstanding] : InvoiceStatus[InvoiceStatus.Late]}
                        </span>
                    }
                    {invoice.status == InvoiceStatus.Paid &&
                        <span className="block w-full px-4 py-2 mb-4 leading-tight text-white-700 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500">
                            {InvoiceStatus[InvoiceStatus.Paid]}
                        </span>
                    }
                </div>

                <div className="w-full px-2">
                    <label className="block mb-2 font-medium text-gray-700">Note</label>
                    <span className="block w-full px-4 py-2 mb-4 leading-tight text-white-700 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500">{invoice.note}</span>
                </div>
            </div>
        </>
    )
}