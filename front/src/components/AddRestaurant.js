import React, { useState} from "react";
import axios from "axios";

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
        <form onSubmit={handleSubmit}>
            <h1>Add Restaurant</h1>
            <div>
                <label>Name: </label>
                <input type="text" value={name} onChange={(e) => setName(e.target.value)}></input>
            </div>
            <div>
                <label>City: </label>
                <input type="text" value={city} onChange={(e) =>setCity(e.target.value)}></input>
            </div>
            <div>
                <label>Nb couverts: </label>
                <input type="number" value={nbcouverts} onChange={(e) =>setNbcouverts(e.target.value)}></input>
            </div>
            <div>
                <label>Terrasse: </label>
                <input type="text" value={terrasse} onChange={(e) =>setTerrasse(e.target.value)}></input>
            </div>
            <div>
                <label>Parking: </label>
                <input type="text" value={parking} onChange={(e) =>setParking(e.target.value)}></input>
            </div>
            <button type="submit">Add Restaurant</button>
        </form>
    );
}

export default AddRestaurant;