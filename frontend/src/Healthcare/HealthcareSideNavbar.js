import React, { useState } from "react";
import { Menu } from "antd";
import { useLocation, useNavigate } from "react-router-dom";
import prisonlogo from "../img/PMSlogo.jpeg"
import { Link } from "react-router-dom";
import logout from "../img/logout2.png"
import back from "../img/back.png"

function HealthcareSideNavbar({ userName, profilePicture }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [inmatesColor, setInmatesColor] = useState("#000000"); 

  const handleMenuClick = (key) => {
    navigate(key);
    if (key.startsWith("/healthcareDashboard")) {
      setInmatesColor("#ffffff"); 
   } 
    if (key.startsWith("/currentAppointments")) {
        setInmatesColor("#ffffff"); 
    } 
    else if (key.startsWith("/approvedAppointments")) { 
        setInmatesColor("#ffffff"); 
    } 
    else if (key.startsWith("/healthRecords")) {  
        setInmatesColor("#ffffff");
    } else {
        setInmatesColor("#000000");
    }
  };

  return (
    <div className="sidebar" style={{ backgroundColor:"#3C78AA",marginLeft:"0px" }}> 
        <div className="dashboard-header mb-45 mt-2 d-flex justify-content-center align-items-center">
            <img className="img-fluid rounded-circle" width="130" height="130" style={{color:"#044D81",marginBottom:"20px"}}  src={prisonlogo} alt="Prison Department Logo"/>
          </div>
          <hr className="divider" style={{marginBottom:"25px"}}  />
          <Menu mode="vertical" onClick={({ key }) => handleMenuClick(key)} selectedKeys={[location.pathname]} style={{ backgroundColor: "#3C78AA",fontSize:'18px' }}>
            <Menu.Item key="/healthcareDashboard" className='menuItem' style={{color:"wheat"}}>Healthcare Dashboard</Menu.Item>
            <Menu.Item key="/currentAppointments" className='menuItem'style={{color:"wheat"}}>Current Appointments</Menu.Item>
            <Menu.Item key="/approvedAppointments" className='menuItem' style={{color:"wheat"}}>Approved Appointments</Menu.Item>
            <Menu.Item key="/healthRecords" className='menuItem' style={{color:"wheat"}}>Health Records</Menu.Item>
            
            
          </Menu>
    
          <div className="" style={{ width: "90%",marginTop:"240px",marginLeft:"20px",color:"whitesmoke" }}>
                      <div className="mt-auto d-flex align-items-center justify-content-between w-100">
                          <Link to="/Admindashbord"><img src={back} color="white" width="25px" height="25px" /></Link>
                          <Link to="/"><img src={logout} color="white" width="30px" height="30px" /></Link>
    
                      </div>
                  </div>
        </div>
  );
}

export default HealthcareSideNavbar;




