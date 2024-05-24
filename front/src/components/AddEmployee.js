import React, { useState, useEffect } from "react";
import axios from "axios";
import {Link} from 'react-router-dom';
import './AddEmployee.css';

const AddEmployee = () => {
    const [first_name, setFirst_name] = useState('');
    const [last_name, setLast_name] = useState('');
    const [hire_date, setHire_date] = useState('');
    const [restaurant_id, setRestaurant_id] = useState('');
    const [restaurants, setRestaurants] = useState([]);

    useEffect(() => {
        axios.get('/restaurant')
        .then(response => setRestaurants(response.data))
        .catch(error => console.error(error));
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        const newEmployee = { first_name, last_name, hire_date, restaurant_id };
        axios.post('/restaurant/:id/employees', newEmployee)
        .then(response => console.log(response.data))
        .catch(error => console.error(error));
    }

    return (
        <div className="div-form-addE">
            <form onSubmit={handleSubmit} className="form-container">
                <h1 className="form-title">Add Employee</h1>
                <div className="form-group">
                    <label>First name: </label>
                    <input type="text" value={first_name} onChange={(e) => setFirst_name(e.target.value)}></input>
                </div>
                <div className="form-group">
                    <label>Last name: </label>
                    <input type="text" value={last_name} onChange={(e) => setLast_name(e.target.value)}></input>
                </div>
                <div className="form-group">
                    <label>Hire date: </label>
                    <input type="date" value={hire_date} onChange={(e) => setHire_date(e.target.value)}></input>
                </div>
                <div className="form-group">
                    <label>Restaurant: </label>
                    <select value={restaurant_id} onChange={(e) => setRestaurant_id(e.target.value)} className="form-input">
                        <option value="">Select a restaurant</option>
                        {restaurants.map(restaurant => (
                            <option key={restaurant.id} value={restaurant.id}>{restaurant.name}</option>
                        ))}
                    </select>
                </div>
                <button type="submit" className="btn-form-add-employee">Add Employee</button>
            </form>
            <Link to="/" className="link-return">Return to Restaurant List</Link>
        </div>
    )
}
export default AddEmployee;