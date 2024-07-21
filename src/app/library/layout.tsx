import { Header, Main, LayoutMainLibrary, Footer } from "@/components"
import {intro} from '@/constants'

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <>
      {children}
      <Footer title='layout Lib'/>
    </>
  );
}