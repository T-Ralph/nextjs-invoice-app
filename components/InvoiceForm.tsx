import { useState } from "react"
import { useRouter } from "next/router"
import { Invoice } from "@/types/Invoice"
import { InvoiceStatus } from "@/types/InvoiceStatus"
import { GetNewInvoiceId, SaveInvoice } from "@/data/store"
import { InvoiceItem } from "@/types/InvoiceItem"

export default function InvoiceForm() {
    const router = useRouter()
    const newInvoiceId = GetNewInvoiceId()
    const [invoiceItems, setInvoiceItems] = useState<InvoiceItem[]>([]);
    const [total, setTotal] = useState<number>(0);

    const invoiceItemChange = (index: number, event: React.ChangeEvent<HTMLInputElement>) => {
        const updatedInvoiceItems = [...invoiceItems]

        if (event.currentTarget.name === "item") {
            updatedInvoiceItems[index].item = event.currentTarget.value
        }

        if (event.currentTarget.name === "rate") {
            updatedInvoiceItems[index].rate = Number(event.currentTarget.value)
        }

        if (event.currentTarget.name === "hours") {
            updatedInvoiceItems[index].hours = Number(event.currentTarget.value)
        }
        
        setInvoiceItems(updatedInvoiceItems)
        setTotal(invoiceItems.reduce((sum: number, item: InvoiceItem) => sum + (item.rate * item.hours), 0))
    }

    const addInvoiceItem = () => {
        const invoiceItem: InvoiceItem = {
            item: "",
            rate: 0,
            hours: 0
        }
        setInvoiceItems([...invoiceItems, invoiceItem])
    }

    const createInvoice = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
     
        const invoice: Invoice = {
          id: Number(event.currentTarget.ID.value),
          date: new Date(event.currentTarget.date.value),
          dueDate: new Date(event.currentTarget.dueDate.value),
          company: event.currentTarget.company.value,
          contact: event.currentTarget.contact.value,
          email: event.currentTarget.email.value,
          note: event.currentTarget.note.value,
          items: invoiceItems,
          total: total,
          status: Number(event.currentTarget.status.value)
        }
     
        const invoiceString = JSON.stringify(invoice)
        const apiURL = '/api/invoice/create'     
        const options = {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: invoiceString,
        }
     
        const response = await fetch(apiURL, options)
        const result: Invoice = await response.json()

        SaveInvoice(result)

        router.push(`/invoice/${result.id}`)
        alert("Invoice Created Successfully!")
    }
    
    return(
        <>
            <form onSubmit={createInvoice} className="flex flex-wrap -mx-2">
                <div className="w-full md:w-1/3 px-2">
                    <label className="block mb-2 font-medium text-gray-700">ID</label>
                    <input type="number" name="ID" id="ID" defaultValue={newInvoiceId} required className="block w-full px-4 py-2 mb-4 leading-tight text-gray-700 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"/>
                </div>

                <div className="w-full md:w-1/3 px-2">
                    <label className="block mb-2 font-medium text-gray-700">Date</label>
                    <input type="date" name="date" id="date" required className="block w-full px-4 py-2 mb-4 leading-tight text-gray-700 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"/>
                </div>

                <div className="w-full md:w-1/3 px-2">
                    <label className="block mb-2 font-medium text-gray-700">Due Date</label>
                    <input type="date" name="dueDate" id="dueDate" required className="block w-full px-4 py-2 mb-4 leading-tight text-gray-700 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"/>
                </div>

                <div className="w-full md:w-1/3 px-2">
                    <label className="block mb-2 font-medium text-gray-700">Company</label>
                    <input type="text" name="company" id="company" required className="block w-full px-4 py-2 mb-4 leading-tight text-gray-700 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"/>
                </div>

                <div className="w-full md:w-1/3 px-2">
                    <label className="block mb-2 font-medium text-gray-700">Contact</label>
                    <input type="text" name="contact" id="contact" required className="block w-full px-4 py-2 mb-4 leading-tight text-gray-700 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"/>
                </div>

                <div className="w-full md:w-1/3 px-2">
                    <label className="block mb-2 font-medium text-gray-700">Email</label>
                    <input type="email" name="email" id="email" required className="block w-full px-4 py-2 mb-4 leading-tight text-gray-700 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"/>
                </div>

                <div className="w-full md:w-1/3 px-2">
                </div>

                <div className="w-full md:w-1/3 px-2">
                </div>

                <div className="w-full md:w-1/3 px-2">
                    <label className="block mb-2 font-medium text-gray-700">Status</label>
                    <select name="status" id="status" required className="block w-full px-4 py-2 mb-4 leading-tight text-gray-700 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500">
                        <option value={InvoiceStatus.Outstanding}>{InvoiceStatus[InvoiceStatus.Outstanding]}</option>
                        <option value={InvoiceStatus.Paid}>{InvoiceStatus[InvoiceStatus.Paid]}</option>
                        <option value={InvoiceStatus.Late}>{InvoiceStatus[InvoiceStatus.Late]}</option>
                    </select>
                </div>

                <div className="w-full px-2">
                    <label className="block mb-2 font-medium text-gray-700">Note</label>
                    <textarea name="note" id="note" className="block w-full px-4 py-2 mb-4 leading-tight text-gray-700 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"></textarea>
                </div>

                {invoiceItems.map((invoiceItem, index) => (
                    <div className="flex flex-wrap mx-1 my-1 w-full px-2" key={index}>
                        <div className="w-full md:w-1/4 px-2">
                            <label className="block mb-2 font-medium text-gray-700">Item</label>
                            <input type="text" name="item" defaultValue={invoiceItem.item} onChange={(event) => invoiceItemChange(index, event)} className="block w-full px-4 py-2 mb-4 leading-tight text-gray-700 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"/>
                        </div>

                        <div className="w-full md:w-1/4 px-2">
                            <label className="block mb-2 font-medium text-gray-700">Rate</label>
                            <input type="number" name="rate" defaultValue={invoiceItem.rate} onChange={(event) => invoiceItemChange(index, event)} className="block w-full px-4 py-2 mb-4 leading-tight text-gray-700 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"/>
                        </div>

                        <div className="w-full md:w-1/4 px-2">
                            <label className="block mb-2 font-medium text-gray-700">Hours</label>
                            <input type="number" name="hours" defaultValue={invoiceItem.hours} onChange={(event) => invoiceItemChange(index, event)} className="block w-full px-4 py-2 mb-4 leading-tight text-gray-700 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"/>
                        </div>

                        <div className="w-full md:w-1/4 px-2">
                            <label className="block mb-2 font-medium text-gray-700">Item Total</label>
                            <span  className="block w-full px-4 py-2 mb-4 leading-tight text-gray-700 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500">{invoiceItem.rate * invoiceItem.hours}</span>
                        </div>
                    </div>
                ))}

                <div className="w-full px-2 my-5">
                    <button type="button" className="block w-full px-4 py-2 bg-gray-100 text-black rounded-md" onClick={addInvoiceItem}>Add Invoice Item</button>
                </div>

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
                            ${total}
                        </span>
                    </div>
                </div>

                <div className="w-full px-2 my-5">
                    <button type="submit" className="block w-full px-4 py-2 bg-gray-100 text-black rounded-md">Create Invoice</button>
                </div>
            </form>
        </>
    )
}