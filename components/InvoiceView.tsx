import { Invoice } from "@/types/Invoice"
import { InvoiceItem } from "@/types/InvoiceItem"
import { InvoiceStatus } from "@/types/InvoiceStatus"

export default function InvoiceView({ invoice } : { invoice : Invoice}) {
    return(
        <>
            <div className="flex flex-wrap -mx-2">
                <div className="w-full md:w-1/3 px-2">
                    <label className="block mb-2 font-bold text-gray-700">ID</label>
                    <span className="block w-full py-2 mb-4 leading-tight text-white-700">{invoice.id}</span>
                </div>

                <div className="w-full md:w-1/3 px-2">
                    <label className="block mb-2 font-bold text-gray-700">Date</label>
                    <span className="block w-full py-2 mb-4 leading-tight text-white-700">{new Date(invoice.date).toLocaleDateString("en-CA")}</span>
                </div>

                <div className="w-full md:w-1/3 px-2">
                    <label className="block mb-2 font-bold text-gray-700">Due Date</label>
                    <span className="block w-full py-2 mb-4 leading-tight text-white-700">{new Date(invoice.dueDate).toLocaleDateString("en-CA")}</span>
                </div>

                <div className="w-full md:w-1/3 px-2">
                    <label className="block mb-2 font-bold text-gray-700">Company</label>
                    <span className="block w-full py-2 mb-4 leading-tight text-white-700">{invoice.company}</span>
                </div>

                <div className="w-full md:w-1/3 px-2">
                    <label className="block mb-2 font-bold text-gray-700">Contact</label>
                    <span className="block w-full py-2 mb-4 leading-tight text-white-700">{invoice.contact}</span>
                </div>

                <div className="w-full md:w-1/3 px-2">
                    <label className="block mb-2 font-bold text-gray-700">Email</label>
                    <span className="block w-full py-2 mb-4 leading-tight text-white-700">{invoice.email}</span>
                </div>

                <div className="w-full md:w-1/3 px-2">
                </div>

                <div className="w-full md:w-1/3 px-2">
                </div>

                <div className="w-full md:w-1/3 px-2">
                    <label className="block mb-2 font-bold text-gray-700">Status</label>
                    {invoice.status != InvoiceStatus.Paid &&
                        <span className="block w-full py-2 mb-4 leading-tight text-white-700">
                            {new Date(invoice.dueDate) > new Date() ? InvoiceStatus[InvoiceStatus.Outstanding] : InvoiceStatus[InvoiceStatus.Late]}
                        </span>
                    }
                    {invoice.status == InvoiceStatus.Paid &&
                        <span className="block w-full px-4 py-2 mb-4 leading-tight text-white-700">
                            {InvoiceStatus[InvoiceStatus.Paid]}
                        </span>
                    }
                </div>

                <div className="w-full px-2">
                    <label className="block mb-2 font-bold text-gray-700">Note</label>
                    <span className="block w-full px-4 py-2 mb-4 leading-tight text-white-700 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500">{invoice.note}</span>
                </div>

                {invoice.items && invoice.items.map((item, index) => (
                    <div className="flex flex-wrap mx-1 my-1 w-full px-2" key={index}>
                        <div className="w-full md:w-1/4 px-2">
                            <span className="block w-full px-4 py-2 mb-4 leading-tight text-gray-700">{item.item}</span>
                        </div>

                        <div className="w-full md:w-1/4 px-2">
                            <span className="block w-full px-4 py-2 mb-4 leading-tight text-gray-700 ">{item.rate} $/hr</span>
                        </div>

                        <div className="w-full md:w-1/4 px-2">
                            <span className="block w-full px-4 py-2 mb-4 leading-tight text-gray-700">{item.hours} hr(s)</span>
                        </div>

                        <div className="w-full md:w-1/4 px-2">
                            <span className="block w-full px-4 py-2 mb-4 leading-tight text-gray-700">${item.rate * item.hours}</span>
                        </div>
                    </div>
                ))}
                <div className="flex flex-wrap mx-1 my-1 w-full px-2">
                    <div className="w-full md:w-1/4 px-2">
                        <span className="block w-full px-4 py-2 mb-4 leading-tight text-gray-700 font-bold">Total ($)</span>
                    </div>

                    <div className="w-full md:w-1/4 px-2">
                        <span className="block w-full px-4 py-2 mb-4 leading-tight text-gray-700 "></span>
                    </div>

                    <div className="w-full md:w-1/4 px-2">
                        <span className="block w-full px-4 py-2 mb-4 leading-tight text-gray-700"></span>
                    </div>

                    <div className="w-full md:w-1/4 px-2">
                        <span className="block w-full px-4 py-2 mb-4 leading-tight text-gray-700 font-bold">
                            ${invoice.total}
                        </span>
                    </div>
                </div>
            </div>
        </>
    )
}