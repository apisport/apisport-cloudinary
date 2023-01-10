import useSWR from "swr"
import Link from 'next/link'
import { useState } from "react"
import Pagination from "../../components/Pagination"

export default function MitraDev() {
    const fetcher = (...args) => fetch(...args).then((res) => res.json())
    const { data: data, error } = useSWR('/api/mitradb', fetcher)
    const [currentPage, setCurrentPage] = useState(1)
    const [postsPerPage, setPostsPerPage] = useState(10)
    const [filterSearch, setFilterSearch] = useState('')
    const [searchTerm, setSearchTerm] = useState('')


    if (!data) {
        return <div>Loading...</div>
    } else if (error) {
        return <div>Something went wrong</div>
    }


    let mitrapending = data['message']
    console.log(mitrapending)

    let searchArr = mitrapending.filter((tblDat) => {
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
    let currentPosts = searchArr
    //Fixed Pagination CurrentPosts
    const howManyPages = Math.ceil(searchArr.length / postsPerPage)
    //Tambahan Pagination Current Post Map

    return (
        <>
            <div class="container-fluid">
                <div className="d-flex flex-row justify-content-center mb-5">
                    <h1>Data Mitra</h1>
                </div>

                <div className="row">
                    <div class="col-xs-12" height={'800px'}>
                    <table className="table table-responsive my-0" id="dataTable">
                        <thead>
                            <tr>
                                <th style={{ width: 56 }}>No</th>
                                <th>Nama Venue</th>
                                <th>Nama Pemilik Venue</th>
                                <th>Nama Admin</th>
                                <th>No. WA Admin</th>
                                <th>Email</th>
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
                                            <td>{data.namaPemilikVenue}</td>
                                            <td>{data.namaAdmin}</td>
                                            <td>{data.noWaAdmin}</td>
                                            <td>{data.email}</td>
                                            <td><div className="btn-group-vertical btn-group-sm">
                                                <Link href={{
                                                    pathname: '/dev/detail-mitra',
                                                    query: {
                                                        namaVenue: data.namaVenue,
                                                        namaPemilikVenue: data.namaPemilikVenue,
                                                        alamat: data.alamat,
                                                        noWa: data.noWa,
                                                        instagram: data.instagram,
                                                        kategori: data.kategori,
                                                        hariOperasional: data.hariOperasional,
                                                        jamOperasional: data.jamOperasional,
                                                        fasilitas: data.fasilitas,
                                                        opsiBayarStringify: JSON.stringify(data.opsiBayar),
                                                        rekeningStringify: JSON.stringify(data.rekening),
                                                        DP: data.DP,
                                                        namaAdmin: data.namaAdmin,
                                                        noWaAdmin: data.noWaAdmin,
                                                        emailReq: data.email,
                                                        kecamatan: data.kecamatan,
                                                        fotoVenueStringify: JSON.stringify(data.fotoVenue),
                                                        urlVenue: data.urlVenue,
                                                        srcMap: data.srcMap,
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
