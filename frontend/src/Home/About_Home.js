import React from 'react'
import { Navbar, Container, Nav, Row, Col } from 'react-bootstrap';
import prisonlogo from '../img/PMSlogo.jpeg';

function About_Home() {
    return (
        <>
            <div className='logo-section' style={{ paddingLeft: "150px" }}>
        <img src={prisonlogo} alt="Prisons Department Logo" className='logo-img' />
        <div className="" style={{ color: "#044D81", padding: "80px" }}><h1 className="text-3xl  " style={{ fontWeight: "600" }}> PRISON MANAGEMENT SYSTEM</h1></div>
      </div>
      


        <Navbar style={{ backgroundColor: "#044D81" ,height:"50px"}} data-bs-theme="dark">
          <Container>
            <Navbar.Brand style={{fontWeight:"bold",marginRight:"40px",fontSize:"22px"}} href="/">PMS</Navbar.Brand>
            <Nav className="me-auto">
              <Nav.Link href="/login" style={{fontWeight:"bold",marginRight:"15px",fontSize:"18px"}}>Login</Nav.Link>
              <Nav.Link href="/about" style={{fontWeight:"bold",marginRight:"15px",fontSize:"18px"}}>About</Nav.Link>
              <Nav.Link href="/services" style={{fontWeight:"bold",marginRight:"15px",fontSize:"18px"}}>Services</Nav.Link>
              <Nav.Link href="/contact" style={{fontWeight:"bold",marginRight:"15px",fontSize:"18px"}}>Contact</Nav.Link>
            </Nav>
          </Container>
        </Navbar>
      

            <br /><br />

            {/* FOOTER */}
            <Container fluid className="py-4">

                <Row className="justify-content-center" >


                    <Col xs={2}></Col>


                    <Col xs={12} md={8} className="text-left">
                        <section>
                            <div class="container mx-auto px-6">
                                <h1 class="text-3xl font-bold text-center mb-20" style={{ color: "#044D81", marginBottom: "50px", fontWeight: "bold" }}>About Us</h1>

                                <div class="">

                                    <div class="bg-white p-6" style={{ paddingBottom: "20px" }}>

                                        <p class="mt-2 text-gray-600">Welcome to the <b> Prison Management System (PMS) </b> an innovative solution designed to modernize and optimize inmate management, facility operations, and security workflows in correctional institutions.

                                            At PMS, we recognize the challenges faced by correctional facilities, including inefficient record-keeping, security vulnerabilities, and outdated manual processes. Our system is designed to revolutionize prison administration by integrating inmate management, staff coordination, healthcare tracking, and visitor management into a single, efficient platform.</p>
                                    </div>


                                    <div class="bg-white p-6" style={{ paddingBottom: "20px" }}>
                                        <h5 class="text-xl font-semibold text-blue-700">Our Mission</h5>
                                        <p class="mt-2 text-gray-600">Our mission is to enhance operational efficiency, ensure data accuracy, and improve the overall management of prison facilities. By leveraging cutting-edge technologies such as React.js, Django, and MySQL, we provide a secure, scalable, and user-friendly system that meets the evolving needs of correctional facilities.</p>
                                    </div>

                                    <div class="bg-white p-6" style={{ paddingBottom: "20px" }}>
                                        <h5 class="text-xl font-semibold text-blue-700">Why Choose PMS?</h5>
                                        <p class="mt-2 text-gray-600">Our mission is to enhance operational efficiency, ensure data accuracy, and improve the overall management of prison facilities. By leveraging cutting-edge technologies such as React.js, Django, and MySQL, we provide a secure, scalable, and user-friendly system that meets the evolving needs of correctional facilities.</p>
                                    </div>

                                    <div class="bg-white p-6" style={{ paddingBottom: "30px" }}>
                                        <h5 class="text-xl font-semibold text-blue-700">Our Team</h5>
                                        <p class="mt-2 text-gray-600">Developed by a team of passionate Computer Science students at the University of the Punjab, Lahore, our project embodies innovation, efficiency, and reliability. Guided by our expert supervisor, we aim to contribute towards a more organized and technology-driven correctional system.</p>
                                    </div>


                                </div>
                            </div>
                        </section>
                    </Col>


                    <Col xs={2}></Col>



                </Row>
            </Container>

            {/* FOOTER */}
            <Container fluid className="py-4" style={{ backgroundColor: "#044D81" }}>
                <br />
                <Row className="justify-content-center" style={{ backgroundColor: "#044D81", paddingTop: "30px", color: "whitesmoke" }}>

                    {/* Empty Column for spacing */}
                    <Col xs={1}></Col>

                    {/* First Column */}
                    <Col xs={12} md={3} className="text-center text-lg">
                        <h4 className="fs-4 font-weight-bold" style={{ fontWeight: "bold" }}>Quick Links</h4><br />
                        <ul className="space-y-2">
                            <li style={{ fontSize: "20px" }}><a style={{ fontSize: "20px" }} href="/login" className="hover:text-white transition">Login</a></li>
                            <li style={{ fontSize: "20px" }}><a href="/about" className="hover:text-white transition">About</a></li>
                            <li style={{ fontSize: "20px" }}><a href="/services" className="hover:text-white transition">Services</a></li>
                            <li style={{ fontSize: "20px" }}><a href="/contact" className="hover:text-white transition">Contact</a></li>
                        </ul>
                    </Col>

                    {/* Second Column */}
                    <Col xs={12} md={4} className="text-center">
                        <h4 className="fs-4 font-weight-bold" style={{ fontWeight: "bold" }}>Contact Us</h4>
                        <br />
                        <p style={{ fontSize: "18px" }}><span className="font-medium">Tel:</span> +92 114 6771777</p>
                        <p style={{ fontSize: "18px" }}><span className="font-medium">Fax:</span> +92 114 6771808</p>
                        <p style={{ fontSize: "18px" }}><span className="font-medium ">E-mail:</span> <a href="mailto:prisons@sltnet.lk" className="hover:text-white transition">prisons@sltnet.lk</a></p>
                        <br />
                    </Col>

                    {/* Fourth Column */}
                    <Col xs={12} md={3} className="text-center">
                        <h4 className="fs-4 font-weight-bold" style={{ fontWeight: "bold" }}>Follow Us</h4>
                        <br />
                        <div>
                            <a href="#" style={{ fontSize: "20px" }} className="hover:text-white transition"><i className="fab fa-facebook-f"></i> Facebook</a><br />
                            <a href="#" style={{ fontSize: "20px" }} className="hover:text-white transition"><i className="fab fa-twitter"></i> Twitter</a><br />
                            <a href="#" style={{ fontSize: "20px" }} className="hover:text-white transition"><i className="fab fa-linkedin"></i> LinkedIn</a>
                        </div>
                        <br />
                    </Col>

                    {/* Empty Column for spacing */}
                    <Col xs={1}></Col>

                    <div className="text-center border-t border-gray-700 mt-3 pt-2">
                        <p className="text-sm">© {new Date().getFullYear()} Prison Management System. All rights reserved.</p>

                    </div>

                </Row>
            </Container>

        </>
    )
}

export default About_Home