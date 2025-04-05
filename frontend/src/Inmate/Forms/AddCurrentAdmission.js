import React, { useState } from 'react';
import { Form, Input, Checkbox, Select} from 'antd';
import "./AddTable.css";
const { TextArea } = Input;
const { Option } = Select;

function AddCurrentAdmission({ formData, setFormData }) {
    const [lifeImprisonment, setLifeImprisonment] = useState(false);

    const validateForm = () => {
        const requiredFields = ['inmatenumber', 'offense', 'sentence', 'Admission Date', 'cellNumber'];
        for (const field of requiredFields) {
            if (!formData[field]) {
                return false; // Return false if any required field is empty
            }
        }
        return true; // All required fields are filled
    };

    const handleLifeImprisonmentChange = (e) => {
        setLifeImprisonment(e.target.checked);
    };

    const handleChange = (key, value) => {
        setFormData(prevData => ({
            ...prevData,
            [key]: value
        }));
    };

    const onFinish = (values) => {
        if (validateForm()) {
            console.log('Received values:', values);
            // Perform form submission
        } else {
            console.log('Form validation failed');
        }
    };

    return (
        <div className="container">
            <Form
                name="addCurrentAdmission"
                action="POST"
                layout="vertical"
                onFinish={onFinish}      
            >
                <div style={{width:'100%',display:'flex',justifyContent:'space-between'}} >

                <Form.Item label="Inmate Number" name="inmatenumber" >
                    <Input className="InputField" value={formData.inmatenumber} onChange={(e) => { setFormData({ ...formData, inmatenumber: e.target.value }); }} />
                </Form.Item>

                <Form.Item label="Cell Number" name="cellNumber" style={{width:'50%'}}>
                   <Select className="InputDropdown" placeholder="Select cell number" style={{ width: '100%' }} value={formData.cellNumber} onChange={(value) => handleChange('cellNumber', value)}>
                        <Option value="A1">A1</Option>
                        <Option value="A2">A2</Option>
                        <Option value="A3">A3</Option>
                        
                        <Option value="B1">B1</Option>
                        <Option value="B2">B2</Option>
                        <Option value="B3">B3</Option>
                        
                        <Option value="C1">C1</Option>
                        <Option value="C2">C2</Option>
                        <Option value="C3">C3</Option>
                        
                    </Select>
                </Form.Item>

                </div>

                <Form.Item label="Offense" name="offense" style={{marginTop:-18}} >
                    <Select className="InputDropdown3" placeholder="Select offense" value={formData.offense} onChange={(value) => handleChange('offense', value)} >
                    <Option value="Robbery">Robbery</Option>
                        <Option value="Theft">Theft</Option>
                        <Option value="Abuse">Abuse</Option>
                        <Option value="Assault">Assault</Option>
                        <Option value="Murder">Murder</Option>
                        </Select>
                       
                    
                </Form.Item>

                <Form.Item label="Sentence" name="sentence" style={{marginTop:-18}} >
                    <Select className="InputDropdown3" placeholder="Select sentence" value={formData.sentence} onChange={(value) => handleChange('sentence', value)}>
                        <Option value="Imprisonment">Imprisonment</Option>
                        <Option value="Death Penalty">Death Penalty</Option>
                        <Option value="Probation">Probation</Option>
                        
                        <Option value="Other">Other</Option>
                    </Select>
                </Form.Item>

                <div style={{width:'100%',display:'flex',justifyContent:'space-between',marginTop:-15,marginBottom:-25}}>
                <Form.Item className="InputFieldDuration" label="Admission Date" name="admissionDate" >
                    <Input className="InputField2" type="date" value={formData.admissionData} onChange={(e) => { setFormData({ ...formData, admissionDate: e.target.value }); }} />
                </Form.Item>

                <Form.Item className="InputFieldDuration" label="Release Date" name="releaseDate"  >
                    <Input className="InputField2" type="date" value={formData.releaseData} onChange={(e) => { setFormData({ ...formData, releaseDate: e.target.value }); }} />
                </Form.Item>

                </div>

                
            </Form>
        </div>
    );
}

export default AddCurrentAdmission;
