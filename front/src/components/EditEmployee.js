import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useParams } from 'react-router-dom';

const EditEmployee = () => {
    const { id } = useParams();
    const [employee, setEmployee] = useState({
        firstName: '',
        lastName: '',
        hireDate: '',
        restaurantId: ''
    });

    useEffect(() => {
        if (id) {
            axios.get(`/employees/${id}`)
                .then(response => {
                    const employeeData = response.data;
                    setEmployee({
                        firstName: employeeData.firstName || '',
                        lastName: employeeData.lastName || '',
                        hireDate: employeeData.hireDate || '',
                        restaurantId: employeeData.restaurantId || ''
                    });
                })
                .catch(error => console.error("Error fetching employee data:", error));
        } else {
            console.error("No employee ID found in URL parameters.");
        }
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEmployee(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.put(`/employees/${id}`, employee)
            .then(response => {
                alert('Employee updated successfully');
                // Clear form fields after successful update
                setEmployee({
                    firstName: '',
                    lastName: '',
                    hireDate: '',
                    restaurantId: ''
                });
            })
            .catch(error => console.error("Error updating employee:", error));
    };

    return (
        <div className="div-form">
            <form onSubmit={handleSubmit} className="form-container">
                <h1 className="form-title">Edit Employee</h1>
                <div className="form-group">
                    <label>First Name: </label>
                    <input
                        type="text"
                        name="firstName"
                        value={employee.firstName}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group">
                    <label>Last Name: </label>
                    <input
                        type="text"
                        name="lastName"
                        value={employee.lastName}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group">
                    <label>Hire-date: </label>
                    <input
                        type="date"
                        name="hireDate"
                        value={employee.hireDate}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group">
                    <label>Restaurant: </label>
                    <input
                        type="text"
                        name="restaurant"
                        value={employee.restaurantId}
                        onChange={handleChange}
                    />
                </div>
                <button type="submit" className="btn-form-edit-employee">Edit Employee</button>
            </form>
            <Link to="/" className="link-return">Return to Restaurant List</Link>
        </div>
    );
};

export default EditEmployee;
