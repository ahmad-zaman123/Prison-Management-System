import React, { useState } from "react";
import { Menu } from 'antd';
import { useLocation, useNavigate } from "react-router-dom";
import prisonlogo from '../img/PMSlogo.jpeg';
import "./adminNavbar.css"
import { Link } from "react-router-dom";
import logout from "../img/logout2.png"

function AdminNavbar() {

  const navigate = useNavigate();
  const location = useLocation();
  const [staffColor, setStaffColor] = useState("#000000");

  const handleMenuClick = (key) => {
    navigate(key);
    if (key.startsWith("/Admindashbord")) {
      setStaffColor("#ffffff");
    }
    else if (key.startsWith("/staff")) {
      setStaffColor("#ffffff");
    }
    else if (key.startsWith("/dashboard")) {
      setStaffColor("#ffffff");
    }
    else if (key.startsWith("/visitorDashboard")) {
      setStaffColor("#ffffff");
    }
    else if (key.startsWith("/healthcareDashboard")) {
      setStaffColor("#ffffff");
    } else {
      setStaffColor("#000000");
    }
  };

  return (
    
      <div className="sidebar" style={{ backgroundColor:"#3C78AA" }}> 
      <div className="dashboard-header mb-45 mt-2 d-flex justify-content-center align-items-center">
          <img className="img-fluid rounded-circle" width="130" height="130" style={{color:"#044D81",marginBottom:"20px"}}  src={prisonlogo} alt="Prison Department Logo"/>
        </div>
        <hr className="divider" style={{marginBottom:"25px"}}  />
        <Menu mode="vertical" onClick={({ key }) => handleMenuClick(key)} selectedKeys={[location.pathname]} style={{ backgroundColor: "#3C78AA",fontSize:'18px' }}>
          <Menu.Item key="/Admindashbord" className='menuItem' style={{color:"wheat"}}>Home</Menu.Item>
          <Menu.Item key="/staff" className='menuItem'style={{color:"wheat"}}>Staff Management</Menu.Item>
          <Menu.Item key="/dashboard" className='menuItem' style={{color:"wheat"}}>Inmate Management</Menu.Item>
          <Menu.Item key="/visitorDashboard" className='menuItem' style={{color:"wheat"}}>Visitor Management</Menu.Item>
          <Menu.Item key="/healthcareDashboard" className='menuItem' style={{color:"wheat"}}>Healthcare Management</Menu.Item>
          
        </Menu>

        <div className="" style={{ width: "90%",marginTop:"200px",marginLeft:"20px",color:"whitesmoke" }}>
                    <div className="mt-auto d-flex align-items-center justify-content-between w-100">
                        <span style={{fontSize:"18px"}}>Admin</span>
                        <Link to="/"><img src={logout} color="white" width="30px" height="30px" /></Link>

                    </div>
                </div>
      </div>
    
  );
}

export default AdminNavbar;
