import React from 'react'
import { useState } from 'react';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react'
import useSWR from 'swr';

const CardKomentar = () => {
    
    const [nama, setNama] = useState('');
    const [komentar, setKomentar] = useState('');
    const { data: session } = useSession()


    const fetcher = (...args) => fetch(...args).then((res) => res.json())
    let url = '/api/komentardb'
    const { data: data, error } = useSWR(url, fetcher)

    if (!data) {
        return <div>Access denied</div>
    } else if (error) {
        return <div>Something went wrong</div>
    }




    let router = useRouter()


    const handlePost = async (e) => {
        e.preventDefault();
        setNama(session.user.name)
        // reset error and message
        // fields check
        if (!nama || !komentar) {
            alert('Harap untuk mengisi semua data');
        }
        let user = {
            nama,
            komentar,
         
        };
        let response = await fetch('/api/komentardb', {
            method: 'POST',
            body: JSON.stringify(user),
        });
        let data = await response.json();
        if (data.success) {
            router.push('/')
            setKomentar('')

            // set the message
        }

    };



    return (
        <>
            <form onSubmit={handlePost}>
                {session &&
                    <div className='card justify-content-center'>
                        <div className='row col-md-12 p-3'>
                            <div className=' col-md-8 '>
                                <label className='d-flex flex-row justify-content-left '>Nama</label>
                                <input type="text"
                                    value={session.user.name}
                                    className="form-control "
                                    readOnly
                                />
                            </div>
                            <div className=' col-md-8 col-12 mt-3' >
                                <label className='d-flex flex-row justify-content-left '>Saran/Kritk/Masukan/Ulasan</label>
                                <textarea class="form-control"
                                    id="exampleFormControlTextarea1"
                                    rows="2"
                                    value={komentar}
                                    onChange={(e) => setKomentar(e.target.value)}
                                >
                                </textarea>

                            </div>
                            <div className=' col-md-4 col-12 p-2 my-3' >
                                <button className='btn btn-primary' type='submit'>KIRIM</button>
                            </div>
                        </div>
                    </div>
                }
            </form>
        </>

    )
}
export default CardKomentar

