// this get called on every 600000 .s
const fetchData = async (url: string) => {
    try {
        const res = await fetch(url, {
            next: {revalidate:  600000,
           },
          });

        if (!res.ok) {
            throw new Error('fetchData Network response was not ok')
        }
        const json = await res.json()
        return json
    } catch (err) {
        console.error(err)
    }
}

export {fetchData};

// this get called on every request
// const fetchData = async () => {
//   // fetch data from external API // 600000 = 1 week
//   const res = await fetch('https://jsonplaceholder.typicode.com/posts', {
//     next: {revalidate:  600000,
//    },
//   });
//   const data = await res.json();

//   if(!data){
//     return {
//       notFound: true,
//     }
//   }
//   // Pass data to the Page via props
//   // return {
//   //   props: {
//   //     // commits: data
//   //     data,
//   //   }
//   // }
//   return data
// }
// // this get called on every request
// export async function getServerSideProps() {
//   // fetch data from external API
//   const res = await fetch('https://jsonplaceholder.typicode.com/posts');
//   const data = await res.json();

//   if(!data){
//     return {
//       notFound: true,
//     }
//   }
//   // Pass data to the Page via props
//   return {
//     props: {
//       // commits: data
//       data,
//     }
//   }
// }

// export default async function Page () {
  
//   const data  = await fetchData();

//   return <Home events={data}/>
// }