import React from 'react'

const CardTestimonial = () => {
    return (
        <div>
            {/* Carousel wrapper */}
            <div id="carouselExampleControls" className="carousel slide text-center carousel-dark" data-bs-slide="carousel">
                <div className="carousel-inner">
                   <div className="carousel-item active">
                        <img className="rounded-circle shadow-1-strong mb-4" src="/y.png" alt="avatar" style={{ width: 150 }} />
                        <div className="row d-flex justify-content-center">
                            <div className="col-lg-8">
                                <h5 className="mb-3"><b>yosi mugni</b></h5>
                                <p></p>
                                <p className="text-muted">
                                    <i className="fas fa-quote-left pe-2" />
                                    Website ini dibuat untuk memudahkan untuk menyewa lapangan secara online
                                    <i className="fas fa-quote-left pe-2" />
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
                <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="prev">
                    <span className="carousel-control-prev-icon" aria-hidden="true" />
                    <span className="visually-hidden">Previous</span>
                </button>
                <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="next">
                    <span className="carousel-control-next-icon" aria-hidden="true" />
                    <span className="visually-hidden">Next</span>
                </button>
            </div>
            {/* Carousel wrapper */}

        </div>

    )
}
export default CardTestimonial
