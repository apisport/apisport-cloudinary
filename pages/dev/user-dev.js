import useSWR from "swr"
import Link from 'next/link'
import { useState } from "react"
import Pagination from "../../components/Pagination"

export default function UserDev() {
    const fetcher = (...args) => fetch(...args).then((res) => res.json())
    const { data: data, error } = useSWR('/api/userdb', fetcher)
    const [currentPage, setCurrentPage] = useState(1)
    const [postsPerPage, setPostsPerPage] = useState(5)
    const [filterSearch, setFilterSearch] = useState('')
    const [searchTerm, setSearchTerm] = useState('')



    if (!data) {
        return <div>Loading...</div>
    } else if (error) {
        return <div>Something went wrong</div>
    }


    let user = data['message']
    console.log(user)

    let searchArr = user.filter((tblDat) => {
        if (searchTerm == "") {
            return tblDat
        } else if (tblDat.nama.toLowerCase().includes(searchTerm.toLowerCase())) {
            return tblDat
        }
    })

    //Tambahan Pagination
    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    //Fixed Pagintion CurrentPosts hapus filter di bawah
    let currentPosts = searchArr
    //Fixed Pagination CurrentPosts
    const howManyPages = Math.ceil(searchArr.length / postsPerPage)
    //Tambahan Pagination Current Post Map

    return (
        <>
            <div class="container-fluid">
                <div className="d-flex flex-row justify-content-center mb-5">
                    <h1>Data User </h1>
                </div>
                {/* Tambahan Pagination Make Sure Math.ceil adalah searchArr.length */}
                <div class="row">
                    <div class="col-xs-12" height={'800px'}>
                        <table className="table table-responsive table-wrapper" id="dataTable">
                            <thead>
                                <tr>
                                    <th >No</th>
                                    <th>Nama User</th>
                                    <th>Jenis Kelamin</th>
                                    <th>No. WA</th>
                                    <th>E-mail</th>
                                    <th>Aksi</th>
                                </tr>
                            </thead>
                            {currentPosts.length === 0 ? (
                            <h2>Tidak ada data Favorit ditemukan</h2>
                        ) : (
                            <>
                                {currentPosts.map((data, index) => (
                                    <tbody>
                                        <tr>
                                            <td>{index + 1}</td>
                                            <td>{data.nama}</td>
                                            <td>{data.jenisKelamin}</td>
                                            <td>{data.noWa}</td>
                                            <td>{data.email}</td>
                                            <td><div className="btn-group-vertical btn-group-sm">
                                                {/* <Link href={`/dev/detail-mitra-pending?namaVenue=${data.namaVenue}&namaPemilikVenue=${data.namaPemilikVenue}&alamat=${data.alamat}&noWa=${data.noWa}&instagram=${data.instagram}&kategori=${data.kategori}&hariOperasional=${data.hariOperasional}&jamOperasional=${data.jamOperasional}&fasilitas=${data.fasilitas}&opsiBayarStringify=${JSON.stringify(data.opsiBayar)}&rekeningStringify=${JSON.stringify(data.rekening)}&namaAdmin=${data.namaAdmin}&noWaAdmin=${data.noWaAdmin}&username=${data.username}&password=${data.password}&fotoVenue=${data.fotoVenue}objectId=${data._id}`}> */}
                                                <Link href={{
                                                    pathname: '/dev/detail-user',
                                                    query: {
                                                        nama: data.nama,
                                                        jenisKelamin: data.jenisKelamin,
                                                        noWa: data.noWa,
                                                        emailReq: data.email,
                                                        objectId: data._id
                                                    }

                                                }}>
                                                    <button className="btn btn-success text-white mb-2"
                                                        type="button"
                                                        style={{ marginLeft: 'auto', background: 'green' }}
                                                    ><icon className='fa fa-eye pr-1' />
                                                    </button>
                                                </Link>

                                            </div>
                                            </td>
                                        </tr>
                                    </tbody>
                                ))}
                            </>
                        )}

                        </table>
                    </div>
                </div>
                
            </div>
        </>
    )
}
