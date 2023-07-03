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
      <div className="flex flex-wrap mx-1 my-1 w-full px-2">
        <div className="w-full md:w-1/3 px-2">
        </div>

        <div className="w-full md:w-1/3 px-2">
            <span className="block w-full px-4 py-2 mb-4 leading-tight text-gray-700 ">
              <h1 className="text-4xl font-bold text-center text-white-800">Invoices</h1>
            </span>
        </div>

        <div className="w-full md:w-1/3 px-2">
            <span className="block w-full px-4 py-2 mb-4 leading-tight text-gray-700 text-right">
              <Link href="/invoice/create" className="inline-block px-6 py-3 bg-gray-100 text-black rounded-md">Create New Invoice</Link>
            </span>
        </div>
      </div>
      {element}
    </Layout>
  )
}
 
export default Index