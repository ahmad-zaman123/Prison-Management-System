import React, { useState } from 'react';
import { Select, Radio, Form, Input } from 'antd';
import "./AddTable.css";


const { Option } = Select;

function AddCurrentInmate({ formData, setFormData, setImage }) {
    const [form] = Form.useForm();

    const validateForm = () => {
        const requiredFields = ['image', 'fullname', 'birthday', 'gender', 'emergencycontactname', 'emergencycontactnumber', 'marital'];
        for (const field of requiredFields) {
            if (!formData[field]) {
                return false; 
            }
        }
        return true; 
    };

    const validateFullName = (_, value) => {
        // Strip out invalid characters and update the form data
        const strippedValue = value.replace(/[^A-Za-z\s]/g, '');
        setFormData(prevState => ({ ...prevState, fullname: strippedValue }));
        return Promise.resolve();
    };


    const preventEmergencyContactNumber = (_, value) => {
        // Strip out any symbols and update the form data
        const strippedValue = value.replace(/[^\d+\s]/g,'');
        setFormData(prevState => ({ ...prevState, emergencycontactnumber: strippedValue }));
        return Promise.resolve();
    };

    const getMaxDate = () => {
        const currentDate = new Date();
        const maxDate = new Date(currentDate.getFullYear() - 18, currentDate.getMonth(), currentDate.getDate()); // Subtract 18 years from current date
        return maxDate.toISOString().split('T')[0]; // Format the date as YYYY-MM-DD
      };
    
      const getMinDate = () => {
        const currentDate = new Date();
        const minDate = new Date(currentDate.getFullYear() - 30, currentDate.getMonth(), currentDate.getDate()); // Subtract 30 years from current date
        return minDate.toISOString().split('T')[0]; // Format the date as YYYY-MM-DD
      };
    
      const [errors, setErrors] = useState({
        FirstNameError: '',
        LastNameError: '',
        EmergencyContactNumberError: '',
        DateOfBirthError: '' // Error state for date of birth validation
      });
  
    const validateDateOfBirth = (_, value) => {
        const currentDate = new Date();
        const selectedDate = new Date(value);
    
        // Calculate the minimum date required for a person to be at least 18 years old
        const minDateForAdult = new Date();
        minDateForAdult.setFullYear(currentDate.getFullYear() - 18);
    
        // Calculate the minimum date required to prevent dates more than 100 years ago
        const minDate = new Date();
        minDate.setFullYear(currentDate.getFullYear() - 100);
    
        if (selectedDate >= currentDate || selectedDate >= minDateForAdult || selectedDate <= minDate) {
            return Promise.reject('Date of Birth must be a past date, and the person should be at least 18 years old, and not more than 100 years old.');
        }
    
        return Promise.resolve();
    };
    

    const onFinish = (values) => {
        if (validateForm()) {
            console.log('Received values:', values);
            // Perform form submission
        } else {
            console.log('Form validation failed');
        }
    };

    const handleChange = (name, value) => {
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setImage(file);
    };

    return (
        <div className="container">
            <Form
                form={form}
                name="addCurrentInmate"
                onFinish={onFinish}
                layout="vertical"
                initialValues={formData}
            >
                <div style={{width:'100%',display:'flex',justifyContent:'space-between'}}>
                <Form.Item
                    className="InputName"
                    name="image"
                    label="Upload Inmate Photo"
                    
                > 
                    <div className="InputName">                
                        <input
                            accept="image/*"
                            type="file"
                            name="image"
                            onChange={handleImageChange}
                            className="InputImage"/></div>
                </Form.Item>

                <Form.Item
                    className="InputName"
                    name="fullname"
                    label="Full Name:"
                    rules={[
                        
                        { validator: validateFullName }
                    ]}  
                > 
                    <div className="InputName"><Input className="InputField" value={formData.fullname} onChange={(e) => { setFormData({ ...formData, fullname: e.target.value }); }} /></div>
                </Form.Item>

                </div>

                <div className="flex">
                <Form.Item
                    className="InputName"
                    name="birthday"
                    label="Date of Birth:"
                    rules={[
                        
                        { validator: validateDateOfBirth }
                    ]}
                >
                    <div className="InputName"></div><Input max={getMaxDate()} min={getMinDate()} type="date" className="InputFieldNew" value={formData.birthday} onChange={(e) => { setFormData({ ...formData, birthday: e.target.value }); }} />
                </Form.Item>
                    <div className="InputNameRadio"><Form.Item
                    className="InputName"
                    name="gender"
                    label="Gender:"
                    
                >
                        <Radio.Group className="InputRadio"  name="gender" value={formData.gender} onChange={(e) => { setFormData({ ...formData, gender: e.target.value }); }}>
                            <Radio value="Male">Male</Radio>
                            <Radio value="Female">Female</Radio>
                        </Radio.Group>
                </Form.Item></div>
                </div>

                <div style={{width:'100%',display:'flex',justifyContent:'space-between'}}>
                <Form.Item
                    className="InputName"
                    name="emergencycontactname"
                    label="Emergency Contact Name:"
                    
                >
                    <Input className="InputField2" value={formData.emergencycontactname} onChange={(e) => { setFormData({ ...formData, emergencycontactname: e.target.value }); }}/>
                </Form.Item>

                <Form.Item
                    className="InputName"
                    name="emergencycontactnumber"
                    label="Emergency Contact Number:"
                    rules={[
                       
                        { validator: preventEmergencyContactNumber },
                    ]}
                >
                    <div className="InputName"><Input className="InputField2" placeholder="+92XXXXXXXXX" value={formData.emergencycontactnumber} onChange={(e) => { setFormData({ ...formData, emergencycontactnumber: e.target.value }); }}/></div>
                </Form.Item>

                </div>

                <Form.Item
                    name="marital"
                    label="Marital Status:"
                    
                >
                    <Select className="InputDropdown" placeholder="Select marital status" style={{ width: '100%' }} value={formData.marital} onChange={(value) => handleChange('marital', value)}>
                        <Option value="Single">Single</Option>
                        <Option value="Married">Married</Option>
                        
                    </Select>
                </Form.Item>
            </Form>
        </div>
    );
}

export default AddCurrentInmate;
