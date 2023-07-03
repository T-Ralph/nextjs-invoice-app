import '@/app/globals.css'
import { Inter } from 'next/font/google'
import HeadTitle from './HeadTitle'

const inter = Inter({ subsets: ['latin'] })

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
        <HeadTitle />
        <main className={inter.className}>
            <div className="flex min-w-full flex-col items-center justify-between p-24">
                {children}
            </div>
        </main>
    </>
  )
}
