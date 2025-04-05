import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import '../visitor/CssFiles/Summery.css'

const Summary = () => {
    const [visits, setVisits] = useState([]);

    const getAllVisits = async () => {
        try {
            const res = await axios.get('http://localhost:3500/api/visit');
            setVisits(res.data);
        } catch (error) {
            console.error('Error fetching visits:', error);
        }
    };

    useEffect(() => {
        getAllVisits();
    }, []);

    // Function to format date to YYYY-MM-DD without considering time zone
    const formatDate = (date) => {
        const year = date.getFullYear();
        const month = `0${date.getMonth() + 1}`.slice(-2);
        const day = `0${date.getDate()}`.slice(-2);
        return `${year}-${month}-${day}`;
    };

    // Get today's date
    const today = new Date();
    

    // Array to store the last 5 days' dates
    const lastFiveDays = [];
    for (let i = 0; i < 5; i++) {
        const date = new Date(today);
        date.setDate(date.getDate() - i);
        lastFiveDays.unshift(formatDate(date));
    }

    // Aggregate counts for each day
    const visitsCount = lastFiveDays.reduce((acc, date) => {
        acc[date] = 0;
        return acc;
    }, {});

    visits.forEach((visit) => {
        const visitDate = formatDate(new Date(visit.dateOfVisit));
        if (visitsCount.hasOwnProperty(visitDate)) {
            visitsCount[visitDate]++;
        }
    });

    // Convert aggregated data to an array of objects for recharts
    const data = Object.keys(visitsCount).map((date) => ({
        date,
        count: visitsCount[date],
    }));

    return (
        
            
            <div className='my-div' style={{ width: '900px', height: '500px' }}>
                <BarChart width={900} height={400} data={data}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="count" name="Visits" fill="#06b6d4" />
                </BarChart>
            </div>
        
    );
};

export default Summary;
