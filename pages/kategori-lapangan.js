import Head from 'next/head'
import Image from 'next/image'
import Helmet from 'react-helmet'
import Carousel from 'react-bootstrap/Carousel'
import CardRekomendasi from '../components/user/lapangan/CardRekomendasi'
import CardKategori from '../components/user/lapangan/CardKategori'
import useSWR from 'swr'
import Pagination from '../components/Pagination'
import { useState } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'

export default function KategoriLapangan() {
    const [currentPage, setCurrentPage] = useState(1)
    const [postsPerPage, setPostsPerPage] = useState(6)
    const [filterSearch, setFilterSearch] = useState('')
    const [searchTerm, setSearchTerm] = useState('')

    let router = useRouter()
    const { kategori } = router.query
    const fetcher = (...args) => fetch(...args).then((res) => res.json())
    const { data: data, error } = useSWR(`/api/kategorilapangandb?kategoriReq=${kategori}`, fetcher)

    if (!data) {
        return <div className="spinner"></div>
    } else if (error) {
        return <div>Something went wrong</div>
    }

    let lapangan = data['message']
    console.log('Agregate:')
    console.log(lapangan)


    let searchArr = lapangan.filter((tblDat) => {
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

            <div id="carouselExampleIndicators" className="carousel slide" data-bs-ride="carousel">
                <div className="carousel-indicators">
                    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to={0} className="active" aria-current="true" aria-label="Slide 1" />
                    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to={1} aria-label="Slide 2" />
                    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to={2} aria-label="Slide 3" />
                </div>
                <div className="carousel-inner">
                    <div className="carousel-item active">
                        <img src="images/sewa-lapangan-olahraga.png" className="d-block img-fluid w-100" alt="..." />
                    </div>
                    <div className="carousel-item">
                        <img src="images/api-sport.png" className="d-block img-fluid w-100" alt="..." />
                    </div>
                    <div className="carousel-item">
                        <img src="images/infolapangan.jpg" className="d-block img-fluid w-100" alt="..." />
                    </div>
                </div>
                <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
                    <span className="carousel-control-prev-icon" aria-hidden="true" />
                    <span className="visually-hidden">Previous</span>
                </button>
                <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
                    <span className="carousel-control-next-icon" aria-hidden="true" />
                    <span className="visually-hidden">Next</span>
                </button>
            </div>
            <div className='container my-4'>
                <h4 className='fw-bold fst-italic'>KATEGORI OLAHRAGA</h4>
                <div className="row row-cols-4 row-cols-md-4 g-4 mt-3">
                    <div className="col-3 col-lg-3">
                        <Link href={{
                            pathname: '/kategori-lapangan',
                            query: {
                                kategori: 'Futsal'
                            }

                        }}>
                            {kategori == 'Futsal' ? (
                                <div>
                                    <img src='icons/futsal.png' style={{ backgroundColor: '#EE8F00', color: 'black' }} className="bd-placeholder-img img-fluid rounded-circle" width={120} height={120} role="img" aria-label="Placeholder: 140x140" />
                                    <p className="mt-2 p-1" style={{ color: "white", backgroundColor: '#EE8F00', borderRadius: "5px" }}>Futsal</p>
                                </div>) : (
                                <div>
                                    <img src='icons/futsal.png' style={{ backgroundColor: '#432C0B', color: 'black' }} className="bd-placeholder-img img-fluid rounded-circle" width={120} height={120} role="img" aria-label="Placeholder: 140x140" />
                                    <p className="mt-2 p-1" style={{ color: "white", backgroundColor: '#432C0B', borderRadius: "5px" }}>Futsal</p>
                                </div>)}
                        </Link>
                    </div>
                    <div className="col-3 col-lg-3">
                        <Link href={{
                            pathname: '/kategori-lapangan',
                            query: {
                                kategori: 'Tenis'
                            }

                        }}>
                            {kategori == 'Tenis' ? (
                                <div>
                                    <img src='icons/tenis.png' style={{ backgroundColor: '#EE8F00', color: 'black' }} className="bd-placeholder-img img-fluid rounded-circle" width={120} height={120} role="img" aria-label="Placeholder: 140x140" />
                                    <p className="mt-2 p-1" style={{ color: "white", backgroundColor: '#EE8F00', borderRadius: "5px" }}>Tenis</p>
                                </div>) : (
                                <div>
                                    <img src='icons/tenis.png' style={{ backgroundColor: '#432C0B', color: 'black' }} className="bd-placeholder-img img-fluid rounded-circle" width={120} height={120} role="img" aria-label="Placeholder: 140x140" />
                                    <p className="mt-2 p-1" style={{ color: "white", backgroundColor: '#432C0B', borderRadius: "5px" }}>Tenis</p>
                                </div>)}
                        </Link>
                    </div>
                    <div className="col-3 col-lg-3">
                        <Link href={{
                            pathname: '/kategori-lapangan',
                            query: {
                                kategori: 'Bulu Tangkis'
                            }

                        }}>
                            {kategori == 'Bulu Tangkis' ? (
                                <div>
                                    <img src='icons/bulutangkis.png' style={{ backgroundColor: '#EE8F00', color: 'black' }} className="bd-placeholder-img img-fluid rounded-circle" width={120} height={120} role="img" aria-label="Placeholder: 140x140" />
                                    <p className="mt-2 p-lg-2" style={{ color: "white", backgroundColor: '#EE8F00', borderRadius: "5px", fontSize: '12px' }}>Bulu Tangkis</p>
                                </div>) : (
                                <div>
                                    <img src='icons/bulutangkis.png' style={{ backgroundColor: '#432C0B', color: 'black' }} className="bd-placeholder-img img-fluid rounded-circle" width={120} height={120} role="img" aria-label="Placeholder: 140x140" />
                                    <p className="mt-2 p-lg-2" style={{ color: "white", backgroundColor: '#432C0B', borderRadius: "5px", fontSize: '12px' }}>Bulu Tangkis</p>
                                </div>)}

                        </Link>
                    </div>
                    <div className="col-3 col-lg-3">
                        <Link href={{
                            pathname: '/kategori-lapangan',
                            query: {
                                kategori: 'Basket'
                            }

                        }}>
                            {kategori == 'Basket' ? (
                                <div>
                                    <img src='icons/basket.png' style={{ backgroundColor: '#EE8F00' }} className="bd-placeholder-img img-fluid rounded-circle" width={120} height={120} role="img" aria-label="Placeholder: 140x140" />
                                    <p className="mt-2 p-1" style={{ color: "white", backgroundColor: '#EE8F00', borderRadius: "5px" }}>Basket</p>
                                </div>) : (
                                <div>
                                    <img src='icons/basket.png' style={{ backgroundColor: '#432C0B', color: 'black' }} className="bd-placeholder-img img-fluid rounded-circle" width={120} height={120} role="img" aria-label="Placeholder: 140x140" />
                                    <p className="mt-2 p-1" style={{ color: "white", backgroundColor: '#432C0B', borderRadius: "5px" }}>Basket</p>
                                </div>)}
                        </Link>
                    </div>
                </div>
            </div>

            <div className="container my-4">
                <div className="row d-flex justify-content-center align-items-center">
                    <div className="btn-group col-md-12 col-12">
                        <input type="text"
                            className="form-control col-10 mt-2 col-md-10"
                            placeholder="Cari Lapangan Disini"
                            value={searchTerm}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                        <div className='col-2 mt-2 col-sm-2'>
                            <Link href={`/cari-lapangan?search=${searchTerm}`} ><button className=" btn shadow-sm" style={{ backgroundColor: '#EE8F00' }}><i className="fa fa-search text-white"></i></button></Link>
                        </div>
                    </div>
                </div>
            </div>
            <div>
                <div className="container my-4 text-black-50" >
                    <h4 style={{ color: 'black' }} className='fw-bold fst-italic'>{`Daftar Lapangan ${kategori}`}</h4>
                    <hr></hr>

                    {currentPosts.length === 0 ? (
                        <><h4>{`Tidak ada Data Lapangan ${kategori} ditemukan`}</h4></>
                    ) : (
                        <>
                            <div className="row justify-content-center row-cols-1 row-cols-md-3">
                            {currentPosts.map((data, i) => (
                                <CardRekomendasi props={data} />
                            ))}
                            </div>
                            <div className='d-flex flex-row justify-content-center mt-3'>
                                <Pagination pages={howManyPages} setCurrentPage={setCurrentPage} />
                            </div>
                        </>
                    )}

                </div>
            </div>


        </>
    )
}
