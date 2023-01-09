
import useSWR from 'swr'
import Pagination from '../../components/Pagination'
import { useState } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import moment from 'moment'
import rupiah from '../../components/Rupiah'

export default function Datatransaksi({ namaVenueProps }) {
    const [currentPage, setCurrentPage] = useState(1)
    const [postsPerPage, setPostsPerPage] = useState(10)
    const [filterSearch, setFilterSearch] = useState('')
    const [searchTerm, setSearchTerm] = useState('')
    var currentdate = new Date();
    var dateNow = currentdate.getFullYear() + "-"
        + (currentdate.getMonth() + 1) + "-"
        + currentdate.getDate()
    var startDate = moment(dateNow, "YYYY-MM-DD")


    let router = useRouter()
    const fetcher = (...args) => fetch(...args).then((res) => res.json())

    var currentdate = new Date();
    var year1 = currentdate.getFullYear()
    const [year, setYear] = useState(year1)
    const { data: data, error } = useSWR(`/api/datatransaksidb?namaVenueReq=${namaVenueProps}&tahunReq=${year}`, fetcher)
    let namaBulan = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', "November", 'Desember']


    if (!data) {
        return <div className="spinner"></div>
    } else if (error) {
        return <div>Something went wrong</div>
    }

    let transaksi = data['message']
    let bulanan = data['bulanan']
    let transaksiBelumTemp = data['belum']


    console.log('belum:')
    console.log(transaksiBelumTemp[0].tglMain)


    // let transaksiBelum = []
    // if (transaksiBelumTemp.length >= 1) {
    //     for (let j = 0; j <= transaksiBelumTemp.length; j++) {
    //         let date = transaksiBelumTemp[j].tglMain
    //         let endDate = moment(date, "YYYY-MM-DD")
    //         let diff = endDate.diff(startDate, 'days')
    //         if (diff >= 0) {
    //             transaksiBelum.push(transaksiBelumTemp[j])
    //         }
    //         transaksiBelum.push(transaksiBelumTemp[j].tglMain)
    //     }
    // }

    let searchArr = transaksi.filter((tblDat) => {
        if (searchTerm == "") {
            return tblDat
        } else if (tblDat.nama.toLowerCase().includes(searchTerm.toLowerCase())) {
            return tblDat
        }
    })

    let total = 0
    for (let i = 0; i < transaksi.length; i++) {
        total = total + transaksi[i].harga
    }

    const hitungTotalHarga = (arr) => {
        let total = 0
        for (let i = 0; i < arr.length; i++) {
            total = total + arr[i].harga
        }
        return total
    }

    //Tambahan Pagination
    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    //Fixed Pagintion CurrentPosts hapus filter di bawah
    let currentPosts = searchArr.slice(indexOfFirstPost, indexOfLastPost)
    //Fixed Pagination CurrentPosts
    const howManyPages = Math.ceil(searchArr.length / postsPerPage)
    //Tambahan Pagination Current Post Map

    return (
        <div class="container-fluid">
            <div className="d-flex flex-row justify-content-center mb-5">
                <h1>Data Pembukuan Transaksi Lunas</h1>
            </div>

            <div class="row flex-row flex-nowrap mt-3">
                <div className="col-12 col-md-12">
                    <div className="text-md-end dataTables_filter" id="dataTable_filter">
                        <input type="search"
                            className="form-control form-control-md"
                            aria-controls="dataTable" placeholder="Cari (Nama Pemesan)" id="searchInput"
                            onChange={event => { setSearchTerm(event.target.value) }} />
                    </div>
                </div>
            </div>
            {/* Tambahan Pagination Make Sure Math.ceil adalah searchArr.length */}
            <p>Memuat {currentPosts.length} data, Jumlah keseluruhan data adalah {transaksi.length} data</p>
            <div className='d-flex flex-row justify-content-center'>
                <table className="table table-responsive" id="dataTable">
                    <thead>
                        <tr>
                            <th style={{ width: '12px' }}>No</th>
                            <th>Nama Pemesan</th>
                            <th>Nama Tim</th>
                            <th>Tanggal Diterima</th>
                            <th>Tanggal Main</th>
                            <th>Harga</th>
                            <th>Lapangan</th>
                            <th>Opsi Pembayaran</th>
                            <th>Aksi</th>
                        </tr>
                    </thead>
                    <tbody>
                        {transaksi.length === 0 ? (
                            <tr>
                                <td colSpan={9}>Tidak ada data transaksi lunas yang tersedia</td>
                            </tr>

                        ) : (
                            <>
                                {currentPosts.map((data, index) => (
                                    <tr>
                                        <td>{index + 1}</td>
                                        <td>{data.nama}</td>
                                        <td>{data.tim}</td>
                                        <td>{`${data.diterimaTgl} ${data.diterimaJam}`}</td>
                                        <td>{moment(data.tglMain, 'YYYY-MM-DD').format('DD/MM/YYYY')}</td>
                                        <td>{rupiah(data.harga)}</td>
                                        <td>{data.lapangan}</td>
                                        <td>{data.opsiBayar}</td>

                                        <td><div className="btn-group-vertical btn-group-sm">
                                            <Link href={{
                                                pathname: '/mitra/detail-transaksi',
                                                query: {
                                                    idTransaksi: data._id
                                                }

                                            }}>
                                                <button className="btn btn-success text-white mb-2"
                                                    value="a"
                                                    type="button"
                                                    style={{ marginLeft: 'auto', background: 'green' }}
                                                >Lihat Detail
                                                </button>
                                            </Link>
                                        </div>
                                        </td>
                                    </tr>


                                ))}
                                <tr className='table-info'>
                                    <td colSpan={4}></td>
                                    <td><strong><b>TOTAL</b></strong></td>
                                    <td>{rupiah(total)}</td>
                                    <td colSpan={3}></td>
                                </tr>
                                <div className='d-flex flex-row justify-content-center'>
                                    <Pagination pages={howManyPages} setCurrentPage={setCurrentPage} />
                                </div>
                            </>
                        )}

                    </tbody>
                </table>

            </div>
            <div className='container-fluid'>
                <div className='d-flex flex-row justify-content-center mb-5'>
                    <h1>Data Transaksi Bulanan</h1>
                </div>
                <div className='container-fluid mb-2'>
                    <div>
                        <h3 className='mb-2'>Tahun</h3>
                        <select className='form-control form-select' value={year} onChange={(e) => setYear(e.target.value)}>
                            <option value={'2022'}>2022</option>
                            <option value={'2023'}>2023</option>
                        </select>
                    </div>
                </div>

                <div className="row">
                    {namaBulan.map((data, index) => (
                        <div className="col-md-4 col-12 card-shadow">
                            <div className='card shadow-sm'>
                                <div className="card-body">
                                    <h2><b>{data}</b></h2>
                                    <div className="d-flex justify-content-center align-items-center">
                                        <span><b>Jumlah Transaksi</b>: {bulanan[index].length}</span>
                                    </div>
                                    <div className="d-flex justify-content-center align-items-center">
                                        <span><b>Total Pendapatan</b>: {rupiah(hitungTotalHarga(bulanan[index]))}</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                    ))}


                </div>

            </div>
            <div className="d-flex flex-row justify-content-center mt-3 mb-5">
                <h1>Data Pembukuan Transaksi Belum Main</h1>
            </div>

            <div class="row flex-row flex-nowrap mt-3">
                <div className="col-12 col-md-12">
                    <div className="text-md-end dataTables_filter" id="dataTable_filter">
                        <input type="search"
                            className="form-control form-control-md"
                            aria-controls="dataTable" placeholder="Cari (Nama Pemesan)" id="searchInput"
                            onChange={event => { setSearchTerm(event.target.value) }} />
                    </div>
                </div>
            </div>
            {/* Tambahan Pagination Make Sure Math.ceil adalah searchArr.length */}
            <p>Memuat {currentPosts.length} data, Jumlah keseluruhan data adalah {transaksi.length} data</p>
            <div className='d-flex flex-row justify-content-center'>
                <table className="table table-responsive" id="dataTable">
                    <thead>
                        <tr>
                            <th style={{ width: '12px' }}>No</th>
                            <th>Nama Pemesan</th>
                            <th>Nama Tim</th>
                            <th>Tanggal Diterima</th>
                            <th>Tanggal Main</th>
                            <th>Harga</th>
                            <th>Lapangan</th>
                            <th>Opsi Pembayaran</th>
                            <th>Aksi</th>
                        </tr>
                    </thead>
                    <tbody>
                        {transaksi.length === 0 ? (
                            <tr>
                                <td colSpan={9}>Tidak ada data transaksi lunas yang tersedia</td>
                            </tr>

                        ) : (
                            <>
                                {currentPosts.map((data, index) => (
                                    <tr>
                                        <td>{index + 1}</td>
                                        <td>{data.nama}</td>
                                        <td>{data.tim}</td>
                                        <td>{`${data.diterimaTgl} ${data.diterimaJam}`}</td>
                                        <td>{moment(data.tglMain, 'YYYY-MM-DD').format('DD/MM/YYYY')}</td>
                                        <td>{rupiah(data.harga)}</td>
                                        <td>{data.lapangan}</td>
                                        <td>{data.opsiBayar}</td>

                                        <td><div className="btn-group-vertical btn-group-sm">
                                            <Link href={{
                                                pathname: '/mitra/detail-transaksi',
                                                query: {
                                                    idTransaksi: data._id
                                                }

                                            }}>
                                                <button className="btn btn-success text-white mb-2"
                                                    value="a"
                                                    type="button"
                                                    style={{ marginLeft: 'auto', background: 'green' }}
                                                >Lihat Detail
                                                </button>
                                            </Link>
                                            <Link href={{
                                                pathname: '/mitra/edit-jadwal',
                                                query: {
                                                    namaVenue: data.namaVenue,
                                                    namaLapangan: data.lapangan,
                                                    idTransaksi: data._id,
                                                    jadwalMainReq: JSON.stringify(data.jadwalMain)
                                                }

                                            }}>
                                                <button className="btn btn-danger text-white mb-2"
                                                    value="a"
                                                    type="button"
                                                    style={{ marginLeft: 'auto' }}
                                                >Edit Jadwal
                                                </button>
                                            </Link>
                                        </div>
                                        </td>
                                    </tr>


                                ))}
                                <tr className='table-info'>
                                    <td colSpan={4}></td>
                                    <td><strong><b>TOTAL</b></strong></td>
                                    <td>{rupiah(total)}</td>
                                    <td colSpan={3}></td>
                                </tr>
                                <div className='d-flex flex-row justify-content-center'>
                                    <Pagination pages={howManyPages} setCurrentPage={setCurrentPage} />
                                </div>
                            </>
                        )}

                    </tbody>
                </table>

            </div>
        </div>
    )
}
