// Public.js
import React from 'react';
import { Navbar, Container, Nav } from 'react-bootstrap';
import { Row, Col } from 'react-bootstrap';
import { FaFacebook, FaTwitter,  FaInstagram  } from 'react-icons/fa';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import prisonlogo from '../img/PMSlogo.jpeg';
import history from '../img/History.jpg'
import "./Home.css";

function Public() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <div>
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
      



      <div className='history'>
        <div className='history-img'>
          <img height={"450px"} src={history}></img>
        </div>
        <div className='history-p'>

          <p>The <b>Prison Management System (PMS) </b> is a secure and efficient digital platform designed to streamline prison operations. It enables prison authorities to manage inmate records, track visitors, oversee staff activities, and monitor security measures in real-time. By integrating modern technology, PMS improves the accuracy and transparency of prison administration.</p>

          <p>PMS ensures a structured approach to inmate classification, health monitoring, and legal case management. Automated tracking of prisoner movements and visitor logs enhances security while reducing paperwork and administrative burden. The system also helps in resource allocation, ensuring that facilities operate smoothly.</p>

          <p>Traditionally, prisons relied on manual record-keeping, leading to inefficiencies and security risks. With the advancement of digital technology, electronic Prison Management Systems have been introduced worldwide, improving data accuracy and operational transparency. Today, PMS solutions integrate with biometric systems, surveillance tools, and AI-driven analytics to create a safer and more effective correctional environment.</p>
        </div>
      </div>

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
              <li style={{ fontSize: "20px" }}><a style={{ fontSize: "20px" }} href="/login" className="quicks">Login</a></li>
              <li style={{ fontSize: "20px" }}><a href="/about" className="quicks">About</a></li>
              <li style={{ fontSize: "20px" }}><a href="/services" className="quicks">Services</a></li>
              <li style={{ fontSize: "20px" }}><a href="contact" className="quicks">Contact</a></li>
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
              <a href="#" style={{ fontSize: "20px" }} className="hover:text-white transition"> <FaFacebook style={{color:'white',marginBottom:'10px'}} size={32} /></a><br />
              <a href="#" style={{ fontSize: "20px" }} className="hover:text-white transition">   <FaTwitter  style={{color:'white',marginBottom:'10px'}} size={32} /></a><br />
              <a href="#" style={{ fontSize: "20px" }} className="hover:text-white transition"> <FaInstagram  style={{color:'white',marginBottom:'10px'}} size={32} /></a>
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



    </div>
  );
}

export default Public

