import type { ReactElement } from 'react'
import Link from 'next/link'
import useSWR from 'swr'
import type { NextPageWithLayout } from './_app'
import Layout from '@/components/Layout'
import InvoicesTable from '@/components/InvoicesTable'
import { Invoice } from '@/types/Invoice'
import { GetInvoices, SaveInvoices } from '@/data/store'
 
const Index: NextPageWithLayout = () => {
    const fetcher = (apiURL: string) => fetch(apiURL).then(res => res.json())
    const { data: invoices, error } = useSWR<Invoice[]>('/api/invoices', fetcher)
 
    if (error) return <div>Failed to load invoices</div>
    if (!invoices) return <div>Loading...</div>

    SaveInvoices(invoices)
    const allInvoices = GetInvoices()

    return <InvoicesTable invoices={allInvoices}/>
}
 
Index.getLayout = function getLayout(element: ReactElement) {
  return (
    <Layout>
      <h1 className="text-4xl font-bold text-center text-white-800 mt-8 mb-4">Invoices</h1>
      <Link href="/invoice/create" className="inline-block my-5 px-6 py-3 bg-gray-100 text-black rounded-md">Create New Invoice</Link>
      {element}
    </Layout>
  )
}
 
export default Index