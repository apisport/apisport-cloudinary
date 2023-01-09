import useSWR from "swr"
import Link from 'next/link'
import { useState } from "react"
import Pagination from "../../components/Pagination"
import rupiah from "../../components/Rupiah"

export default function MitraDev() {
    const fetcher = (...args) => fetch(...args).then((res) => res.json())
    const { data: data, error } = useSWR('/api/transaksidevdb', fetcher)
    const [currentPage, setCurrentPage] = useState(1)
    const [postsPerPage, setPostsPerPage] = useState(20)
    const [filterSearch, setFilterSearch] = useState('')
    const [searchTerm, setSearchTerm] = useState('')



    if (!data) {
        return <div>Loading...</div>
    } else if (error) {
        return <div>Something went wrong</div>
    }


    let transaksi = data['message']
    console.log(transaksi)

    let searchArr = transaksi.filter((tblDat) => {
        if (searchTerm == "") {
            return tblDat
        } else if (tblDat.namaVenue.toLowerCase().includes(searchTerm.toLowerCase())) {
            return tblDat
        }
    })

    //Tambahan Pagination
    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    //Fixed Pagintion CurrentPosts hapus filter di bawah
    let currentPosts = searchArr.slice(indexOfFirstPost, indexOfLastPost)
    //Fixed Pagination CurrentPosts
    const howManyPages = Math.ceil(searchArr.length / postsPerPage)
    //Tambahan Pagination Current Post Map

    return (
        <>
            <div class="container-fluid">
                <div className="d-flex flex-row justify-content-center mb-5">
                    <h1>Data Transaksi</h1>
                </div>
                <div className="row">
                    <div class="col-xs-12">
                        <table className="table my-0" id="dataTable">
                            <thead>
                                <tr>
                                    <th style={{ width: 56 }}>No</th>
                                    <th>Nama Venue</th>
                                    <th>Nama User</th>
                                    <th>Dibuat</th>
                                    <th>No. WA User</th>
                                    <th>Status</th>
                                    <th>Harga</th>
                                    <th>Aksi</th>
                                </tr>
                            </thead>
                            {currentPosts.length === 0 ? (
                                <h2>Tidak ada data Mitra ditemukan</h2>
                            ) : (
                                <>
                                    {currentPosts.map((data, index) => (
                                        <tbody>
                                            <tr>
                                                <td>{index + 1}</td>
                                                <td>{data.namaVenue}</td>
                                                <td>{data.nama}</td>
                                                <td>{data.diterimaTgl} | {data.diterimaJam}</td>
                                                <td>{data.noWa}</td>
                                                <td>{data.status}</td>
                                                <td>{rupiah(data.harga)}</td>

                                                <td><div className="btn-group-vertical btn-group-sm">
                                                    <Link href={{
                                                        pathname: '/dev/detail-transaksi',
                                                        query: {
                                                            idTransaksi: data._id
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
