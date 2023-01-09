import { useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link'
import useSWR from "swr";
import { useSession, signIn } from 'next-auth/react'

export default function ProfilMitra({ namaVenueProps }) {
    //Suwir
    const fetcher = (...args) => fetch(...args).then((res) => res.json())
    const { data: data, error } = useSWR(`/api/profilmitradb?namaVenueReq=${namaVenueProps}`, fetcher, { refreshInterval: 1000 })
    const { data: session } = useSession();
    if (!data) {
        return <div className="spinner"></div>
    } else if (error) {
        return <div>Something went wrong</div>
    }
    let mitra = data['message'][0]
    let email = session.user.email






    return (
        <div className="limiter">
            <div className="container-login100">
                <form className="login100-form validate-form">
                    <span className="login100-form-title">
                        PROFIL MITRA
                    </span>
                    <div className="p-3 py-5">
                        <div className="row">
                            <div className=" col-md-12">
                                <label className="labels">Nama Venue</label><i style={{ color: '#ff0000', fontSize: 'larger' }}>*</i>
                                <input type="text" className="form-control"
                                    required
                                    name="nama"
                                    value={mitra.namaVenue}
                                    readOnly
                                />
                            </div>
                        </div>
                        <div className="row mt-2">
                            <div className="mt-2 col-md-12">
                                <label className="labels">Nama Pemilik Venue</label><i style={{ color: '#ff0000', fontSize: 'larger' }}>*</i>
                                <input type="text" className="form-control"
                                    required
                                    name="nama"
                                    value={mitra.namaPemilikVenue}
                                    readOnly
                                />
                            </div>
                        </div>
                        <div className="row mt-2">
                            <div className="mt-2 col-md-12">
                                <label className="labels">Alamat</label><i style={{ color: '#ff0000', fontSize: 'larger' }}>*</i>
                                <textarea type="text" className="form-control"
                                    required
                                    value={mitra.alamat}
                                    readOnly
                                />
                            </div>
                        </div>
                        <div className="row mt-2">
                            <div className="mt-2 col-md-12">
                                <label className="labels">No. WA Venue</label><i style={{ color: '#ff0000', fontSize: 'larger' }}>*</i>
                                <input type="text" className="form-control"
                                    required
                                    value={mitra.noWa}
                                    readOnly
                                />
                            </div>
                        </div>
                        <div className="row mt-2">
                            <div className="mt-2 col-md-12">
                                <label className="labels">Instagram</label><i style={{ color: '#ff0000', fontSize: 'larger' }}>*</i>
                                <input type="text" className="form-control"
                                    required
                                    value={`@${mitra.instagram}`}
                                    readOnly
                                />
                            </div>
                        </div>
                        <div className="row mt-2">
                            <div className="mt-2 col-md-12">
                                <label className="labels">Kategori</label><i style={{ color: '#ff0000', fontSize: 'larger' }}>*</i>
                                <input type="text" className="form-control"
                                    required
                                    value={mitra.kategori}
                                    readOnly
                                />
                            </div>
                        </div>
                        <div className="row mt-2">
                            <div className="mt-2 col-md-12">
                                <label className="labels">Hari Operasional</label><i style={{ color: '#ff0000', fontSize: 'larger' }}>*</i>
                                <input type="text" className="form-control"
                                    required
                                    value={mitra.hariOperasional}
                                    readOnly
                                />
                            </div>
                        </div>
                        <div className="row mt-2">
                            <div className="mt-2 col-md-12">
                                <label className="labels">Jam Operasional</label><i style={{ color: '#ff0000', fontSize: 'larger' }}>*</i>
                                <input type="text" className="form-control"
                                    required
                                    value={mitra.jamOperasional}
                                    readOnly
                                />
                            </div>
                        </div>
                        <div className="row mt-2">
                            <div className="mt-2 col-md-12">
                                <label className="labels">Fasilitas</label><i style={{ color: '#ff0000', fontSize: 'larger' }}>*</i>
                                <textarea type="text" className="form-control"
                                    required
                                    value={mitra.fasilitas}
                                    readOnly
                                />
                            </div>
                        </div>
                        <div className="row mt-2">
                            <div className="mt-2 col-md-12">
                                <label className="labels">Opsi Bayar</label><i style={{ color: '#ff0000', fontSize: 'larger' }}>*</i>
                                <ul className='list-group'>
                                    {mitra.opsiBayar.map((data, index) => (
                                        <li className='list-group-item'>{data}</li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                        <div className="row mt-2">
                            <div className="mt-2 col-md-12">
                                <label className="labels">No. Rekening</label><i style={{ color: '#ff0000', fontSize: 'larger' }}>*</i>
                                <ul className='list-group'>
                                    {mitra.rekening.map((data, index) => (
                                        <li className='list-group-item'>{data}</li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                        <div className="row mt-2">
                            <div className="mt-2 col-md-12">
                                <label className="labels">DP</label><i style={{ color: '#ff0000', fontSize: 'larger' }}>*</i>
                                <textarea type="text" className="form-control"
                                    required
                                    value={mitra.DP}
                                    readOnly
                                />
                            </div>
                        </div>
                        <hr></hr>
                        <div className="row mt-2">
                            <div className="mt-2 col-md-12">
                                <label className="labels">Nama Admin</label><i style={{ color: '#ff0000', fontSize: 'larger' }}>*</i>
                                <input type="text" className="form-control"
                                    required
                                    value={mitra.namaAdmin}
                                    readOnly
                                />
                            </div>
                        </div>
                        <div className="row mt-2">
                            <div className="mt-2 col-md-12">
                                <label className="labels">No WA Admin</label><i style={{ color: '#ff0000', fontSize: 'larger' }}>*</i>
                                <input type="text" className="form-control"
                                    required
                                    value={mitra.noWaAdmin}
                                    readOnly
                                />
                            </div>
                        </div>
                        <div className="row mt-2">
                            <div className="mt-2 col-md-12">
                                <label className="labels">Email</label><i style={{ color: '#ff0000', fontSize: 'larger' }}>*</i>
                                <input type="text" className="form-control"
                                    required
                                    value={mitra.email}
                                    readOnly
                                />
                            </div>
                        </div>
                        <div className="col-12 col-md-12">
                            {mitra.fotoVenue.length === 0 ? (
                                <h2>Daftar Foto</h2>
                            ) : (
                                <>

                                    {mitra.fotoVenue.map((data, i) => (
                                        <>
                                            <div className='cols-2 mt-3 mb-3 row row-cols-2'>
                                                <div className='cols-1 col-md-6'>
                                                    <img id='image' className='img-fluid d-block border border-dark' width={150} height={150} src={`${mitra.fotoVenue[i]}`} />
                                                </div>


                                            </div>
                                        </>


                                    ))}
                                </>
                            )}
                        </div>


                        <div class="row mt-3 container-login100-form-btn my-3 g-3">
                            <Link href={{
                                pathname: '/mitra/edit-profil',
                                query: {
                                    namaVenue: mitra.namaVenue,
                                    namaVenueLama: mitra.namaVenue,
                                    namaPemilikVenue: mitra.namaPemilikVenue,
                                    alamat: mitra.alamat,
                                    noWa: mitra.noWa,
                                    instagram: mitra.instagram,
                                    kategori: mitra.kategori,
                                    hariOperasional: mitra.hariOperasional,
                                    jamOperasional: mitra.jamOperasional,
                                    fasilitas: mitra.fasilitas,
                                    opsiBayarStringify: JSON.stringify(mitra.opsiBayar),
                                    rekeningStringify: JSON.stringify(mitra.rekening),
                                    DP: mitra.DP,
                                    namaAdmin: mitra.namaAdmin,
                                    noWaAdmin: mitra.noWaAdmin,
                                    emailReq: mitra.email,
                                    fotoVenueStringify: JSON.stringify(mitra.fotoVenue),
                                    objectId: mitra._id
                                }

                            }}>
                                <button type="submit"
                                    className="btn btn-outline-secondary mx-3" style={{ backgroundColor: '#006E61', color: 'rgb(255, 255, 255)', borderRadius: '5cm', width: 500, height: 50 }}
                                >
                                    EDIT
                                </button>
                            </Link>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}
