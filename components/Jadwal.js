import rupiah from "./Rupiah"
const JadwalComponent = ({ gabunganJadwal, gabunganHarga, tglMain, jamTerisi, setChange, namaVenue }) => {
    const weekday = ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"];
    const pengecualianAditya = ["Kamis"];
    let dateCheck = new Date(tglMain)
    let todayName = weekday[dateCheck.getUTCDay()]
    let indexAdityaNonSabtu = [4, 5, 6, 7, 8, 9]
    let indexAdityaSabtu = [4, 5, 6]

    //Aditya Sport Non Kamis
    let gabunganJadwalAditya1 = []
    gabunganJadwalAditya1.push(gabunganJadwal[0], gabunganJadwal[1], gabunganJadwal[2], gabunganJadwal[3])
    let gabunganJadwalAditya2 = []
    gabunganJadwalAditya2.push(gabunganJadwal[4], gabunganJadwal[5], gabunganJadwal[6], gabunganJadwal[7], gabunganJadwal[8], gabunganJadwal[9])
    let gabunganJadwalAditya3 = []
    gabunganJadwalAditya3.push(gabunganJadwal[10], gabunganJadwal[11])

    //Aditya Sport Kamis
    let gabunganJadwalAditya1K = []
    gabunganJadwalAditya1K.push(gabunganJadwal[0], gabunganJadwal[1], gabunganJadwal[2], gabunganJadwal[3])
    let gabunganJadwalAditya2K = []
    gabunganJadwalAditya2K.push(gabunganJadwal[4], gabunganJadwal[5], gabunganJadwal[6])
    let gabunganJadwalAditya3K = []
    gabunganJadwalAditya3K.push(gabunganJadwal[7], gabunganJadwal[8], gabunganJadwal[9], gabunganJadwal[10], gabunganJadwal[11])

    //Aditya Sport
    if (namaVenue == 'Aditya Sport Cluring') {
        if (pengecualianAditya.indexOf(todayName) == -1) {
            return (
                <>
                    {gabunganJadwalAditya1.map((data, index) => (
                        <div className='col-6 col-lg-3 mb-2' style={{
                            fontWeight: 500,
                        }}>
                            <div>

                                <input type="checkbox" className="btn-check" id={`btn-check${index + 1}`}
                                    autoComplete="off" onChange={(e) => setChange(e, gabunganHarga[index], data)}
                                    name='jadwal'

                                    disabled={jamTerisi.indexOf(data) === -1 ? (false) : (true)}
                                    value={JSON.stringify([`${data}`, gabunganHarga[index]])} />
                                <label className="btn-apisport-parent btn-apisport" style={jamTerisi.indexOf(data) === -1 ? ({}) : ({ backgroundColor: 'red', color: 'white' })} htmlFor={`btn-check${index + 1}`}>{data}<br />{rupiah(gabunganHarga[index])}</label><br />
                            </div>
                        </div>
                    ))}
                    {gabunganJadwalAditya2.map((data, index) => (
                        <div className='col-6 col-lg-3 mb-2' style={{
                            fontWeight: 500,
                        }}>
                            <div>

                                <input type="checkbox" className="btn-check"
                                    autoComplete="off"
                                    name='jadwal'

                                    disabled={(true)}
                                    value={JSON.stringify([`${data}`, gabunganHarga[index]])} />
                                <label className="btn-apisport-parent btn-apisport" style={{ backgroundColor: 'red', color: 'white' }} >{data}<br />{rupiah(gabunganHarga[index])}</label><br />
                            </div>
                        </div>
                    ))}
                    {gabunganJadwalAditya3.map((data, index) => (
                        <div className='col-6 col-lg-3 mb-2' style={{
                            fontWeight: 500,
                        }}>
                            <div>

                                <input type="checkbox" className="btn-check" id={`btn-check${index + 9}`}
                                    autoComplete="off" onChange={(e) => setChange(e, gabunganHarga[index], data)}
                                    name='jadwal'

                                    disabled={jamTerisi.indexOf(data) === -1 ? (false) : (true)}
                                    value={JSON.stringify([`${data}`, gabunganHarga[index]])} />
                                <label className="btn-apisport-parent btn-apisport" style={jamTerisi.indexOf(data) === -1 ? ({}) : ({ backgroundColor: 'red', color: 'white' })} htmlFor={`btn-check${index + 9}`}>{data}<br />{rupiah(gabunganHarga[index])}</label><br />
                            </div>
                        </div>
                    ))}
                </>
            )
        } else {
            return (
                <>
                    {gabunganJadwalAditya1K.map((data, index) => (
                        <div className='col-6 col-lg-3 mb-2' style={{
                            fontWeight: 500,
                        }}>
                            <div>

                                <input type="checkbox" className="btn-check" id={`btn-check${index + 1}`}
                                    autoComplete="off" onChange={(e) => setChange(e, gabunganHarga[index], data)}
                                    name='jadwal'

                                    disabled={jamTerisi.indexOf(data) === -1 ? (false) : (true)}
                                    value={JSON.stringify([`${data}`, gabunganHarga[index]])} />
                                <label className="btn-apisport-parent btn-apisport" style={jamTerisi.indexOf(data) === -1 ? ({}) : ({ backgroundColor: 'red', color: 'white' })} htmlFor={`btn-check${index + 1}`}>{data}<br />{rupiah(gabunganHarga[index])}</label><br />
                            </div>
                        </div>
                    ))}
                    {gabunganJadwalAditya2K.map((data, index) => (
                        <div className='col-6 col-lg-3 mb-2' style={{
                            fontWeight: 500,
                        }}>
                            <div>

                                <input type="checkbox" className="btn-check" 
                                    autoComplete="off"
                                    name='jadwal'
                                    disabled={true}
                                    value={JSON.stringify([`${data}`, gabunganHarga[index]])} />
                                <label className="btn-apisport-parent btn-apisport" style={{ backgroundColor: 'red', color: 'white' }} >{data}<br />{rupiah(gabunganHarga[index])}</label><br />
                            </div>
                        </div>
                    ))}
                    {gabunganJadwalAditya3K.map((data, index) => (
                        <div className='col-6 col-lg-3 mb-2' style={{
                            fontWeight: 500,
                        }}>
                            <div>

                                <input type="checkbox" className="btn-check" id={`btn-check${index + 6}`}
                                    autoComplete="off" onChange={(e) => setChange(e, gabunganHarga[index], data)}
                                    name='jadwal'

                                    disabled={jamTerisi.indexOf(data) === -1 ? (false) : (true)}
                                    value={JSON.stringify([`${data}`, gabunganHarga[index]])} />
                                <label className="btn-apisport-parent btn-apisport" style={jamTerisi.indexOf(data) === -1 ? ({}) : ({ backgroundColor: 'red', color: 'white' })} htmlFor={`btn-check${index + 6}`}>{data}<br />{rupiah(gabunganHarga[index])}</label><br />
                            </div>
                        </div>
                    ))}
                </>
            )
        }

    } else {
        return (
            <>
                {gabunganJadwal.map((data, index) => (

                    <div className='col-6 col-lg-3 mb-2' style={{
                        fontWeight: 500,
                    }}>
                        <div>

                            <input type="checkbox" className="btn-check" id={`btn-check${index + 1}`}
                                autoComplete="off" onChange={(e) => setChange(e, gabunganHarga[index], data)}
                                name='jadwal'

                                disabled={jamTerisi.indexOf(data) === -1 ? (false) : (true)}
                                value={JSON.stringify([`${data}`, gabunganHarga[index]])} />
                            <label className="btn-apisport-parent btn-apisport" style={jamTerisi.indexOf(data) === -1 ? ({}) : ({ backgroundColor: 'red', color: 'white' })} htmlFor={`btn-check${index + 1}`}>{data}<br />{rupiah(gabunganHarga[index])}</label><br />
                        </div>
                    </div>
                ))}
            </>
        )
    }

}
export default JadwalComponent