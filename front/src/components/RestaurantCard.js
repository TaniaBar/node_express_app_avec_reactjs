import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';

const RestaurantCard = ({ restaurants }) => {
    const [employees, setEmployees] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get(`/restaurant/${restaurants.id}/employees`)
        .then(response => setEmployees(response.data))
        .catch(error => console.error("Error fetching employees: ", error));
    }, [restaurants.id]);

    const handleDelete = () => {
        axios.delete(`/restaurant/${restaurants.id}`)
        .then(response => {
            console.log("Restaurant deleted!", response.data);
        })
        .catch(error => {
            console.error("Error to delete a restaurant");
        });
    }

    const handleEdit = () => {
        navigate(`/edit-restaurant/${restaurants.id}`);
    };

    function handleDeleteEmployee(employeeId) {
        axios.delete(`/employee/${employeeId}`)
            .then(response => {
                console.log("Employee deleted!", response.data);
                setEmployees(employees.filter(employee => employee.id !== employeeId));
            })
            .catch(error => {
                console.error("Error deleting the employee:", error);
            });
    }

    function handleEditEmployee(employeeId) {
        navigate(`/edit-employee/${employeeId}`);
    }

    return (
        <div className="card">
            <div className="card-body">
                <h5 className="card-title">{restaurants.name}</h5>
                <p className="card-text"><strong>City:</strong> {restaurants.city}</p>
                <p className="card-text"><strong>Nb of place:</strong> {restaurants.nbcouverts}</p>
                <p className="card-text"><strong>Terrace:</strong> {restaurants.terrasse}</p>
                <p className="card-text"><strong>Parking:</strong> {restaurants.parking}</p>
                <button className="btn btn-danger mr-2" onClick={handleDelete}>Delete</button>
                <button className="btn btn-primary" onClick={handleEdit}>Edit</button>
                <p className="card-text"><strong>Employees:</strong></p>
                <ul className="list-group list-group-flush">
                    {employees.map(employes => (
                        <li key={employes.id} className="list-group-item">
                            {employes.first_name} {employes.last_name}
                            <button className="btn btn-sm btn-danger float-right" onClick={() => handleDeleteEmployee(employes.id)}>Delete</button>
                            <button className="btn btn-sm btn-primary float-right mr-2" onClick={() => handleEditEmployee(employes.id)}>Edit</button>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
}

export default RestaurantCard;