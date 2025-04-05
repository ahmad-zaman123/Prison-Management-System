import React, { useState, useEffect } from 'react';
import { Modal } from 'antd';
import moment from 'moment';
import './healthrecordView.css';

function ViewHealthRecordModal ({ visible, onCancel, record }) {

  const [isVisiblePDFModal, setIsVisiblePDFModal] = useState(false);
  const [selectedRecord, setselectedRecord] = useState(null);

  const showPDFModal = (record) => {
    setselectedRecord(record);
    setIsVisiblePDFModal(true);
  };
  
  return (
    <Modal
      
      visible={visible}
      onCancel={onCancel}
      footer={null}
      closeIcon={<span className="close">X</span>}
      width={400}
    >
      {record && (
        <div className="record-details">
          <h2 style={{ color: '#3C78AA', fontWeight: 'bold', textAlign: 'center', marginBottom: '25px' }}>Health Record</h2>
          <p className="label"><strong style={{marginRight:'10px'}} className="label">Inmate Name:</strong> {record.InmateName}</p>
          <p className="label"><strong style={{marginRight:'10px'}} className="label">Date of Birth:</strong> {record.dateOfBirth ? moment(record.dateOfBirth).format('YYYY-MM-DD') : ''}</p>
          <p className="label"><strong style={{marginRight:'10px'}} className="label">Diagnosis:</strong> {record.diagnosis}</p>
          <p className="label"><strong style={{marginRight:'10px'}} className="label">Medications:</strong> {record.medications}</p>
          <p className="label"><strong style={{marginRight:'10px'}} className="label">Notes:</strong> {record.notes}</p>
          <p className="label"><strong style={{marginRight:'10px'}} className="label">Date:</strong> {record.date ? moment(record.date).format('YYYY-MM-DD') : ''}</p>
          
        </div>

      )}
              
    </Modal>
    
  );
}

export default ViewHealthRecordModal;
