import { Inter } from 'next/font/google'
import './globals.css'
import styles from './layout.module.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Airbnb Next',
  description: 'demo by using nextjs to implement the airbnb',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={styles.html}>
      <body className={inter.className}>{children}</body>
    </html>
  )
}
