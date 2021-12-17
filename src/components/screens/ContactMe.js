import React, { Component } from 'react'

const ContactMe = () => {
    return (
    
            <div className="container-1" style={{marginTop:"190px"}}>

                <img id="contactimg" src="https://res.cloudinary.com/dqffc0h5e/image/upload/v1639700829/monti%20fvg/1607799123445_fj4clc.jpg"  width="180" height="180" alt="contactlogo"/>
                <h3 style={{fontFamily:"Libre Baskerville"}}>Emanuele Furlani</h3>
                        <div className="divIno"> 
                            <ul className="rul">
                                <li><a href="https://www.instagram.com/lelego85/">Instagram</a></li>
                                <li><a href="https://mail.google.com/mail/?view=cm&fs=1&to=emanuelefurlani.go@gmail.com">Gmail</a></li>
                                <li><a href="https://www.facebook.com/lelego85">Facebook</a></li>
                                <li><a href="https://www.linkedin.com/in/emanuele-furlani-030551157/">LinkedIn</a></li>
                                <li><a href="https://github.com/EmanueleFurlani">Github</a></li>
                                <li>
                                    <p style={{margin: "0"}}>👋</p>
                                </li>
                            </ul>
                        </div>

            </div>
        )
}

export default ContactMe
