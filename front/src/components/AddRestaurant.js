import React, { useState } from "react";
import axios from "axios";
import './AddRestaurant.css';
import { Link } from "react-router-dom";

const AddRestaurant = () => {
    const [name, setName] = useState('');
    const [city, setCity] = useState('');
    const [nbcouverts, setNbcouverts] = useState('');
    const [terrasse, setTerrasse] = useState('');
    const [parking, setParking] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        const newRestaurant = { name, city, nbcouverts, terrasse, parking };
        axios.post('/restaurant', newRestaurant)
        .then(response => console.log(response.data))
        .catch(error => console.error(error));
    }

    return (
        <div className="div-form">
            <form onSubmit={handleSubmit} className="form-container">
                <h1 className="form-title">Add Restaurant</h1>
                <div className="form-group">
                    <label>Name: </label>
                    <input type="text" value={name} onChange={(e) => setName(e.target.value)}></input>
                </div>
                <div className="form-group">
                    <label>City: </label>
                    <input type="text" value={city} onChange={(e) =>setCity(e.target.value)}></input>
                </div>
                <div className="form-group">
                    <label>Nb couverts: </label>
                    <input type="number" value={nbcouverts} onChange={(e) =>setNbcouverts(e.target.value)}></input>
                </div>
                <div className="form-group">
                    <label>Terrasse: </label>
                    <input type="text" value={terrasse} onChange={(e) =>setTerrasse(e.target.value)}></input>
                </div>
                <div className="form-group">
                    <label>Parking: </label>
                    <input type="text" value={parking} onChange={(e) =>setParking(e.target.value)}></input>
                </div>
                <button type="submit" className="btn-form-add-restaurant">Add Restaurant</button>
            </form>
            <Link to="/" className="link-return">Return to Restaurant List</Link>
        </div>
    );
}

export default AddRestaurant;