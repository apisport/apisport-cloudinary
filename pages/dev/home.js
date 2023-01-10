import { Router } from "next/router"

export default function Homedev() {
  return (
    <div>
      <div className='row mt-3 d-flex justify-content-center' style={{ color: "black" }}>
        <h5 className='d-flex justify-content-between'><b>Lokasi</b></h5>
        <div className='row flex-row col-12 col-md-12'>
<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d7897.795267222759!2d114.34528305390624!3d-8.213048999999993!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2dd1450173af3333%3A0xfdcddcb867d1d4cd!2sGOR%20ABC%20BADMINTON!5e0!3m2!1sen!2sid!4v1673331174477!5m2!1sen!2sid" style={{border: 0}} allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
        </div>
      </div>
      <div>

      <main>
        <section className="py-2 text-center container">
          <div className="row py-lg-2">
            <div className="col-lg-6 col-md-8 mx-auto">
              <img src='../y.png' className="bd-placeholder-img img-fluid " role="img" aria-label="Placeholder: 140x140" />

              <h1 className="fw-light">API SPORT DEV</h1>
            </div>
          </div>
        </section>
        <div className="py-3 bg-light">
          <div className="container-xxl">
            <div className="row row-cols-2 row-cols-md-4">
              <div className="col-md-4 col-12">
                <div className="card shadow-sm ">
                  <div className="card-body">
                    <h2>DATA USER</h2>
                    <div className="d-flex justify-content-center align-items-center">
                      <div className="text-center">
                        <a href="/dev/user-dev" className="btn btn-primary btn-lg mt-3">View</a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-4 col-12">
                <div className="card shadow-sm">
                  <div className="card-body">
                    <h2>DATA MITRA</h2>
                    <div className="d-flex justify-content-center align-items-center">
                      <div className="btn-group text-center">
                        <a href="/dev/mitra-dev" className="btn btn-primary btn-lg mt-3 ">View</a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-4 col-12">
                <div className="card shadow-sm">
                  <div className="card-body">
                    <h2>MITRA PENDING</h2>
                    <div className="d-flex justify-content-center align-items-center">
                      <div className="btn-group text-center">
                        <a href="/dev/mitra-pending" className="btn btn-primary btn-lg mt-3 ">View</a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-4 col-12">
                <div className="card shadow-sm">
                  <div className="card-body">
                    <h2>DATA TRANSAKSI</h2>
                    <div className="d-flex justify-content-center align-items-center">
                      <div className="btn-group text-center">
                        <a href="/dev/transaksi-dev" className="btn btn-primary btn-lg mt-3 ">View</a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-4 mt-3 col-12">
                <div className="card shadow-sm">
                  <div className="card-body">
                    <h2>FAVORIT</h2>
                    <div className="d-flex justify-content-center align-items-center">
                      <div className="btn-group text-center">
                        <a href="/dev/favorit" className="btn btn-primary btn-lg mt-3 ">View</a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-4 mt-3 col-12">
                <div className="card shadow-sm">
                  <div className="card-body">
                    <h2>DATA SERVICE FEE</h2>
                    <div className="d-flex justify-content-center align-items-center">
                      <div className="btn-group text-center">
                        <a href="/dev/data-fee" className="btn btn-primary btn-lg mt-3 ">View</a>
                      </div>
                    </div>
                  </div>
                </div>
                
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
    </div>
  )
}