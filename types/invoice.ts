import { InvoiceItem } from "./invoiceItem"
import { InvoiceStatus } from "./invoiceStatus"

export type Invoice = {
    id: number
    date: Date
    dueDate: Date
    company: string
    contact: string
    email: string
    note?: string
    items: InvoiceItem[]
    tax: number
    total: number
    status?: InvoiceStatus
}