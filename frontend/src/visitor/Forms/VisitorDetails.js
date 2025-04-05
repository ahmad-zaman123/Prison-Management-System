import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaWindowClose } from "react-icons/fa";
import { toast } from 'react-toastify';
import '../CssFiles/AllViews.css';

const VisitorDetails = ({ isOpen, onClose, refreshList, visitorId }) => {
    const [visitorDetails, setVisitorDetails] = useState(null);
    const componentRef = React.useRef();

    useEffect(() => {
        if (isOpen && visitorId) {
            getVisitorDetails(visitorId);
        }
    }, [isOpen, visitorId]);

    const getVisitorDetails = async (visitorId) => {
        try {
            const response = await axios.get(`http://localhost:3500/api/visitor/${visitorId}`);
            setVisitorDetails(response.data);
        } catch (error) {
            console.error('Error fetching visitor details:', error.message);
        }
    }

    const handleDelete = async () => {
        if (!visitorId) return; // Ensure visitorId is available
        if (!window.confirm("Are you sure you want to delete?")) return; // Confirm deletion
        try {
            await axios.delete(`http://localhost:3500/api/visitor/delete/${visitorId}`);
            console.log('Visitor deleted successfully');
            toast.success('Visitor Successfully Deleted ', {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            });
            onClose(); // Close the visitor details modal after deletion

            refreshList(); // Refresh the list of visitors
        } catch (error) {
            console.error('Error deleting visitor:', error);
        }
    };

    const formatDateOfBirth = (dob) => {
        const date = new Date(dob);
        return date.toLocaleDateString();
    }

    const formatDateOfVisit = (dateOfVisit) => {
        return dateOfVisit.substring(0, 10);
    }



    return (
        <div className={`v-modal-overlay ${isOpen ? 'v-sec-show' : 'v-sec-hide'}`}>
            <div className="v-modal-container" >
                <FaWindowClose size={25} color='red' onClick={onClose} className="v-close-icon" />
                {visitorDetails ? (
                    <div className=''>
                        <div className='view' ref={componentRef} style={{ padding: '10px' }}>
                            <h2 style={{ color: '#3C78AA', marginBottom: '25px', textAlign: 'center', fontWeight: 'bold' }}>Visitor Profile</h2>

                            <div style={{ display: 'flex' }}>
                                <div className="text1">First Name :</div>
                                <div className="text">{visitorDetails.firstName}</div>
                            </div>
                            <div style={{ display: 'flex' }}>
                                <div className="text1">Last Name :</div>
                                <div className="text">{visitorDetails.lastName}</div>
                            </div>
                            <div style={{ display: 'flex' }}>
                                <div className="text1">Date of Birth :</div>
                                <div className="text">{formatDateOfBirth(visitorDetails.dateOfBirth)}</div>
                            </div>
                            <div style={{ display: 'flex' }}>
                                <div className="text1">Gender :</div>
                                <div className="text">{visitorDetails.gender}</div>
                            </div>
                            <div style={{ display: 'flex' }}>
                                <div className="text1">Contact Number :</div>
                                <div className="text">{visitorDetails.contactNumber}</div>
                            </div>
                            <div style={{ display: 'flex' }}>
                                <div className="text1">Inmate Number :</div>
                                <div className="text">{visitorDetails.inmateNo}</div>
                            </div>
                            <div style={{ display: 'flex' }}>
                                <div className="text1">Inmate Name :</div>
                                <div className="text">{visitorDetails.inmateName}</div>
                            </div>
                            <div style={{ display: 'flex' }}>
                                <div className="text1">Date of Visit :</div>
                                <div className="text">{formatDateOfVisit(visitorDetails.dateOfVisit)}</div>
                            </div>
                            <div style={{ display: 'flex' }}>
                                <div className="text1">Time of Visit :</div>
                                <div className="text">{visitorDetails.timeOfVisit}</div>
                            </div>
                            <div style={{ display: 'flex' }}>
                                <div className="text1">Purpose of Visit :</div>
                                <div className="text">{visitorDetails.purposeOfVisit}</div>
                            </div>
                        </div>


                    </div>
                ) : (
                    <p>Loading...</p>
                )}
            </div>
        </div>
    )
}

export default VisitorDetails;
