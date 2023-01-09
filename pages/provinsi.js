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
        document.getElementById('inDesa').value = ''
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
        document.getElementById('inDesa').value = ''
        kabupaten = document.getElementById('inKabupaten').value
        if (kabupaten != '') {
            let idRegency = alamat.regencies.find(x => x.name === kabupaten)
            let tesKecamatan = alamat.districts.filter(x => x.regency_id === idRegency.id)
            setKecamatanArrayTemp(tesKecamatan)
        }
    };

    const setDesaFunc = (e) => {
        setDesaArrayTemp([])
        document.getElementById('inDesa').value = ''
        kecamatan = document.getElementById('inKecamatan').value
        if (kecamatan != '') {
            let idDistrict = alamat.districts.find(x => x.name === kecamatan)
            console.log(idDistrict.id)
            let tesDesa = alamat.villages.filter(x => x.district_id === idDistrict.id)
            setDesaArrayTemp(tesDesa)
        }
    };


    return (
        <div className='col-md-12'>
            <label className="labels">Provinsi</label>
            <select className="form-control form-select" id='inProvinsi' onChange={setKabupatenFunc}>
                <option value={''}>--- Pilih Provinsi ---</option>
                {alamat.provinces.map((data, i) => (

                    <>
                        <option value={data.name}>{data.name}</option>
                    </>
                ))}
            </select><br></br>
            <label className="labels">Kabupaten</label>
            <select id='inKabupaten' className="form-control form-select" onChange={setKecamatanFunc}>
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
            <br></br>
            <label className="labels">Kecamatan</label>
            <select id='inKecamatan' className="form-control form-select" onChange={setDesaFunc}>
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
            </select><br></br>
            <label className="labels">Desa</label>
            <select id='inDesa' className="form-control form-select" >
                <option value={''}>--- Pilih Desa ---</option>
                {desaArrayTemp.length === 0 ? (
                    <></>
                ) : (
                    <>

                        {desaArrayTemp.map((data, i) => (

                            <>
                                <option value={data.name}>{data.name}</option>
                            </>
                        ))}
                    </>
                )}
            </select>
        </div>
    )
}