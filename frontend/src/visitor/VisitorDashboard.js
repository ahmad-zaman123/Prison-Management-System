import React from 'react'
import Sidebar from './Sidebar'
import { Link } from 'react-router-dom';
import Summary from './Summary';
import './CssFiles/TopBar.css';

const VisitorDashboard = () => {
  return (
    
        <div style={{display: "flex", width:"100%" }}>
          <div style={{width:'20%'}}>
            <Sidebar/>
          </div>
            <div style={{width:'80%'}} >     
            
                <div className="visitor-header-box " style={{ width: "90%" }} >
                    <h2 className="visitor-heading">Visitor Management Dashboard</h2>
                </div>
            
            <div className='content-container'>

                <div className='button-container'>
                    <Link to='/allVisitors'><button className='custom-button'>All Visitors</button></Link>
                    <Link to='/allVisits'><button className='custom-button'>Tracking Time</button></Link>
                </div>
                <div>
                    <Summary />
                </div>
            </div>
        </div>
            
        </div>
    
  )
}

export default VisitorDashboard