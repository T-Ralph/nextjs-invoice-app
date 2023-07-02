import { useRouter } from "next/router"
import { Invoice } from "@/types/Invoice"
import { InvoiceStatus } from "@/types/InvoiceStatus"

export default function InvoiceForm() {
    const router = useRouter()

    const invoicesString: string = localStorage.getItem("Invoices") ?? "[]";
    const invoicesData: Invoice[] = JSON.parse(invoicesString)
    const newInvoiceId = invoicesData.sort((invoice1, invoice2) => Number(invoice1.id < invoice2.id))[0].id + 1

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
          items: [],
          tax: Number(event.currentTarget.tax.value),
          total: Number(event.currentTarget.total.value),
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

        const invoicesString: string = localStorage.getItem("Invoices") ?? "[]";
        let invoices: Invoice[] = JSON.parse(invoicesString)
        invoices.push(result)
        localStorage.setItem("Invoices", JSON.stringify(invoices))

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
                    <label className="block mb-2 font-medium text-gray-700">Tax</label>
                    <input type="number" name="tax" id="tax" defaultValue="0" required className="block w-full px-4 py-2 mb-4 leading-tight text-gray-700 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"/>
                </div>

                <div className="w-full md:w-1/3 px-2">
                    <label className="block mb-2 font-medium text-gray-700">Total</label>
                    <input type="number" name="total" id="total" defaultValue="0" required className="block w-full px-4 py-2 mb-4 leading-tight text-gray-700 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"/>
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

                <div className="w-full md:w-1/3 px-2">
                    <button type="submit" className="block w-full px-4 py-2 bg-gray-100 text-black rounded-md">Create Invoice</button>
                </div>
            </form>
        </>
    )
}