import type { ReactElement } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import type { NextPageWithLayout } from '../_app'
import Layout from '@/components/Layout'
import InvoiceView from '@/components/InvoiceView'
import { GetInvoice } from '@/data/Store'
 
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
      <div className="flex flex-wrap mx-1 my-1 w-full px-2">
        <div className="w-full md:w-1/3 px-2">
        </div>

        <div className="w-full md:w-1/3 px-2">
            <span className="block w-full px-4 py-2 mb-4 leading-tight text-gray-700 ">
              <h1 className="text-4xl font-bold text-center text-white-800">Invoice</h1>
            </span>
        </div>

        <div className="w-full md:w-1/3 px-2">
            <span className="block w-full px-4 py-2 mb-4 leading-tight text-gray-700 text-right">
              <Link href="/" className="inline-block px-6 py-3 bg-gray-100 text-black rounded-md">View Invoices</Link>
            </span>
        </div>
      </div>
      {element}
    </Layout>
  )
}

export default ViewInvoice