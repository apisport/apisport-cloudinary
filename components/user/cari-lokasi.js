//@ts-check
import { useState } from 'react';
import { useRouter } from 'next/router';
import { useSession, signIn, signOut } from 'next-auth/react'
import useSWR from 'swr';
import Link from 'next/link';


export default function Provinsi() {
    // const [provinsi, setProvinsi] = useState('');
    // const [kabupaten, setKabupaten] = useState('');
    let provinsi = ''
    let kabupaten = ''
    let kecamatan = ''
    let desa = ''

    const [kabupatenArrayTemp, setKabupatenArrayTemp] = useState([]);
    const [kecamatanArrayTemp, setKecamatanArrayTemp] = useState([]);
    const [desaArrayTemp, setDesaArrayTemp] = useState([]);

    const fetcher = (...args) => fetch(...args).then((res) => res.json())
    let url = '/api/alamatdb'
    const { data: data, error } = useSWR(url, fetcher)

    if (!data) {
        return <div>Loading...</div>
    } else if (error) {
        return <div>Something went wrong</div>
    }

    let alamat = data['message']
    console.log(alamat)



    const setKabupatenFunc = (e) => {
        setKabupatenArrayTemp([])
        setKecamatanArrayTemp([])
        document.getElementById('inKabupaten').value = ''
        document.getElementById('inKecamatan').value = ''
        provinsi = document.getElementById('inProvinsi').value
        if (provinsi != '') {
            let idProvinsi = alamat.provinces.find(x => x.name === provinsi)
            console.log(idProvinsi.id)
            let tesKabupaten = alamat.regencies.filter(x => x.province_id === idProvinsi.id)
            setKabupatenArrayTemp(tesKabupaten)
        }

    };

    const setKecamatanFunc = (e) => {
        setKecamatanArrayTemp([])
        setDesaArrayTemp([])
        document.getElementById('inKecamatan').value = ''
        kabupaten = document.getElementById('inKabupaten').value
        if (kabupaten != '') {
            let idRegency = alamat.regencies.find(x => x.name === kabupaten)
            let tesKecamatan = alamat.districts.filter(x => x.regency_id === idRegency.id)
            setKecamatanArrayTemp(tesKecamatan)
        }
    };



    return (
        <div className='row col-md-12'>
            <div className='row col-md-4 p-1'>
            <label className="labels">Provinsi</label>
            <select className="form-control form-select p-2" id='inProvinsi' onChange={setKabupatenFunc}>
                <option value={''}>--- Pilih Provinsi ---</option>
                {alamat.provinces.map((data, i) => (

                    <>
                        <option value={data.name}>{data.name}</option>
                    </>
                ))}
                </select>
            </div>
            <div className='row col-md-4 p-1'>
            <label className="labels">Kabupaten</label>
            <select id='inKabupaten' className="form-control form-select p-2" onChange={setKecamatanFunc}>
                <option value={''}>--- Pilih Kabupaten ---</option>
                {kabupatenArrayTemp.length === 0 ? (
                    <></>
                ) : (
                    <>

                        {kabupatenArrayTemp.map((data, i) => (

                            <>
                                <option value={data.name}>{data.name}</option>
                            </>
                        ))}
                    </>
                )}
                </select>
            </div>
            <div className='row col-md-4 p-1'>
            <label className="labels">Kecamatan</label>
            <select id='inKecamatan' className="form-control form-select p-2">
                <option value={''}>--- Pilih Kecamatan ---</option>
                {kecamatanArrayTemp.length === 0 ? (
                    <></>
                ) : (
                    <>

                        {kecamatanArrayTemp.map((data, i) => (

                            <>
                                <option value={data.name}>{data.name}</option>
                            </>
                        ))}
                    </>
                )}
                </select>
                </div>

        </div>
    )
}