import Link from 'next/link'

export default function CardLapangan({props}) {
    let keyJadwalPagi = Object.keys(props.jadwalPagi)
    let keyJadwalMalam = Object.keys(props.jadwalMalam)
    let gabunganJadwal = keyJadwalPagi.concat(keyJadwalMalam)
    let gabunganHarga = []
    let namaHasil = props.namaLapangan.split(" ").join("");


    for (let i = 0; i < keyJadwalPagi.length; i++) {
        gabunganHarga.push(props.hargaPagi)
    }

    for (let i = 0; i < keyJadwalMalam.length; i++) {
        gabunganHarga.push(props.hargaMalam)
    }

    return (
        <div className='col-12 col-md-6 col-sm-12 mt-3'>
            
                <div className="card border-0 shadow-sm">
                    <div className="card-body rounded p-3">
                        {/* ROW CONTENT */}
                    <div className="">
                        <div className="  col-md-4">
                            {/* SLIDER */}
                            <div id={`${namaHasil}`} className="carousel slide" data-bs-ride="carousel">
                                <div className="carousel-indicators">
                                    {props.gambar.map((data, i) => (
                                        <>
                                            {i == 0 ?
                                                (<button type="button" data-bs-target={`#${namaHasil}`} data-bs-slide-to={i} className="active" aria-current="true" aria-label={`Slide ${i}`} />) :
                                                (<button type="button" data-bs-target={`#${namaHasil}`} data-bs-slide-to={i} aria-label={`Slide ${i}`} />)}

                                        </>
                                    ))}
                                </div>
                                <div className="carousel-inner">
                                    {props.gambar.map((data, i) => (
                                        <>
                                            {i == 0 ?
                                                (<div className="carousel-item active">
                                                    <img src={`${data}`} className=" img-fluid" />
                                                </div>) :
                                                (<div className="carousel-item">
                                                    <img src={`${data}`} className=" img-fluid" />
                                                </div>)}
                                        </>
                                    ))}

                                </div>
                                <button className="carousel-control-prev" type="button" data-bs-target={`#${namaHasil}`} data-bs-slide="prev">
                                    <span className="carousel-control-prev-icon" aria-hidden="true" />
                                    <span className="visually-hidden">Previous</span>
                                </button>
                                <button className="carousel-control-next" type="button" data-bs-target={`#${namaHasil}`} data-bs-slide="next">
                                    <span className="carousel-control-next-icon" aria-hidden="true" />
                                    <span className="visually-hidden">Next</span>
                                </button>
                            </div>
                            <h5 className="card-title mt-2 justify-content-center text-center" style={{ color: "black" }}><strong>{ props.namaLapangan}</strong></h5>
                                <div className='text-center justify-content-center mt-2 mb-2'>
                                <Link href={{
                                    pathname: '/detail-lapangan',
                                    query: {
                                        idLapangan: props._id,
                                        namaVenue: props.namaVenue,
                                        namaLapangan: props.namaLapangan
                                    }

                                }}>
                                    <button className='btn text-white p-2' style={{ color: "white", backgroundColor: '#ffbe2e', borderRadius: "15px" }}><b> Pesan Sekarang </b></button>
                                </Link>
                                </div>

                                {/* END SLIDER */}
                            </div>
                        
                        </div>
                        {/* END ROW */}
                    </div>

            </div>
        </div>
    )
}
