import React, { useState, useEffect } from 'react';
import { Modal, Form, Input, Button, message, DatePicker } from 'antd';
import moment from 'moment';
import axios from 'axios';
import './healthRecordForm.css';

const UpdateHealthRecordForm = ({ visible, onCancel, healthRecord, fetchHealthRecords }) => {
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (healthRecord) {
            form.setFieldsValue({
                InmateName: healthRecord.InmateName,
                dateOfBirth: healthRecord.dateOfBirth ? moment(healthRecord.dateOfBirth).subtract(1, 'days') : null,
                diagnosis: healthRecord.diagnosis,
                medications: healthRecord.medications,
                notes: healthRecord.notes,
            });
        }
    }, [healthRecord, form]);

    // Custom validator function for Diagnosis field
    const validateDiagnosis = (_, value) => {
        if (!/^[a-zA-Z ]+$/.test(value)) {
            return Promise.reject('Diagnosis must include only letters');
        }
        return Promise.resolve();
    };

    const onFinish = async (values) => {
        try {
            setLoading(true);
            const response = await axios.put(`http://localhost:3500/healthrecord/updatehealthrecords/${healthRecord._id}`, values);
            console.log('Success:', response.data);
            message.success('Health record updated successfully');
            onCancel();
            fetchHealthRecords();
        } catch (error) {
            console.error('Error:', error.response.data);
            message.error('Failed to update health record');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Modal
            visible={visible}
            onCancel={onCancel}
            footer={null}
            closeIcon={<span className="close">X</span>}
            width={500}
            style={{ marginTop: -70, marginBottom: 10 }}
        >
            <Form
                form={form}
                layout="vertical"
                onFinish={onFinish}
            >
                <h2 style={{ color: '#3C78AA', fontWeight: 'bold', textAlign: 'center', marginBottom: '25px' }}>Health Record</h2>
            <Form.Item
            className="formGroup"
                name="InmateName"
                label="Inmate Name"
                rules={[
                    
                    { pattern: /^[a-zA-Z. ]+$/, message: 'Inmate Name must include only letters and "." symbol' }
                ]}
            >
                <Input />
            </Form.Item>
                <Form.Item
                className="formGroup"
                    name="dateOfBirth"
                    label="Date of Birth"
                    
                    rules={[
                        
                        () => ({
                            validator(_, value) {
                                const eighteenYearsAgo = moment().subtract(18, 'years');
                                if (!value || value.isBefore(eighteenYearsAgo)) {
                                    return Promise.resolve();
                                }
                                return Promise.reject(new Error('Date of Birth must be at least 18 years ago'));
                            },
                        }),
                    ]}
                >
                    <DatePicker style={{height:'40px',width:'100%'}} format="YYYY-MM-DD" />
                </Form.Item>
                <Form.Item
                className="formGroup"
                    name="diagnosis"
                    label="Diagnosis"
                    rules={[
                        ,
                        { validator: validateDiagnosis }
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                className="formGroup"
                    name="medications"
                    label="Medications"
                    
                >
                    <Input />
                </Form.Item>
                <Form.Item
                className="formGroup"
                    name="notes"
                    label="Notes"
                >
                    <Input.TextArea style={{ resize: 'none' }} />
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit" loading={loading} className="updateButton">
                        Update
                    </Button>
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default UpdateHealthRecordForm;
