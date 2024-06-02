import { useState, useEffect } from "react";
import axios from "axios";
import { Link, useParams } from 'react-router-dom';

export default function EditEmployee() {
    const { idEmployee } = useParams();
    console.log('console employee id: ' + idEmployee);

    const [employee, setEmployee] = useState({
        firstname: '',
        lastname: '',
        hireDate: '',
        restaurantId: ''
    });

    const handleChange = (e) => {
        setEmployee({
            ...employee,
            [e.target.name]: e.target.value
        });
    }

    useEffect(() => {
        console.log(`Sending GET request to /employee/${idEmployee}`);
        axios.get(`/employee/${idEmployee}`)
        .then(response => {
            console.log('Received response:', response);
            const EmployeeData = response.data[0];
            setEmployee({
                firstname: EmployeeData.firstname,
                lastname: EmployeeData.lastname,
                hireDate: EmployeeData.hireDate,
                restaurantId: EmployeeData.restaurantId
            });
        })
        .catch(error => {
            console.error('error occurred: ', error);
        })
    }, [idEmployee]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await axios.put(`http://localhost:5000/restaurant/${employee.restaurantId}/employee/${idEmployee}`, employee);

        if(response.status === 200) {
            console.log('put ok');
        } else {
            console.log('error put');
        }
    }

    return (
        <div className="div-form">
            {employee.firstname ? (

            
            <form onSubmit={handleSubmit}>
                <h1 className="form-title">Edit Employee</h1>
                <div className="form-group">
                    <label>Firstname: </label>
                    <input
                        type="text"
                        name="firstname"
                        value={employee.firstname}
                        onChange={handleChange}
                        required
                    ></input>
                </div>
                <div className="form-group">
                    <label>Lastname: </label>
                    <input
                        type="text"
                        name="lastname"
                        value={employee.lastname}
                        onChange={handleChange}
                        required
                    ></input>
                </div>
                <div className="form-group">
                    <label>Hire-date: </label>
                    <input
                        type="date"
                        name="hireDate"
                        value={employee.hireDate}
                        onChange={handleChange}
                        required
                    ></input>
                </div>
                <div className="form-group">
                    <label>Restaurant: </label>
                    <input
                        type="text"
                        name="restaurant"
                        value={employee.restaurantId}
                        onChange={handleChange}
                        required
                    ></input>
                </div>
                <button type="submit">Edit Employee</button>
            </form>
            ) : (
                <p>...Loading</p>
            )}
            <Link to="/" className="link-return">Return to Restaurant List</Link>
        </div>
    );
}
