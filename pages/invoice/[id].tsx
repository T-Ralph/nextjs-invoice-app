import type { ReactElement } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import type { NextPageWithLayout } from '../_app'
import Layout from '@/components/Layout'
import InvoiceView from '@/components/InvoiceView'
import { Invoice } from '@/types/Invoice'
import { GetInvoice } from '@/data/store'
 
const ViewInvoice: NextPageWithLayout = () => {
    const router = useRouter()
    const invoiceId: Number = Number(router.query.id)
    const invoice = GetInvoice(Number(invoiceId))

    if (invoice === undefined) {
        return <>Invoice Not Found!</>
    }
    
    return <InvoiceView invoice={invoice}/>
}

ViewInvoice.getLayout = function getLayout(element: ReactElement) {
  return (
    <Layout>
      <h1 className="text-4xl font-bold text-center text-white-800 mt-8 mb-4">Invoice</h1>
      <Link href="/" className="inline-block my-5 px-6 py-3 bg-gray-100 text-black rounded-md">View Invoices</Link>
      {element}
    </Layout>
  )
}

export default ViewInvoice