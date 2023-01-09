import useSWR from 'swr'
import { useSession } from 'next-auth/react'
import moment from 'moment'
import CardListBelumLengkap from '../../components/mitra/transaksi-belum-lengkap/CardBelumLengkap'

export default function TransaksiBelumLengkap({namaVenueProps}) {
    const { data: session } = useSession()
    const fetcher = (...args) => fetch(...args).then((res) => res.json())
    let url = `/api/transaksibelumlengkapdb?namaVenueReq=${namaVenueProps}`
    const { data: data, error } = useSWR(url, fetcher, { refreshInterval: 1000 })

    if (!data) {
        return <div>Loading...</div>
    } else if (error) {
        return <div>Something went wrong</div>
    }


    let transaksi = data['message']
    console.log(transaksi)


    return (
        <>
            <div className="container my-2">
                <h3>Transaksi Belum Lengkap</h3>
                <div className="row mt-4" id="Pending">
                    <CardListBelumLengkap props={transaksi} />
                </div>
                





            </div>
        </>
    )

}
// export async function getServerSideProps(ctx) {
//     // get the current environment
//     let dev = process.env.NODE_ENV !== 'production';
//     let { DEV_URL, PROD_URL } = process.env;
//     // request posts from api
//     //let response = await fetch(`${dev ? DEV_URL : PROD_URL}/api/transaksidb`);
//     let response = await fetch(`http://localhost:3000/api/transaksidb`);
//     // extract the data
//     let data = await response.json();
//     return {
//         props: {
//             transaksi: data['message'],
//         },
//     };
// }