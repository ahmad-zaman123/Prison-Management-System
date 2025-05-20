import React, { useState } from "react";
import { Link } from 'react-router-dom';
import './CssFiles/VisitorSidebar.css';
import { useLocation, useNavigate } from "react-router-dom";
import prisonlogo from "../img/PMSlogo.jpeg"
import logout from "../img/logout2.png"
import back from "../img/back.png"
import { Menu } from "antd";


const Sidebar = () => {

  const navigate = useNavigate();
    const location = useLocation();

    const [inmatesColor, setInmatesColor] = useState("#000000"); 

  const handleMenuClick = (key) => {
    navigate(key);
    if (key.startsWith("/visitorDashboard")) {
      setInmatesColor("#ffffff"); 
   } 
    if (key.startsWith("/allVisitors")) {
        setInmatesColor("#ffffff"); 
    } 
    else if (key.startsWith("/allVisits")) { 
        setInmatesColor("#ffffff"); 
    } 
     else {
        setInmatesColor("#000000");
    }
  };

  return (
    <div className="sidebar" style={{ backgroundColor:"#3C78AA",marginLeft:"0px" }}> 
        <div className="dashboard-header mb-45 mt-2 d-flex justify-content-center align-items-center">
            <img className="img-fluid rounded-circle" width="130" height="130" style={{color:"#044D81",marginBottom:"20px"}}  src={prisonlogo} alt="Prison Department Logo"/>
          </div>
          <hr className="divider" style={{marginBottom:"25px"}}  />
          <Menu mode="vertical"  onClick={({ key }) => handleMenuClick(key)} selectedKeys={[location.pathname]} style={{ backgroundColor: "#3C78AA",fontSize:'18px' }}>
            <Menu.Item key="/visitorDashboard" className='menuItem' style={{color:"wheat"}}>Visitor Dashboard</Menu.Item>
            <Menu.Item key="/allVisitors" className='menuItem'style={{color:"wheat"}}>All Visitor Details</Menu.Item>
            <Menu.Item key="/allVisits" className='menuItem' style={{color:"wheat"}}>Tracking Time</Menu.Item>

            
            
          </Menu>
    
          <div className="" style={{ width: "90%",marginTop:"290px",marginLeft:"20px",color:"whitesmoke" }}>
                      <div className="mt-auto d-flex align-items-center justify-content-between w-100">
                          <Link to="/Admindashbord"><img src={back} color="white" width="25px" height="25px" /></Link>
                          <Link to="/"><img src={logout} color="white" width="30px" height="30px" /></Link>
    
                      </div>
                  </div>
        </div>
  )
}

export default Sidebar
