import React from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';

const RestaurantCard = ({ restaurants }) => {
    const navigate = useNavigate();

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
        navigate.push(`/edit-restaurant/${restaurants.id}`);
    };

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
            </div>
        </div>
    )
}

export default RestaurantCard;