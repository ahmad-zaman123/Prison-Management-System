import React, { useEffect, useState } from 'react';
import Sidebar from '../Sidebar';
import { Button, Modal, message } from 'antd';
import { IoEyeOutline } from "react-icons/io5";
import { FaEdit } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";
import AddNewVisitor from '../Forms/AddNewVisitor';
import axios from 'axios';
import VisitorDetails from '../Forms/VisitorDetails';
import UpdateVisitor from '../Forms/UpdateVisitor';
import CreateVisit from '../Forms/CreateVisit';
import ConfirmationModal from '../Forms/ConfirmationModal';
import { Pencil, Trash } from "lucide-react";
import { CheckCircle, XCircle } from "lucide-react";
import '../CssFiles/AllTables.css';

const AllVisitors = () => {
    const [showAddDialog, setShowAddDialog] = useState(false);
    const [showDetailDialog, setShowDetailDialog] = useState(false);
    const [showUpdateDialog, setShowUpdateDialog] = useState(false);
    const [showVisitDialog, setShowVisitDialog] = useState(false);
    const [visitors, setVisitorData] = useState([]);
    const [selectedVisitorId, setSelectedVisitorId] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [showConfirmationModal, setShowConfirmationModal] = useState(false);
    const [deletingVisitorId, setDeletingVisitorId] = useState(null);

    const toggleAddDialog = () => setShowAddDialog(!showAddDialog);
    const toggleDetailDialog = () => setShowDetailDialog(!showDetailDialog);
    const toggleUpdateDialog = () => setShowUpdateDialog(!showUpdateDialog);
    const toggleVisitDialog = () => setShowVisitDialog(!showVisitDialog);

    const getAllVisitors = async () => {
        const res = await axios.get('http://localhost:3500/api/visitor');
        setVisitorData(res.data);
    };

    const handleDelete = (id) => {
        setDeletingVisitorId(id);
        setShowConfirmationModal(true);
    };

    const confirmDelete = async () => {
        try {
            await axios.delete(`http://localhost:3500/api/visitor/delete/${deletingVisitorId}`);
            getAllVisitors();
            console.log('Visitor deleted successfully');
        } catch (error) {
            console.error('Error deleting visitor:', error);
        }
    };

    const handleUpdate = (id) => {
        setSelectedVisitorId(id);
        toggleUpdateDialog();
    };

    const handleView = (id) => {
        setSelectedVisitorId(id);
        toggleDetailDialog();
    };

    const handleCreate = (id) => {
        setSelectedVisitorId(id);
        toggleVisitDialog();
    };

    useEffect(() => {
        getAllVisitors();
    }, []);

    const filteredVisitors = visitors.filter((visitor) =>
        visitor.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        visitor.lastName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        visitor.nic.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (

        <div style={{ display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center" }}>

            <div style={{ height: "705px", width: "20%" }}>

                <Sidebar />

            </div>

            <div style={{ backgroundColor: "#f8f9fa", width: "80%", height: "705px" }}>


                <div className="head">
                    <h6 className="fw-bold" style={{ fontSize: "30px", marginBottom: "15px", textAlign: "left" }}>
                        Visitors List
                    </h6>

                </div>

                <div style={{ display: "flex", flexDirection: "row", marginBottom: "0px", marginTop: "40px" }}>

                    <div>

                        <input
                            type="text"
                            className="search-Input"
                            style={{ width: "500px" }}
                            placeholder='Search Visitors'
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}

                        />

                        <Button type='primary' onClick={toggleAddDialog} className='add-button'>Add Visitor</Button></div>
                </div>


                <table className="v-custom-table">
                    <thead>
                        <tr className="leading-normal text-gray-800 uppercase bg-gray-200 text-md">
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Date of Birth</th>
                            <th>Gender</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody className="text-sm font-normal text-gray-900">
                        {filteredVisitors.map((visitor) => (
                            <tr key={visitor._id} >
                                <td onClick={() => handleView(visitor._id)}>{visitor.firstName}</td>
                                <td onClick={() => handleView(visitor._id)}>{visitor.lastName}</td>
                                <td onClick={() => handleView(visitor._id)}>{new Date(visitor.dateOfBirth).toLocaleDateString()}</td>
                                <td onClick={() => handleView(visitor._id)}>{visitor.gender}</td>
                                
                                <td>
                                    
                                    <button type='primary' onClick={() => handleUpdate(visitor._id)} className='update-button'><Pencil size={18} /></button>
                                    <button type='danger' onClick={() => handleDelete(visitor._id)} className='delete-button' ><Trash size={18} /></button>
                                    <button onClick={() => handleCreate(visitor._id)} className="approveButton" ><CheckCircle size={18} /></button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>


                <AddNewVisitor isOpen={showAddDialog} onClose={toggleAddDialog} refreshList={getAllVisitors} />
                <VisitorDetails isOpen={showDetailDialog} onClose={toggleDetailDialog} refreshList={getAllVisitors} visitorId={selectedVisitorId} />
                <UpdateVisitor isOpen={showUpdateDialog} onClose={toggleUpdateDialog} refreshList={getAllVisitors} visitorId={selectedVisitorId} />
                <CreateVisit isOpen={showVisitDialog} onClose={toggleVisitDialog} refreshList={getAllVisitors} visitorId={selectedVisitorId} />
                <ConfirmationModal
                    isOpen={showConfirmationModal}
                    onClose={() => setShowConfirmationModal(false)}
                    onConfirm={confirmDelete}
                    message="Are you sure you want to delete?"
                />
            </div>
        </div>


    );
};

export default AllVisitors;
