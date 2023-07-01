import type { ReactElement } from 'react'
import useSWR from 'swr'
import Layout from '../components/layout'
import InvoicesTable from '../components/invoicesTable'
import type { NextPageWithLayout } from './_app'
import { Invoice } from '@/types/invoice'
 
const Index: NextPageWithLayout = () => {
    const fetcher = (apiURL: string) => fetch(apiURL).then(res => res.json())
    const { data: invoices, error } = useSWR<Invoice[]>('/api/invoices', fetcher)
 
    if (error) return <div>Failed to load invoices</div>
    if (!invoices) return <div>Loading...</div>

    return <InvoicesTable invoices={invoices}/>
}
 
Index.getLayout = function getLayout(page: ReactElement) {
  return (
    <Layout>
        {page}
    </Layout>
  )
}
 
export default Index