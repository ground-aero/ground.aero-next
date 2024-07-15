import { Header, Main, LayoutMainLibrary } from "@/components"
import {intro} from '@/constants'

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <>
      <Header title={intro.library.slogan}>
         {children}
      </Header>
      
      <Main title={intro.library.title} text={intro.library.text}>
          <LayoutMainLibrary layout={'library'} title={intro.library.title} text={intro.library.text} />
      </Main>

      {children}
    </>
  );
}
