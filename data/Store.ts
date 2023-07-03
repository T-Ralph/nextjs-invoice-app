import { Invoice } from "@/types/Invoice"

const LocalStorageInvoiceKey : string = "Invoices"

const GetInvoicesFromLocalStorage = () : Invoice[] => {
    try {
        let invoicesString: string = localStorage.getItem(LocalStorageInvoiceKey) ?? "[]";
        let invoicesData: Invoice[] = JSON.parse(invoicesString)
        return invoicesData
    } catch {
        // localStorage not available on server-side render
        return []
    }
}

const SetInvoicesInLocalStorage = (invoices : Invoice[]) => {
    try {
        localStorage.setItem(LocalStorageInvoiceKey, JSON.stringify(invoices))
    } catch {
        // localStorage not available on server-side render
    }
}

export function SaveInvoices(invoices : Invoice[]) {
    GetInvoices().forEach(invoice => {
        if (invoices.find(i => i.id === invoice.id) === undefined){
            invoices.push(invoice)
        }
    })

    SetInvoicesInLocalStorage(invoices)
}

export function SaveInvoice(invoice : Invoice) {
    const invoicesData = GetInvoices();

    if (GetInvoice(invoice.id) === undefined) {
        invoicesData.push(invoice)
    }

    SetInvoicesInLocalStorage(invoicesData)
}

export function GetInvoices() : Invoice[] {
    return GetInvoicesFromLocalStorage()
}

export function GetInvoice(id : number) : Invoice | undefined {
    return GetInvoices().find(invoice => invoice.id === id)
}

export function GetNewInvoiceId() : number {
    const invoicesData = GetInvoices()

    return invoicesData.length > 0 ?
            invoicesData.sort((invoice1, invoice2) => Number(invoice1.id < invoice2.id))[0].id + 1 :
            1
}