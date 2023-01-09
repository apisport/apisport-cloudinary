//@ts-check
import { useState } from 'react';
import { useRouter } from 'next/router';
import { useSession, signIn, signOut } from 'next-auth/react'
import useSWR from 'swr';
import Link from 'next/link';
import PhoneInput from 'react-phone-input-2';
import Alamat from "../../components/provinsi";


export default function MitraRegister() {
  const [namaVenue, setNamaVenue] = useState('');
  const [namaPemilikVenue, setNamaPemilikVenue] = useState('');
  const [alamat, setAlamat] = useState('');
  const [noWa, setNoWa] = useState('');
  const [instagram, setInstagram] = useState('');
  const [kategori, setKategori] = useState('');
  const [hariOperasional, setHariOperasional] = useState('');
  const [jamOperasional, setJamOperasional] = useState('');
  const [fasilitas, setFasilitas] = useState('');
  const [opsiBayar, setOpsiBayar] = useState([]);
  const [rekening, setRekening] = useState([]);
  const [urlVenue1, setUrlVenue] = useState('');
  const [DP, setDP] = useState(0);
  let urlVenue = ''

  //Admin Confined
  const [namaAdmin, setNamaAdmin] = useState('');
  const [noWaAdmin, setNoWaAdmin] = useState('');
  let email = ''
  const { data: session, status } = useSession()

  //Gambar
  const [fotoVenue, setFotoVenue] = useState([]);
  const [message, setMessage] = useState('');

  //uploading
  const [uploading, setUploading] = useState(false)

  //kabupaten
  let provinsi = ''
  let kabupaten = ''
  let kecamatan = ''
  let desa = ''



  let router = useRouter()

  const fetcher = (...args) => fetch(...args).then((res) => res.json())
  let url = ''
  if (session) {
    url = `/api/checkmail?emailReq=${session.user.email}`
  }
  const { data: data, error } = useSWR(url, fetcher, {refreshInterval: 1000})

  if (!data) {
    return <div>Loading...</div>
  } else if (error) {
    return <div>Something went wrong</div>
  }

  let emailDb = data['message']
  console.log(emailDb)

  const setNamaVenueExtra = (value) =>{
    setNamaVenue(value)
    let namaVenueHTML = document.getElementById('namaGedung').value
    let namaHasil1 = namaVenueHTML.split(" ").join("");
    let namaHasil2 = namaHasil1.toLowerCase()
    urlVenue = namaHasil2
    setUrlVenue(namaHasil2)
  }

  const checkAll = () => {
    provinsi = document.getElementById('inProvinsi').value
    kabupaten = document.getElementById('inKabupaten').value
    kecamatan = document.getElementById('inKecamatan').value
    email = session.user.email
  }

  const handlePost = async (e) => {
    e.preventDefault();
    checkAll()
    setMessage('');
    setNamaVenueExtra()
    // fields check
    if (!namaVenue || !namaPemilikVenue || !noWa || !kategori || !email) {
      return alert('Harap untuk mengisi semua data');
    }

    // post structure
    let mitraPending = {
      namaVenue,
      namaPemilikVenue,
      alamat,
      provinsi,
      kabupaten,
      kecamatan,
      desa,
      noWa,
      instagram,
      kategori,
      hariOperasional,
      jamOperasional,
      fasilitas,
      opsiBayar,
      DP,
      rekening,
      namaAdmin,
      noWaAdmin,
      email,
      fotoVenue,
      urlVenue
    };
    // save the post
    let response = await fetch('/api/mitradb', {
      method: 'POST',
      body: JSON.stringify(mitraPending),
    });
    // get the data
    let data = await response.json();
    if (data.success) {
      // reset the fields
      alert('Register sebagai mitra berhasil!')
      router.push('/mitra/home')
      
      return setMessage(data.message);
    }
    else {
      // set the error
      console.log(data.message);
      return setError(data.message);
    }
    
  };

 
  

  if (session) {
    if (emailDb.mitra.length === 0 && emailDb.user.length === 0 && emailDb.mitraPending.length === 0) {
      return (
        <div className="limiter">
          <div className="container-login100" style={{ backgroundImage: 'url("/bg-01.jpg")' }}>
            <div className="wrap-login100 p-3">
              <form className="login100-form validate-form" onSubmit={handlePost}>
                <div className="text-center">
                  <img src="/ico.png" className='img-fluid' style={{ height: '150px', width: '200px' }} />
                </div>
                <span className="login100-form-title p-b-12" >
                  REGISTER SEBAGAI MITRA
                </span>
                <div className="p-3 py-3">
                  <div className="row mt-2">
                    <div className="col-md-12">
                      <label className="labels">Nama Gedung Lapangan</label><i style={{ color: '#ff0000', fontSize: 'larger' }}>*</i>
                      <input type="text"
                        className="form-control"
                        id='namaGedung'
                        value={namaVenue}
                        onChange={(e) => setNamaVenueExtra(e.target.value)}
                        required />
                    </div>
                    <div className="col-md-12 mt-2">
                      <label className="labels">Nama Pemilik </label><i style={{ color: '#ff0000', fontSize: 'larger' }}>*</i>
                      <input type="text" className="form-control"
                        value={namaPemilikVenue}
                        onChange={(e) => setNamaPemilikVenue(e.target.value)}

                        required />
                    </div>

                    <Alamat />
                    <div className="mt-2 col-md-12"><label className="labels">Jalan</label>
                      <i style={{ color: '#ff0000', fontSize: 'larger' }}>*</i>
                      <textarea className="form-control"
                        id="exampleFormControlTextarea1"
                        rows="3"
                        value={alamat}
                        onChange={(e) => setAlamat(e.target.value)}
                        required></textarea>
                    </div>
                    <div className="mt-2 col-md-12"><label className="labels">No . WhatsApp Venue</label>
                      <i style={{ color: '#ff0000', fontSize: 'larger' }}>*</i>
                      <div className="input-group mb-3">
                        <span className="input-group-text" id="basic-addon1">+62</span>
                        <input type="number"
                          className="form-control"
                          value={noWa}
                          onChange={(e) => setNoWa(e.target.value)}
                          required />
                      </div>
                    </div>
                    <div className="mt-2 col-md-12"><label className="labels">URL Lapangan</label>
                      <i style={{ color: '#ff0000', fontSize: 'larger' }}>*</i>
                      <div className="input-group mb-3">
                        <span className="input-group-text" id="basic-addon1">infolapangan.com/</span>
                        <input type="text"
                          className="form-control"
                          value={urlVenue1}
                          onChange={(e) => setUrlVenue(e.target.value)}
                          required
                          readOnly
                           />
                      </div>
                    </div>
                    <div className="form-group mt-2 col-md-12">
                      <label htmlFor="exampleFormControlSelect1">Kategori Olahraga</label><i style={{ color: '#ff0000', fontSize: 'larger' }}>*</i>
                      <select className="form-control form-select" onChange={(e) => setKategori(e.target.value)} required>
                        <option>--Pilih Olahraga--</option>
                        <option value={'Futsal'}>Futsal</option>
                        <option value={'Bulu Tangkis'}>Bulu Tangkis</option>
                        <option value={'Basket'}>Basket</option>
                        <option value={'Tenis'}>Tenis</option>
                      </select>
                    </div>
                    
                    <div className="mt-1 col-md-12">
                      <label className="labels">Username</label><i style={{ color: '#ff0000', fontSize: 'larger' }}>*</i>
                      <input type="text"
                        className="form-control"
                        value={session.user.name}
                        required
                        readOnly
                        />
                    </div>
                    <div className="mt-1 col-md-12">
                      <label className="labels">E-mail</label><i style={{ color: '#ff0000', fontSize: 'larger' }}>*</i>
                      <input type="text"
                        className="form-control"
                        value={session.user.email}
                        required
                        readOnly
                        />
                    </div>
                  </div>
                  <div className="container-login100-form-btn my-3">
                    <button type="submit"
                      className="btn btn-outline-secondary"
                      style={{ backgroundColor: '#006E61', color: 'rgb(255, 255, 255)', borderRadius: '5cm', width: 500, height: 50 }} disabled={uploading === false ? (false) : (true)} >DAFTAR</button>
                  </div>
                  <div className="flex-col-c mt-3">
                    <span className="txt1 p-b-10">
                      Sudah punya akun?
                      <a href="./login" className="txt2">
                        &nbsp;<u>LOGIN</u>
                      </a>
                    </span>
                  </div>
                </div>
              </form>
            </div>
          </div>

        </div>
      )
    } else if (emailDb.user.length != 0) {
      return (
        <div className="limiter">
          <div className="container-login100" style={{ backgroundImage: 'url("/bg-01.jpg")' }}>
            <div className="wrap-login100 p-3">
              <form className="login100-form validate-form" >
                <div className='d-flex flex-row justify-content-center'>
                  <h3>Email sudah terdaftar sebagai User</h3>
                </div>
                <div className="p-3 py-5">

                  <div className="flex-c-m">
                    <Link href='/'>
                      <a className="btn btn-primary p-3">
                        <i className="fa fa-google" /> &nbsp; &nbsp; &nbsp; Kembali ke Beranda

                      </a>
                    </Link>
                  </div>
                </div>
              </form>
            </div>
          </div>

        </div>
      )
    } else if (emailDb.mitra.length != 0) {
      return (
        <div className="limiter">
          <div className="container-login100" style={{ backgroundImage: 'url("/bg-01.jpg")' }}>
            <div className="wrap-login100 p-3">
              <form className="login100-form validate-form" >
                <h3>Email sudah terdaftar sebagai Mitra</h3>
                <div className="p-3 py-5">

                  <div className="flex-c-m">
                    <Link href='/mitra/home'>
                      <a className="btn btn-primary p-3">
                        <i className="fa fa-google" /> &nbsp; &nbsp; &nbsp; Lanjut ke Beranda Mitra

                      </a>
                    </Link>
                  </div>
                </div>
              </form>
            </div>
          </div>

        </div>
      )
    }else if (emailDb.mitraPending.length != 0) {
      return (
        <div className="limiter">
          <div className="container-login100" style={{ backgroundImage: 'url("/bg-01.jpg")' }}>
            <div className="wrap-login100 p-3">
              <form className="login100-form validate-form" >
                <h3>Mohon Tunggu untuk Persetujuan Kami</h3>
                <div className="p-3 py-5">

                  <div className="flex-c-m">
                    <Link href='/'>
                      <button className="btn btn-primary p-3" onClick={handleSignOut}>
                        <i className="fa fa-google" /> &nbsp; &nbsp; &nbsp; Kembali ke Beranda

                      </button>
                    </Link>
                  </div>
                </div>
              </form>
            </div>
          </div>

        </div>
      )
    }
  }
  
}
