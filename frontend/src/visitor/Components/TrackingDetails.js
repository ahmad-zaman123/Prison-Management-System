import React, { useEffect, useState } from 'react';
import Sidebar from '../Sidebar';
import { MdDeleteOutline } from "react-icons/md";
import axios from 'axios';
import ConfirmationModal from '../Forms/ConfirmationModal';
import { toast } from 'react-toastify';
import { Trash } from "lucide-react";
import '../CssFiles/AllTables.css'

const AllVisits = () => {
    const [visits, setVisitData] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [showConfirmationModal, setShowConfirmationModal] = useState(false);
    const [deletingVisitId, setDeletingVisitId] = useState(null);

    const getAllVisits = async () => {
        try {
            const res = await axios.get('http://localhost:3500/api/visit');
            setVisitData(res.data);
        } catch (error) {
            console.error('Error fetching visits:', error);
        }
    }

    const handleDelete = (id) => {
        setDeletingVisitId(id);
        setShowConfirmationModal(true);
    };

    const confirmDelete = async () => {
        try {
            await axios.delete(`http://localhost:3500/api/visit/delete/${deletingVisitId}`);
            // Remove the deleted visit from the local state
            getAllVisits();
            toast.success('Visit Successfully Deleted ', {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
              });
            console.log('Visit deleted successfully');
        } catch (error) {
            console.error('Error deleting visit:', error);
        }
    };

    useEffect(() => {
        getAllVisits();
    }, []);

    const filteredVisits = visits.filter(visit =>
        visit.visitorName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      
        visit.inmateNo.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (

        <div style={{ display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center" }}>

            <div style={{ height: "705px", width: "20%" }}>

                <Sidebar />

            </div>

            <div style={{ backgroundColor: "#f8f9fa", width: "80%", height: "705px" }}>


                <div className="head">
                    <h6 className="fw-bold" style={{ fontSize: "30px", marginBottom: "15px", textAlign: "left" }}>
                        Tracking Details
                    </h6>

                </div>

                <div style={{ display: "flex", flexDirection: "row", marginBottom: "0px", marginTop: "40px" }}>

                    <div>

                        <input
                            type="text"
                            className="search-Input"
                            style={{ width: "500px" }}
                            placeholder='Search Visits'
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}

                        />
                </div>
                </div>
    
                        <table className="v-custom-table ">
                            <thead>
                                <tr >
                                    <th >Visitor Name</th>
                                    <th >Inmate Number</th>
                                    <th >Date of Visit</th>
                                    <th >Check-in Time</th>
                                    <th >Check-out Time</th>
                                    <th >Duration (mins)</th>
                                    <th >Actions</th>
                                </tr>
                            </thead>
                            <tbody >
                                {filteredVisits.map(visit => (
                                    <tr key={visit._id} >
                                        <td >{visit.visitorName}</td>
                                        <td >{visit.inmateNo}</td>
                                        <td >{new Date(visit.dateOfVisit).toLocaleDateString()}</td>
                                        <td >{visit.checkInTime}</td>
                                        <td >{visit.checkOutTime}</td>
                                        <td >{visit.duration}</td>
                                        <td >
                                            <button onClick={() => handleDelete(visit._id)} className='delete-button' ><Trash size={18} /></button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    
                
            
            <ConfirmationModal
                isOpen={showConfirmationModal}
                onClose={() => setShowConfirmationModal(false)}
                onConfirm={confirmDelete}
                message="Are you sure you want to delete?"
            />

        </div>
    </div>
        
    )
}

export default AllVisits;
