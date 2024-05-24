import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useParams } from 'react-router-dom';

const EditRestaurant = () => {
    const { id } = useParams();
    const [name, setName] = useState('');
    const [city, setCity] = useState('');
    const [nbcouverts, setNbcouverts] = useState('');
    const [terrasse, setTerrasse] = useState('');
    const [parking, setParking] = useState('');

    useEffect(() => {
        if (id) {
            axios.get(`/restaurant/${id}`)
            .then(response => {
                const restaurant = response.data;
                console.log("Restaurant data:", restaurant);
                if (restaurant) {
                    setName(restaurant.name || '');
                    setCity(restaurant.city || '');
                    setNbcouverts(restaurant.nbcouverts || '');
                    setTerrasse(restaurant.terrasse || '');
                    setParking(restaurant.parking || '');
                }
            })
            .catch(error => console.error("Error fetching restaurant data:", error));
        } else {
            console.error("No restaurant ID found in URL parameters.");
        }
    }, [id]);


    const handleSubmit = (e) => {
        e.preventDefault();
        const updatedRestaurant = { name, city, nbcouverts, terrasse, parking };
        axios.put(`/restaurant/${id}`, updatedRestaurant)
        .then(response => console.log(response.data))
        .catch(error => console.error(error));
    }

    return (
        <div className="div-form">
            <form onSubmit={handleSubmit} className="form-container">
                <h1 className="form-title">Edit Restaurant</h1>
                <div className="form-group">
                    <label>Name: </label>
                    <input type="text"  onChange={(e) => setName(e.target.value)} placeholder={name}></input>
                </div>
                <div className="form-group">
                    <label>City: </label>
                    <input type="text" value={city} onChange={(e) => setCity(e.target.value)}></input>
                </div>
                <div className="form-group">
                    <label>Nb of places: </label>
                    <input type="number" value={nbcouverts} onChange={(e) => setNbcouverts(e.target.value)}></input>
                </div>
                <div className="form-group">
                    <label>Terrace: </label>
                    <input type="text" value={terrasse} onChange={(e) => setTerrasse(e.target.value)}></input>
                </div>
                <div className="form-group">
                    <label>Parking: </label>
                    <input type="text" value={parking} onChange={(e) => setParking(e.target.value)}></input>
                </div>
                <button type="submit" className="btn-form-add-restaurant">Edit Restaurant</button>
            </form>
            <Link to="/" className="link-return">Return to Restaurant List</Link>
        </div>
    )
}

export default EditRestaurant;