import type { ReactElement } from 'react'
import Link from 'next/link'
import type { NextPageWithLayout } from '../_app'
import Layout from '@/components/Layout'
import InvoiceForm from '@/components/InvoiceForm'
 
const CreateInvoice: NextPageWithLayout = () => {
    return <InvoiceForm/>
}

CreateInvoice.getLayout = function getLayout(element: ReactElement) {
  return (
    <Layout>
      <h1 className="text-4xl font-bold text-center text-white-800 mt-8 mb-4">New Invoice</h1>
      <Link href="/" className="inline-block my-5 px-6 py-3 bg-gray-100 text-black rounded-md">View Invoices</Link>
      {element}
    </Layout>
  )
}
 
export default CreateInvoice