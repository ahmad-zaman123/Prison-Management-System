import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaWindowClose } from "react-icons/fa";
import { useReactToPrint } from 'react-to-print';
import { toast } from 'react-toastify';
import '../CssFiles/CreateVisit.css';


const CreateVisit = ({ isOpen, onClose, refreshList, visitorId }) => {
    const [visitorDetails, setVisitorDetails] = useState(null);
    const [checkoutTime, setCheckoutTime] = useState('');
    const [duration, setDuration] = useState(null);
    const componentRef = React.useRef();

    useEffect(() => {
        if (isOpen && visitorId) {
            getVisitorDetails(visitorId);
        }
    }, [isOpen, visitorId]);

    useEffect(() => {
        if (visitorDetails && visitorDetails.timeOfVisit) {
            let duration = 0;
            if (checkoutTime) {
                const checkInTime = visitorDetails.timeOfVisit.split(':').slice(0, 2).join(':'); // Extracting hours and minutes
                let checkOutTime = checkoutTime;
                if (checkOutTime < checkInTime) {
                    // If check-out is earlier than check-in, assume next day visit
                    const nextDay = new Date(`01/02/2000 ${checkOutTime}`);
                    checkOutTime = `${nextDay.getHours()}:${nextDay.getMinutes()}`;
                }
                const checkOutDate = new Date(`01/01/2000 ${checkOutTime}`);
                const checkInDate = new Date(`01/01/2000 ${checkInTime}`);
                duration = Math.round((checkOutDate - checkInDate) / (1000 * 60));
            }
            setDuration(Math.abs(duration)); // Take absolute value to ensure it's always positive
        }
    }, [visitorDetails, checkoutTime]);


    const getVisitorDetails = async (visitorId) => {
        try {
            const response = await axios.get(`http://localhost:3500/api/visitor/${visitorId}`);
            setVisitorDetails(response.data);
        } catch (error) {
            console.error('Error fetching visitor details:', error.message);
        }
    }

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString();
    }

    // Function to handle printing
    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
    });

    // Function to handle visit submission
    const visitSubmit = async () => {
        if (!checkoutTime) {
            toast.error('Please enter checkout time', {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            });
            return; // Prevent submission if checkout time is empty
        }

        try {
            // Make an HTTP POST request to save the visit details
            const response = await axios.post('http://localhost:3500/api/visit/add', {
                visitorName: `${visitorDetails.firstName} ${visitorDetails.lastName}`,
                nic: visitorDetails.nic,
                inmateNo: visitorDetails.inmateNo,
                dateOfVisit: formatDate(visitorDetails.dateOfVisit),
                checkInTime: visitorDetails.timeOfVisit,
                checkOutTime: checkoutTime,
                duration: checkoutTime ? duration : null // Set duration as null if checkout time is empty
            });
            console.log(response.message);

            // Trigger printing of PDF upon successful visit submission
            handlePrint();
            onClose();
            // Optionally, you can show a toast notification for successful submission
            toast.success('Visit details saved successfully', {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            });
        } catch (error) {
            console.error('Error saving visit details:', error.message);
            // Optionally, you can show a toast notification for error
            toast.error('Error saving visit details', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            });
        }
    }

    return (
        <div className={`custom-modal-overlay ${isOpen ? 'custom-sec-show' : 'custom-sec-hide'}`}>
            <div className="custom-modal-container">
                <FaWindowClose size={25} color='red' onClick={onClose} className="custom-close-icon" />
                {visitorDetails ? (
                    <div>
                        <div className='custom-width' ref={componentRef} >

                            
                            <div className='view' style={{ padding: '20px' }}>
                                <h2 style={{ color: '#3C78AA', marginBottom: '25px', textAlign: 'center', fontWeight: 'bold' }}>Visit Details</h2>

                                <div style={{ display: 'flex' }}>
                                    <div className="text1">Full Name :</div>
                                    <div className="text">{visitorDetails.firstName.charAt(0).toUpperCase() + visitorDetails.firstName.slice(1)} {visitorDetails.lastName.charAt(0).toUpperCase() + visitorDetails.lastName.slice(1)}</div>
                                </div>
                               
                                <div style={{ display: 'flex' }}>
                                    <div className="text1">Inmate Number :</div>
                                    <div className="text">{visitorDetails.inmateNo}</div>
                                </div>
                                <div style={{ display: 'flex' }}>
                                    <div className="text1">Date of Visit :</div>
                                    <div className="text">{formatDate(visitorDetails.dateOfVisit)}</div>
                                </div>
                                <div style={{ display: 'flex' }}>
                                    <div className="text1">Check In Time :</div>
                                    <div className="text">{visitorDetails.timeOfVisit}</div>
                                </div>
                                <div style={{ display: 'flex' }}>
                                    <div className="text1">Check Out Time :</div>
                                    <div className="text">
                                        <input type="time" value={checkoutTime} onChange={(e) => setCheckoutTime(e.target.value)} />
                                    </div>
                                </div>
                                <div style={{ display: 'flex' }}>
                                    <div className="text1">Duration Of Visit :</div>
                                    <div className="text">{duration !== null ? `${duration} mins` : 'N/A'}</div>
                                </div>
                            </div>

                        </div>

                        <div className='custom-button-container'>
                            <button onClick={visitSubmit} className='approve'>Approve</button>
                        </div>
                    </div>
                ) : (
                    <p>Loading...</p>
                )}
            </div>
        </div>
    )
}

export default CreateVisit;
