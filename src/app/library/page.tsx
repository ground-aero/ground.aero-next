// отвеч.за серверную часть
import { Layout, Header, Heading } from "@/components"
import {intro} from '@/constants'

export default function Page() {
    return (
      <>
        <Header title={intro.library.title} text={intro.library.text}/>

        <Layout>

          <Heading title='Library Heading'/>
          {/* <p>This is a par.</p> */}

        </Layout>
      </>
  );
}