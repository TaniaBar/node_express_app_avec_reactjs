// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { Link, useParams } from 'react-router-dom';

// const EditRestaurant = () => {
//     const { id } = useParams();
//     // console.log(id);
//     const [name, setName] = useState('');
//     const [city, setCity] = useState('');
//     const [nbcouverts, setNbcouverts] = useState('');
//     const [terrasse, setTerrasse] = useState('');
//     const [parking, setParking] = useState(''); 
 

//     useEffect(() => {
//         if (id) {
//             console.log(`Fetching data for restaurant ID: ${id}`); 
//             axios.get(`/restaurant/${id}`)
//             .then(response => {
//                 const restaurantData = response.data;
//                 console.log(restaurantData);
//                 setName(restaurantData.name);
//                 setCity(restaurantData.city);
//                 setNbcouverts(restaurantData.nbcouverts);
//                 setTerrasse(restaurantData.terrasse);
//                 setParking(restaurantData.parking);  
//             })
//             .catch(error => console.error("Error fetching restaurant data:", error));   
//         } else {
//             console.error("No restaurant ID found in URL parameters.");
//         }
//     }, [id]);
    
//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         const updatedRestaurant = { 
//             name: name,
//             city: city,
//             nbcouverts: nbcouverts,
//             terrasse: terrasse, 
//             parking: parking 
//         };
//         console.log('Updating restaurant with data:', updatedRestaurant);
//         await axios.put(`/restaurant/${id}`, updatedRestaurant)
//         .then(response =>  {
//             alert('Restaurant updated successfully'); })
//         .catch(error => console.error(error));
//     }; 

//     // console.log('restaurant data en dehor de axios.get:' + restaurantData);
    
//     return (
//         <div className="div-form">
//             <form onSubmit={handleSubmit} className="form-container">
//                 <h1 className="form-title">Edit Restaurant</h1>
//                     <div className="form-group">
//                         <label>Name: </label>
//                         <input type="text" value={name} onChange={(e) => setName(e.target.value)}></input>
//                     </div>
//                     <div className="form-group">
//                         <label>City: </label>
//                         <input type="text" value={city} onChange={(e) => setCity(e.target.value)}></input>
//                     </div>
//                     <div className="form-group">
//                         <label>Nb of places: </label>
//                         <input type="number" value={nbcouverts} onChange={(e) => setNbcouverts(e.target.value)}></input>
//                     </div>
//                     <div className="form-group">
//                         <label>Terrace: </label>
//                         <input type="text" value={terrasse} onChange={(e) => setTerrasse(e.target.value)}></input>
//                     </div>
//                     <div className="form-group">
//                         <label>Parking: </label>
//                         <input type="text" value={parking} onChange={(e) => setParking(e.target.value)}></input>
//                     </div>
//                     <button type="submit" className="btn-form-add-restaurant">Edit Restaurant</button>
//             </form>
//             <Link to="/" className="link-return">Return to Restaurant List</Link>
//         </div>
//     );
// }

// export default EditRestaurant;

import { useEffect, useState } from "react";
import axios from "axios";
import { useParams, Link } from "react-router-dom";

export default function EditRestaurant() {
    const { id } = useParams();
    console.log('console restId: ' + id);

    const [restaurant, setRestaurant] = useState({
        name: '',
        city: '',
        nbcouverts: '',
        terrasse: '',
        parking: ''
    });

    const handleChange = (e) => {
        setRestaurant({
            ...restaurant,
            [e.target.name]: e.target.value
        });
    }

    useEffect(() => {
        console.log(`Sending GET request to /restaurant/${id}`);
        axios.get(`/restaurant/${id}`)
        .then(response => {
            console.log('Received response:', response);
            const restaurantData = response.data[0];
            setRestaurant({
                name: restaurantData.name,
                city: restaurantData.city,
                nbcouverts: restaurantData.nbcouverts,
                terrasse: restaurantData.terrasse,
                parking: restaurantData.parking
            });
        })
        .catch(error => { 
            console.error('Error occurred:', error);
        });
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await axios.put(`http://localhost:5000/restaurant/${id}`, restaurant);

        if(response.status === 200) {
            console.log('put ok');
        } else {
            console.log('error put');
        }
    }

    return (
        <div className="div-form">
            {restaurant.name ? (

            
            <form onSubmit={handleSubmit} className="form-container">
                <h1 className="form-title">Edit Restaurant</h1>
                    <div className="form-group">
                        <label>Name: </label>
                        <input 
                            type="text" 
                            name="name"
                            value={restaurant.name} 
                            onChange={handleChange}
                            required
                        ></input>
                    </div>
                    <div className="form-group">
                        <label>City: </label>
                        <input 
                            type="text" 
                            name="city"
                            value={restaurant.city} 
                            onChange={handleChange}
                            required
                        ></input>
                    </div>
                    <div className="form-group">
                        <label>Nb of places: </label>
                        <input 
                            type="number" 
                            name="nbcouverts"
                            value={restaurant.nbcouverts} 
                            onChange={handleChange}
                            required
                        ></input>
                    </div>
                    <div className="form-group">
                        <label>Terrace: </label>
                        <input 
                            type="text" 
                            name="terrasse"
                            value={restaurant.terrasse} 
                            onChange={handleChange}
                            required
                        ></input>
                    </div>
                    <div className="form-group">
                        <label>Parking: </label>
                        <input 
                            type="text" 
                            name="parking"
                            value={restaurant.parking} 
                            onChange={handleChange}
                            required
                        ></input>
                    </div>
                    <button type="submit" className="btn-form-add-restaurant">Edit Restaurant</button>
            </form>
            ) : (
                <p>...Loading</p>
            )}
            <Link to="/" className="link-return">Return to Restaurant List</Link>
        </div>
    );
}

