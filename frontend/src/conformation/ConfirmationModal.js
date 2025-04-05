import React from 'react';
import './ConformationModel.css'

const ConfirmationModal = ({ isOpen, onClose, onConfirm, message }) => {
    if (!isOpen) return null;

    return (
        <div className="conformation-modal-overlay">
            <div className="model-container">
                <p className="mb-4 conf-model-message">{message}</p>
                <div className=" model-button">
                    <button
                        onClick={() => {
                            onConfirm();
                            onClose();
                        }}
                        className="mod-button-delete model-button-delete"
                    >
                        Yes
                    </button>
                    <button
                        onClick={onClose}
                        className="mod-button-close model-button-delete"
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ConfirmationModal;
