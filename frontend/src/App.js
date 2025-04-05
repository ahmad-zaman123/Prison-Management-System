import { Routes,Route } from "react-router-dom";

import Public from "./Home/Home";
import About_Home from "./Home/About_Home";
import Services_Home from "./Home/Services_Home";
import Contact_Home from "./Home/Contact_Home";

import Staff from "./Staff/StaffDashboard";

import JailorList from "./Staff/Staff Components/JailorList";
import DoctorList from "./Staff/Staff Components/DoctorList";
import UpdateJailor from "./Staff/Forms/UpdateJailor";

import CurrentInmates from "./Inmate/Components/CurrentInmates";
import ReleasedInmates from "./Inmate/Components/ReleasedInmates";
import WantedInmates from "./Inmate/Components/WantedInmates";
import Dashboard from "./Inmate/InmateDashboard";
import AddCurrentInmate from "./Inmate/Forms/AddCurrentInmate";
import AddCurrentAdmission from "./Inmate/Forms/AddCurrentAdmission";

import HealthcareDashboard from "./Healthcare/HealthcareDashboard";
import CurrentAppointments from "./Healthcare/Components/CurrentAppointments";
import ApprovedAppointments from "./Healthcare/Components/ApprovedAppointments";
import AllHealthRecords from "./Healthcare/Components/AllHealthRecords";


import AdminDashboard from './Admin/adminDashbord'


import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import VisitorDashboard from './visitor/VisitorDashboard';
import AllVisitors from './visitor/Components/AllVisitors';
import AllVisits from './visitor/Components/TrackingDetails'


import Login from "./Authentication/Login"

function App() {
  return (
    <div>
      
      <ToastContainer />
    
    <Routes>


        {/* home page */}
        <Route index element={<Public/>}/>
        <Route path="/about" element={<About_Home />} />
        <Route path="/services" element={<Services_Home />} />
        <Route path="/contact" element={<Contact_Home />} />

        {/* login page */}
        <Route path="login" element={<Login />}/>
        
        {/* admin page */}
        <Route path="Admindashbord" element={<AdminDashboard/>}/>

        {/* staff management */}
        <Route path="staff" element={<Staff/>}/>
       <Route path="JailorList" element={<JailorList/>}/>
       <Route path="DoctorList" element={<DoctorList/>}/>
        <Route path="/JailorList/:id" element={<UpdateJailor />} />

        
        {/* inmate management */}
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="current" element={<CurrentInmates/>} />
        <Route path="/released" element={<ReleasedInmates />} />
        <Route path="/wanted" element={<WantedInmates />} />
        <Route path="/addCurrent" element={<AddCurrentInmate />} />
        <Route path="/addCurrentAdmission" element={<AddCurrentAdmission />} />

        {/* healthcare management */}
        <Route path="/healthcareDashboard" element={<HealthcareDashboard />} />
        <Route path="/currentAppointments" element={<CurrentAppointments />} />
        <Route path="/approvedAppointments" element={<ApprovedAppointments />} />
        <Route path="/healthRecords" element={<AllHealthRecords />} />

          {/* visitor management */}
          <Route path="/visitorDashboard" element={<VisitorDashboard />} />
          <Route path="/allVisitors" element={<AllVisitors />} />
          <Route path="/allVisits" element={<AllVisits />} />
          

    </Routes>
    </div>
  );
}

export default App;