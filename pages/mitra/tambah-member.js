//@ts-check
import { useState } from 'react';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useSession, signIn } from 'next-auth/react'
import useSWR from "swr";
import rupiah from '../../components/Rupiah'
import CurrencyInput from 'react-currency-input-field';
import Link from 'next/link';
import Pagination from '../../components/Pagination';
import JadwalComponent from '../../components/Jadwal';

export default function Pembayaran({ namaVenueProps }) {

    var currentdate = new Date();
    var dateTime = currentdate.getDate() + "/"
        + (currentdate.getMonth() + 1) + "/"
        + currentdate.getFullYear() + " | "
        + currentdate.getHours() + ":"
        + currentdate.getMinutes() + ":"
        + currentdate.getSeconds();

    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();
    let todayVar = yyyy + '-' + mm + '-' + dd;

    const [nama, setNama] = useState('');
    const [lapangan, setLapangan] = useState('');
    const [noWa, setNoWa] = useState('');
    const [tim, setTim] = useState('');

    let jamTerisi = []
    let jamFilter = []
    let hari = ''

    const [buktiBayar, setBuktiBayar] = useState('');
    const [createObjectURL, setCreateObjectURL] = useState(null);
    const [message, setMessage] = useState('');
    const [image, setImage] = useState('');
    const [currentPage, setCurrentPage] = useState(1)
    const [postsPerPage, setPostsPerPage] = useState(5)
    const [filterSearch, setFilterSearch] = useState('')
    const [searchTerm, setSearchTerm] = useState('')
    let namaVenue = ''
    const [tglMain, setTglMain] = useState(todayVar);
    const [jadwalPesan, setJadwalPesan] = useState([]);
    // const [available, setAvailable] = useState(true);
    const [totalHarga, setTotalHarga] = useState(0);
    let jadwalMain = []
    let harga = 0
    const [hargaDP, setHargaDP] = useState('-');
    const [diterima, setDiterima] = useState(dateTime);
    let status = 'lunas'
    const [error1, setError1] = useState('')
    const [stateDummy, setStateDummy] = useState('')
    const [uploading, setUploading] = useState(false)
    const { data: session } = useSession()

    //Router
    let router = useRouter()
    const { jadwalPesanReq,
        totalHargaReq,
        namaVenueReq,
        namaLapanganReq,
        tglMainReq,
        diterimaTglReq,
        diterimaJamReq,
        idTransaksiReq
    } = router.query


    // console.log('idTransaksi:')
    // console.log(idTransaksiReq)

    //Suwir
    const fetcher = (...args) => fetch(...args).then((res) => res.json())
    let url = ''
    if (session) {
        url = `/api/tambahmemberdb?&namaVenueReq=${namaVenueProps}`
    }
    const { data: data, error } = useSWR(url, fetcher)

    if (!data) {
        return <div>Access denied</div>
    } else if (error) {
        return <div>Something went wrong</div>
    }
    const profil = data['message']
    console.log('LAPANGAN:')
    console.log(profil.lapangan)

    let searchArr = profil.transaksiOtomatis.filter((tblDat) => {
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
    let currentPosts = searchArr.slice(indexOfFirstPost, indexOfLastPost)
    //Fixed Pagination CurrentPosts
    const howManyPages = Math.ceil(searchArr.length / postsPerPage)
    //Tambahan Pagination Current Post Map

    //Pemanggilan Function

    const isiOtomatis = (data) => {
        setNama(data.nama)
        setTim(data.tim)
        setNoWa(data.noWa)
    }

    const setTglMainFunc = (data) => {
        setTglMain(data)
        setJadwalPesan([])
        setTotalHarga(0)
        setAvailableJam()
        setAvailableJamFilter()
        setAvailableHari()


    }

    const setAvailableJam = () => {
        // console.log('Jam Booked')
        for (let i = 0; i < profil.infoTransaksi.length; i++) {
            for (let j = 0; j < profil.infoTransaksi[i].jadwalMain.length; j++) {
                jamTerisi.push(profil.infoTransaksi[i].jadwalMain[j])
            }
        }
        // console.log(jamTerisi)
    }

    const setAvailableJamFilter = () => {
        // console.log('Jam Booked')
        jamFilter = jadwalPesan.filter(value => jamTerisi.includes(value));
        // console.log(jamTerisi)
        console.log('Jam Filter')
        console.log(jamFilter)
    }

    const setAvailableHari = () => {
        let hariTemp = profil.infoVenue[0].hariOperasional.split(" - ")
        // console.log(hariTemp)

        let day = new Date()
        const weekday = ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"];
        const weekdayHitung = ["Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu", "Minggu"];
        let today = weekday[day.getUTCDay()]
        // console.log('Available Hari')
        // console.log(today)

        let indexAwalHari = weekdayHitung.indexOf(hariTemp[0])
        let indexAkhirHari = weekdayHitung.indexOf(hariTemp[1])
        // console.log(indexAwalHari)
        // console.log(indexAkhirHari)

        let totalIndex = indexAkhirHari - indexAwalHari
        let arrayAvailableHariTemp = []
        // console.log(totalIndex)
        for (let i = 0; i <= totalIndex; i++) {
            arrayAvailableHariTemp[i] = weekdayHitung[i]
        }
        // console.log('Sudah Jadi:')
        // console.log(arrayAvailableHariTemp)
        // console.log('Hari UTC TGl MAIN')
        let dateCheckerInit = new Date(tglMain)
        let dateChecker = weekday[dateCheckerInit.getUTCDay()]
        hari = dateChecker

        if (arrayAvailableHariTemp.indexOf(dateChecker) === -1) {
            available = false
        } else {
            available = true
        }
    }

    setAvailableJam()
    setAvailableJamFilter()
    setAvailableHari()


    // Penggabungan Harga dan Jadwal
    let keyJadwalPagi = Object.keys(profil.infoLapangan.jadwalPagi)
    let keyJadwalSore = Object.keys(profil.infoLapangan.jadwalSore)
    let keyJadwalMalam = Object.keys(profil.infoLapangan.jadwalMalam)


    let gabunganJadwal1 = keyJadwalPagi.concat(keyJadwalSore)
    let gabunganJadwal = gabunganJadwal1.concat(keyJadwalMalam)

    const hitungHargaDP = () => {
        let DPhitung = parseInt(profil.infoVenue[0].DP)
        let hargaDPHitung = harga - (((DPhitung / 100) * harga))
        let hargaDPhitungString = hargaDPHitung.toString()
        setHargaDP(hargaDPhitungString)
        // console.log(hargaDP)
    }

    const handlePost = async (e) => {
        e.preventDefault();

        //Cloudinary Single
        let imageUrl = ''
        //Uploading
        setUploading(true)
        //Uploading
        const body = new FormData();
        //console.log("file", image)
        body.append("file", image);
        body.append('upload_preset', 'my-uploads');
        const response = await fetch('https://api.cloudinary.com/v1_1/api-sport/image/upload', {
            method: 'POST',
            body
        }).then(r => r.json());
        imageUrl = response.secure_url

        //Cloudinary End
        console.log(buktiBayar)

        // reset error and message
        setMessage('');
        // fields check
        if (!nama || !noWa || !opsiBayar || !buktiBayar || !namaVenue || !tglMain || !jadwalMain || !harga || !status || !hargaDP || !diterima) {
            alert('Tolong isi semua kolom')
            return setError1('All fields are required');
        }

        // get the data
        let jamTerisi = []
        let url = ''
        if (session) {
            url = `/api/pembayarandb?emailReq=${session.user.email}&namaVenueReq=${namaVenueReq}&tglMainReq=${tglMainReq}&jadwalPesanReq=${jadwalPesanReq}&lapanganReq=${namaLapanganReq}&idTransaksiReq=${idTransaksiReq}`
        }
        let response1 = await fetch(url, {
            method: 'GET'
        });
        let data1 = await response1.json();
        console.log(`JSON Test:`)
        let transaksiCheck = data1['message'].transaksi
        console.log(transaksiCheck)
        for (let i = 0; i < transaksiCheck.length; i++) {
            for (let j = 0; j < transaksiCheck[i].jadwalMain.length; j++) {
                jamTerisi.push(transaksiCheck[i].jadwalMain[j])
            }
        }

        console.log(`Jam Pesan:`)
        console.log(jadwalMain)

        console.log(`Jam Terisi:`)
        console.log(jamTerisi)

        // let jamFilter = jamTerisi.filter(val => !jadwalMain.includes(val));
        const jamFilter = jadwalMain.filter(value => jamTerisi.includes(value));
        console.log(`Jam Filter:`)
        console.log(jamFilter)

        if (opsiBayar == 'DP' || opsiBayar == 'Bayar di Tempat') {
            status = 'diterima'

        }
        if (jamFilter.length == 0) {
            e.preventDefault();
            // reset error and message
            setMessage('');
            // fields check
            try {
                // Update post
                let update = await fetch('/api/transaksimitradb', {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        nama: nama,
                        tim: tim,
                        noWa: noWa,
                        noRekening: noRekening,
                        opsiBayar: opsiBayar,
                        buktiBayar: imageUrl,
                        hargaDP: hargaDP,
                        objectId: idTransaksiReq,
                        status: status
                    }),
                });
                router.push('/mitra/home')
                return alert(`Penambahan Transaksi Sukses`)
            } catch (error) {
                // Stop publishing state
                console.log('Not Working')
                return console.log('Not Working')
            }
        } else {
            alert('Mohon Maaf, timeslot telah dipesan, mohon untuk memilih jadwal kembali')
            router.back()
        }
        // post structure

    };

    const uploadToClient = (event) => {
        if (event.target.files && event.target.files[0]) {
            const i = event.target.files[0];
            setBuktiBayar(i.name)
            setImage(i);
            setCreateObjectURL(URL.createObjectURL(i));
        }
    };

    const setHarga = (value, name) => {
        harga = value
        hitungHargaDP()
    }



    return (
        <div className="container-xxl p-3">
            <div className="d-flex flex-row justify-content-center">
                <h1 className="mb-3">Form Penambahan Member</h1>
            </div>
            <hr></hr>
            <div className="d-flex flex-row justify-content-center">
                <h1 className="">Isi Data Member Otomatis</h1>

            </div>
            <div className="row flex-row flex-nowrap">
                <div className="col-12 col-md-12">
                    <div className="text-md-end dataTables_filter" id="dataTable_filter">
                        <input type="search"
                            className="form-control form-control-md"
                            aria-controls="dataTable" placeholder="Cari (Nama Pemesan)" id="searchInput"
                            onChange={event => { setSearchTerm(event.target.value) }} />
                    </div>
                </div>

            </div>
            <table className="table table-responsive" id="dataTable">
                <thead>
                    <tr>
                        <th>Nama Pemesan</th>
                        <th>Nama Tim</th>
                        <th>No Wa</th>
                        <th>Aksi</th>
                    </tr>
                </thead>
                <tbody>
                    {profil.transaksiOtomatis.length === 0 ? (
                        <tr>
                            <td colSpan={9}>Tidak ada data transaksi</td>
                        </tr>

                    ) : (
                        <>
                            {currentPosts.map((data, index) => (
                                <tr>
                                    <td>{data.nama}</td>
                                    <td>{data.tim}</td>
                                    <td>{data.noWa}</td>
                                    <td><div className="btn-group-vertical btn-group-sm">
                                        <button className="btn btn-success text-white mb-2"
                                            value="a"
                                            type="button"
                                            style={{ marginLeft: 'auto', background: 'green' }}
                                            onClick={(e) => isiOtomatis(data)}
                                        >Isi Otomatis
                                        </button>
                                    </div>
                                    </td>
                                </tr>


                            ))}
                            <div className='d-flex flex-row justify-content-center'>
                                <Pagination pages={howManyPages} setCurrentPage={setCurrentPage} />
                            </div>
                        </>
                    )}

                </tbody>
            </table>
            <div className="p-3">
            </div>
            <div className="mt-4">
                <div className="container">
                    <form onSubmit={handlePost}>
                        <div className="form-group">
                            <label htmlFor="exampleFormControlInput1">Nama Member : </label>
                            <input value={nama} type="text" className="form-control" onChange={(e) => setNama(e.target.value)} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="exampleFormControlInput1">No. WA Member: </label>
                            <input type="number" className="form-control" value={noWa} onChange={(e) => setNoWa(e.target.value)} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="exampleFormControlInput1">Total Bayar : </label>
                            <CurrencyInput
                                className='form-control'
                                id="input-example"
                                name="input-name"
                                prefix="Rp "
                                defaultValue={harga}
                                decimalsLimit={2}
                                onValueChange={(value, name) => setHarga(value, name)}
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="exampleFormControlInput1">Tim : </label>
                            <input type="text" className="form-control" value={tim} onChange={(e) => setTim(e.target.value)} />
                        </div>
                        <div className="form-group">
                            <div className="mt-2 col-md-12"><label className="labels" htmlFor="formFile">Bukti Bayar</label>
                                <input type="file"
                                    id="validatedCustomFile"
                                    className="form-control form-file"
                                    name="myImage" onChange={uploadToClient}
                                    required
                                />
                            </div>
                        </div>

                        <div className="form-group">
                            <label>Lapangan</label>
                            <select className=" form-select" onChange={(e) => setLapangan(e.target.value)}>
                                <option>--Pilih Lapangan--</option>
                                {profil.lapangan.map((data, i) => (
                                    <option value={data.namaLapangan}>{data.namaLapangan}</option>
                                ))}
                                <option>Semua Lapangan</option>
                            </select>
                        </div>

                        <form onSubmit={handlePost}>
                            <h4 className='text-start' style={{ color: '#EE8F00' }}>Jadwal Lapangan</h4>
                            <input type='date' id='tglMain' value={tglMain} onChange={(e) => setTglMainFunc(e.target.value)} className='form-control mb-4' required></input>
                            <h5 style={{ color: 'blue' }}><b>Hari Operasional: </b>{profil.infoVenue[0].hariOperasional} </h5>
                            <div className='card p-3'>
                                <h5>{hari}</h5>
                                <div className='row' style={{ color: 'white' }}>
                                    {/* THIS IS CARD */}

                                    {/* THIS IS CARD */}
                                    {available &&
                                        <>
                                            <>

                                                <JadwalComponent gabunganJadwal={gabunganJadwal} gabunganHarga={gabunganHarga} jamTerisi={jamTerisi} setChange={setChange} tglMain={tglMain} namaVenue={namaVenue} />
                                            </>
                                        </>
                                    }
                                    {!available &&
                                        <>
                                            <h4 className='text-black' style={{ color: 'red' }}>Tidak beroperasi pada hari {hari}</h4>
                                        </>
                                    }
                                    {/* {gabunganJadwal.length === 0 ? (
                                <h4>Tidak ada data Jadwal</h4>
                            ) : ( 
                                    <>
                                        
                                        {gabunganJadwal.map((data, index) => (
                                        
                                        <div className='col-6 col-lg-3 mb-2'>
                                            <div>
                                                
                                                <input type="checkbox" className="btn-check" id={`btn-check${index + 1}`} autoComplete="off" onClick={() => setCheck()} name='jadwal' value={JSON.stringify([`${data}`, gabunganHarga[index]])} />
                                                <label className="btn btn-outline-primary" htmlFor={`btn-check${index + 1}`}>{data}<br />{`Rp ${gabunganHarga[index]}.000`}</label><br />
                                            </div>
                                        </div>
                                    ))}
                                </>
                            )} */}

                                </div>
                            </div>


                            <div className='row'>
                                <h4><b>Jadwal yang akan dipesan:</b></h4>
                                <h4>Tgl Main: {`${hari}, ${tglMain}`}</h4>
                                <h4>Total Harga: {rupiah(totalHarga)}</h4>
                                <hr></hr>
                                {jadwalPesan.length === 0 ? (
                                    <h4>Tidak ada data Jadwal yang dipesan</h4>
                                ) : (
                                    <>

                                        {jadwalPesan.map((data, index) => (
                                            <div className='col-6 col-sm-3 mb-2'>
                                                <div className='card'>
                                                    <div className='card-body'>
                                                        <span>{data}</span><br></br>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </>
                                )}


                                {/* <Link href={{
                        pathname: '/pembayaran',
                        query: {
                            jadwalPesanReq: JSON.stringify(jadwalPesan),
                            totalHargaReq: totalHarga,
                            namaVenueReq: lapangan.infoVenue[0].namaVenue
                        }

                        }}> */}

                                <button type='submit' className='btn btn-fill text-white mt-3' disabled={(session) ? (false) : (true)} onClick={() => checkValue()}>Tambah Transaksi</button>


                                {/* Session di sini jangan lupa dan button */}
                                {/* disabled={(session) ? (false) : (true)} */}

                                {/* </Link> */}
                            </div>
                        </form>

                        <div className="mt-4 text-center">
                            <img src={createObjectURL} className="img-fluid" />
                        </div>
                        <div className="d-grid gap-2 py-4 ">
                            <button className="btn btn-primary p-3 fw-bold" type="submit" style={{ backgroundColor: '#006E61' }} disabled={uploading === false ? (false) : (true)} >Tambahkan Member</button>
                            {uploading &&
                                <>
                                    <div className='d-flex flex-row'>
                                        <div className="spinner-loading">
                                        </div>
                                        <span>Sedang upload gambar, Mohon Tunggu...</span>
                                    </div>
                                </>
                            }
                        </div>
                    </form>
                </div>
            </div>
        </div>

    )
}