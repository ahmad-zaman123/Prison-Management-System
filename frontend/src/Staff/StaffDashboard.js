import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import StaffMenuBar from '../Staff/StaffMenuBar';
import './StaffDashboard.css';
import {Chart as ChartJS} from 'chart.js/auto'
import { Bar, Doughnut } from 'react-chartjs-2';
import axios from 'axios';

const Staff = () => {
  const [jailors, setJailors] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const jailorResponse = await axios.get('http://localhost:3500/Jailors');
      setJailors(jailorResponse.data);
    } catch (err) {
      console.error('Error Fetching Jailors:', err.message);
    }
  };

  const countByGender = (gender) => {
    return jailors.filter((jailor) => jailor.Gender === gender).length;
  };
  const genderData= {
    labels: ['Male', 'Female'],
    datasets: [
      {
        label: 'Jailor by Gender',
        data: [countByGender('male'), countByGender('female')],
        backgroundColor: ['#89CFF0', '#FF6384'],
        hoverBackgroundColor: ['#89CFF0', '#FF6384'],
      },
    ],
  };


  const countByJobTitle = (jobTitle)=>{
    return jailors.filter((jailor)=>jailor.jobTitle == jobTitle).length;
  }
  const jobTitleData = {
    labels: ['CorrectionalOfficer', 'CorrectionalDeputy', 'DetentionOfficer', 'CorrectionalCounselor', 'CorrectionalSergeant', 'CorrectionalLieutenant', 'CorrectionalCaptain', 'CorrectionalAdministrator', 'CorrectionalSupervisor'],
    datasets: [
      {
        label: 'Jailor by JobTitle',
        data: [
          countByJobTitle('CorrectionalOfficer'),
          countByJobTitle('CorrectionalDeputy'),
          countByJobTitle('DetentionOfficer'),
          countByJobTitle('CorrectionalCounselor'),
          countByJobTitle('CorrectionalSergeant'),
          countByJobTitle('CorrectionalLieutenant'),
          countByJobTitle('CorrectionalCaptain'),
          countByJobTitle('CorrectionalAdministrator'),
          countByJobTitle('CorrectionalSupervisor')
        ],
        backgroundColor: [
          '#89CFF0',
          '#FF6384',
          '#36A2EB',
          '#FFCE56',
          '#FFA07A',
          '#20B2AA',
          '#9370DB',
          '#ADFF2F',
          '#BA55D3'
        ],
        hoverBackgroundColor: [
          '#89CFF0',
          '#FF6384',
          '#36A2EB',
          '#FFCE56',
          '#FFA07A',
          '#20B2AA',
          '#9370DB',
          '#ADFF2F',
          '#BA55D3'
        ],
      },
    ],
  };
  
  return (
    <div>
      <StaffMenuBar />

      <div className="staff-header-box">
  <h2 className="staff-heading">Staff Management Dashboard</h2>
</div>
      <div className='staff-main'>
        <div className='staff-main-function'>
          <Link to='/JailorList' className='nav-link'>
            Jailor Staff
          </Link>
        </div>
        <div className='staff-main-function'>
          <Link to='/DoctorList' className='nav-link'>
            Doctor Staff
          </Link>
        </div>
        
      </div>
      <div className='Jailor-chart-set'>
        <div className='jailor-Card'>
          <Bar style={{height:'400px',marginTop:'20px'}} data={genderData}/>
        </div>

        <div className='jailor-Card2'>
          <Doughnut style={{marginLeft:'20px'}} data={jobTitleData}/>
        </div>
      </div>
    </div>
  );
};

export default Staff;
