import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import SideNavbar from '../Inmate/SideNavbar';
import { Bar, Pie, Line } from 'react-chartjs-2';
import moment from 'moment';
import axios from 'axios';
import './InmateDashboard.css';

function Dashboard() {
  const [currentInmates, setCurrentInmates] = useState([]);
  const [releasedInmates, setReleasedInmates] = useState([]);
  const [wantedInmates, setWantedInmates] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const currentResponse = await axios.get('http://localhost:3500/inmate/getcurrentinmates');
      setCurrentInmates(currentResponse.data.filter(inmate => inmate.status === 'Current'));

      const releasedResponse = await axios.get('http://localhost:3500/inmate/getreleasedinmates');
      setReleasedInmates(releasedResponse.data.filter(inmate => inmate.status === 'Released'));

      const wantedResponse = await axios.get('http://localhost:3500/inmate/getwantedinmates');
      setWantedInmates(wantedResponse.data.filter(inmate => inmate.status === 'Wanted'));
    } catch (error) {
      console.error('Error fetching inmates:', error);
    }
  };

  const countByGender = (inmates, gender) => {
    return inmates.filter(inmate => inmate.gender === gender).length;
  };

  const countInmatesAddedLast7Days = inmates => {
    const today = moment().endOf('day');
    const data = Array(7).fill(0);

    inmates.forEach(inmate => {
      const admissionDate = moment(inmate.admissionDate).endOf('day');
      const daysAgo = today.diff(admissionDate, 'days');
      if (daysAgo >= 0 && daysAgo < 7) {
        data[6 - daysAgo]++;
      }
    });

    return data;
  };

  const totalCurrentInmates = currentInmates.length;
  const totalReleasedInmates = releasedInmates.length;
  const totalWantedInmates = wantedInmates.length;

  const genderData = {
    labels: ['Male', 'Female'],
    datasets: [
      {
        label: 'Current Inmates by Gender',
        data: [countByGender(currentInmates, 'Male'), countByGender(currentInmates, 'Female')],
        backgroundColor: ['#89CFF0', '#FF6384'],
        hoverBackgroundColor: ['#89CFF0', '#FF6384'],
      },
    ],
  };

  const inmatesStatusData = {
    labels: ['Current Inmates', 'Released Inmates', 'Wanted Inmates'],
    datasets: [
      {
        label: 'Total Count',
        data: [totalCurrentInmates, totalReleasedInmates, totalWantedInmates],
        backgroundColor: ['#89CFF0', '#FF6384', '#FFCE56'],
        hoverBackgroundColor: ['#89CFF0', '#FF6384', '#FFCE56'],
      },
    ],
  };

  const inmatesAddedData = {
    labels: [
      moment().subtract(6, 'days').format('MMM D'),
      moment().subtract(5, 'days').format('MMM D'),
      moment().subtract(4, 'days').format('MMM D'),
      moment().subtract(3, 'days').format('MMM D'),
      moment().subtract(2, 'days').format('MMM D'),
      moment().subtract(1, 'days').format('MMM D'),
      moment().format('MMM D')
    ],
    datasets: [
      {
        label: 'Inmates Added',
        data: countInmatesAddedLast7Days(currentInmates),
        backgroundColor: '#FFCE56',
      },
    ],
  };

  return (
    <div>
      <SideNavbar />
      <div className='main-box'>
        <div className="inmate-header-box " style={{ width: "95%" }}>
          <h2 className="inmate-heading">Inmate Management Dashboard</h2>
        </div>
      </div>
      <div className="allItems">
        <Link to="/current" className="items">
          Current Inmates :  {totalCurrentInmates}
        </Link>
        <Link to="/released" className="items">
          Released Inmates :  {totalReleasedInmates}
        </Link>
        <Link to="/wanted" className="items">
          Wanted Inmates :  {totalWantedInmates}
        </Link>
      </div>
      <div className="dashboard-container">
        <div className="chart-card-gender">
          <h3 className="chart-card-gender-title">Current Inmates Overview</h3>
          <div className="pie-chart"><Pie style={{ height: '340px', marginLeft: '20px' }} data={genderData} /></div>
        </div>

        <div className="chart-card-status">
          <h3 className="chart-card-status-title">Inmates Status</h3>
          <div className="barchart"><Bar data={inmatesStatusData} /></div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
