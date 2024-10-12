import { Inter } from 'next/font/google'
import './globals.css'
// import { MainNav } from '@/components/main-nav'
// import { Footer } from '@/components/footer'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'CampusInternshipBuddy',
  description: 'Connect students with internships and campus collaborations',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>

          <div className="flex flex-col min-h-screen">
            {/* <MainNav /> */}
            <main className="flex-grow">{children}</main>
            {/* <Footer /> */}
          </div>

      </body>
    </html>
  )
}