// api utils
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
