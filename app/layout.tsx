import type { Metadata } from 'next'
import localFont from 'next/font/local'
import './globals.css'
import Navbar from '@/app/Navbar/Navbar'
import Footer from '@/components/Footer'
import SessionWrapper from './SessionWrapper'

const geistSans = localFont({
    src: './fonts/GeistVF.woff',
    variable: '--font-geist-sans',
    weight: '100 900',
})
const geistMono = localFont({
    src: './fonts/GeistMonoVF.woff',
    variable: '--font-geist-mono',
    weight: '100 900',
})

export const metadata: Metadata = {
    title: 'Wears_by_Adekunle',
    description: 'We style you',
}

export default async function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <html lang="en">
            <body 
              className={`${geistSans.variable} ${geistMono.variable} antialiased`}
            >
                <SessionWrapper>
                    <Navbar />
                        <main className="m-auto min-w-[300px] max-w-7xl p-4">
                            {children}
                        </main>
                    <Footer />
                </SessionWrapper>  
            </body>
        </html>
    )
}
