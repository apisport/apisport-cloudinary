//@ts-check
import { useSession, signIn } from 'next-auth/react'
import { useState } from 'react';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { now } from 'moment';

export default function EditProfil() {
  //Req.Query
  let router = useRouter()
  const {
    nama,
    noWa,
    timStringify,
    emailReq,
    objectId,
    username,
    imageUser
  } = router.query

  //State of Art
  const [_nama, setNama] = useState('');
  const [_noWa, setNoWa] = useState('');
  const [_tim, setTim] = useState([]);
  const [timTemp, setTimTemp] = useState('');

  //Set All
  useEffect(() => {
    if (typeof nama == 'string') {
      setNama(nama)

    }
    if (typeof noWa == 'string') {
      setNoWa(noWa)
    }
    if (typeof timStringify == 'string') {
      setTim(Object.assign(_tim, JSON.parse(timStringify)))
    }
  }, [nama,
    noWa,
    timStringify,
    emailReq,
    objectId])

  const onAddItemArray = () => {
    setTim(_tim => [..._tim, timTemp]);
    setTimTemp('')
    console.log(_tim)

  };

  const removeItemArray = (data) => {
    var index = _tim.indexOf(data)
    if (index >= 0) {
      if (_tim.length === 0) {
        setTim([])
      } else {
        setTim(_tim => [..._tim.slice(0, index), ..._tim.slice(index + 1)])
      }
    }
  };
  //UPDATE
  const handlePost = async (e) => {
    e.preventDefault();
    // fields check
    try {
      // Update post
      await fetch('/api/profildb', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          nama: _nama,
          noWa: _noWa,
          tim: _tim,
          objectId: objectId,
        }),
      });
      // reload the page
      alert('Profil sukses diupdate')
      router.push('/');
    } catch (error) {
      // Stop publishing state
      console.log('Not Working')
    }
  };

  return (
    <div className="limiter">
      <div className="container-login100" style={{ backgroundImage: 'url("/bg-01.jpg")' }}>
        <div className="wrap-login100 p-3">
          <form className="login100-form validate-form" onSubmit={handlePost} >
            <div className="text-center">
              <img className='img-fluid d-blok p-5' src="/y.png" />
            </div>
            <span className="login100-form-title p-b-12">
              EDIT PROFIL
            </span>
            <div className="p-3 py-2">
              <div className="row mt-2">
                <div className="mt-2 col-md-12">
                  <label className="labels">Nama Lengkap</label><i style={{ color: '#ff0000', fontSize: 'larger' }}>*</i>
                  <input type="text" className="form-control"
                    required
                    id='nama'
                    value={_nama}
                    onChange={(e) => setNama(e.target.value)}
                  />
                </div>
                <div className="mt-2 col-md-12"><label className="labels">No . WhatsApp</label><i style={{ color: '#ff0000', fontSize: 'larger' }}>*</i>
                  <input type="text" className="form-control" required
                    name="noWa"
                    onChange={(e) => setNoWa(e.target.value)}
                    value={_noWa}
                  />
                </div>
                {/* <div className="mt-2 col-md-12"><label className="labels">Username</label><i style={{ color: '#ff0000', fontSize: 'larger' }}>*</i>
                                        <input type="text" className="form-control" required
                                            value={session.user.name}
                                        />
                                    </div> */}
                <div className="mt-2 col-md-12"><label className="labels">Email</label><i style={{ color: '#ff0000', fontSize: 'larger' }}>*</i>
                  <input type="text" className="form-control" required
                    name="email"
                    id='email'
                    value={emailReq}
                    readOnly
                  />
                </div>
                <div className="mt-2 col-md-12"><label className="labels">Username</label><i style={{ color: '#ff0000', fontSize: 'larger' }}>*</i>
                  <input type="text" className="form-control" required
                    name="email"
                    id='email'
                    value={username}
                    readOnly
                  />
                </div>
                <div className="mt-2 col-md-12">
                  <label className="labels">Tambah Tim</label>
                </div>
                <div className="btn-group col-md-12">
                  <input type="text" className="form-control col-10 mt-2 col-md-10"
                    id="tim"
                    name="tim"
                    value={timTemp}
                    onChange={(e) => setTimTemp(e.target.value)}
                  />
                  <button className="form-control col-2 mt-2 col-sm-2" type='button'
                    onClick={onAddItemArray}><i className="fa fa-plus"></i></button>
                </div>
                <div className="mt-3 col-md-12"><label className="labels">Daftar Tim</label>
                </div>
                <div>
                  {_tim.length === 0 ? (
                    <h2>Isi Daftar Tim</h2>
                  ) : (
                    <>

                      {_tim.map((data, i) => (
                        <div className="btn-group col-md-12">
                          <input type="text" id={i} className="form-control col-10 mt-2 col-md-10" value={data} readOnly />
                          <button className="form-control col-2 mt-2 col-sm-2" type='button'
                            onClick={() => removeItemArray(data)}
                          >
                            <i className="fa fa-trash"></i></button>
                        </div>
                      ))}
                    </>
                  )}

                </div>

                <div className="mt-2 col-md-12"><label className="labels" htmlFor="formFile">Foto Profil</label>
                  <img className='img-fluid d-block  rounded-circle' id='image' src={imageUser} />

                </div>
                <div className="mt-2 d-flex flex-row justify-content-center">

                </div>

              </div>
              <div class="row mt-3 container-login100-form-btn my-3">
                <button type="submit"
                  className="btn btn-outline-secondary" style={{ backgroundColor: '#006E61', color: 'rgb(255, 255, 255)', borderRadius: '5cm', width: 500, height: 50 }}>
                  SIMPAN PROFIL
                </button>
              </div>


            </div>
          </form>
        </div>
      </div>

    </div>
  )

}