import React, {useState, useEffect } from 'react';
import axios from 'axios';

const RestaurantList = () => {
    const [restaurants, setRestaurants] = useState([]);

    useEffect(() => {
        axios.get('/restaurant')
        .then(response => setRestaurants(response.data))
        .catch(error => console.error(error));
    }, []);

    return (
        <div>
            <h1>Restaurant List</h1>
            <ul>
                {restaurants.map(restaurants => (
                    <li key={restaurants.id}>{restaurants.name} - {restaurants.city}</li>
                ))}
            </ul>
        </div>
    );
}

export default RestaurantList;