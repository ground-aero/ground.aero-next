import type { Metadata } from "next"
import { Roboto } from 'next/font/google'
import "./globals.css"
import { Nav, Footer } from "@/components"

// const inter = Inter({ subsets: ["latin"] });
const roboto = Roboto({
  weight: ['300', '400', '500', '700', '900'],
  display: 'swap',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: "ground handling industry",
  description: "ground.aero - is project for ground handling industry",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="en">
      <body className={roboto.className}>
        <Nav/>
        {children}
        <Footer title='|'/>
      </body>
    </html>
  );
}
