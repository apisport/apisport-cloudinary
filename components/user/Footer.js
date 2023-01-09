import React from 'react'

const Footer = () => {
    return (
        <>
            <div className="footer-2-1 container-xxl mx-auto position-relative p-0" style={{ fontFamily: '"Poppins", sans-serif' }}>
                <div className="border-color info-footer">
                    <div className>
                        <hr className="hr" />
                    </div>
                    <div className="mx-auto d-flex flex-column flex-lg-row align-items-center footer-info-space gap-4">
                        <div className="d-flex title-font font-medium align-items-center gap-4">
                            <a href='https://instagram.com/api.sport?igshid=YmMyMTA2M2Y='>
                                <h3> <icon className='fa fa-instagram' style={{ color: "orange" }} /></h3>
                            </a>
                            <a href='https://wa.me/6281235105364'>
                                <h3> <icon className='fa fa-whatsapp' style={{ color: "orange" }} /></h3>
                            </a>
                            <a href='https://www.facebook.com/profile.php?id=100085184779529'>
                                <h3> <icon className='fa fa-facebook ' style={{ color: "orange" }} /></h3>
                            </a>
                            <a href='https://www.youtube.com/channel/UCsvGU4kka3NkjdRYUUixDtg'>
                                <h3> <icon className='fa fa-youtube-play ' style={{ color: "orange" }} /></h3>
                            </a>
                        </div>
                        <nav className="d-flex flex-lg-row flex-column align-items-center justify-content-center">
                            <p style={{ margin: 0 }}>Copyright © 2021 API SPORTS Team</p>
                        </nav>
                    </div>
                </div>
            </div>

        </>
    )
}
export default Footer
