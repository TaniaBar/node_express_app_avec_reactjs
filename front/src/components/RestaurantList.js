import React, {useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const RestaurantList = () => {
    const [restaurants, setRestaurants] = useState([]);

    useEffect(() => {
        const fetchRestaurants = async () => {
            try {
                const response = await axios.get('/restaurant');
                setRestaurants(response.data);
            } catch (error) {
                console.error('Error fetching restaurants: ', error);
            }
        }
        fetchRestaurants();
    }, []);

    return (
        <div className='restaurant-list'>
            <h1>Restaurant List</h1>
            <Link to="/add-restaurant" className='linkAddRestaurant'>Add Restaurant</Link>
            {/* <ul>
                {restaurants.map(restaurants => (
                    <li key={restaurants.id}>{restaurants.name} - {restaurants.city}</li>
                ))}
            </ul> */}
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>City</th>
                    </tr>
                </thead>
                <tbody>
                    {restaurants.map(restaurants => (
                        <tr key={restaurants.id}>
                            <td>{restaurants.name}</td>
                            <td>{restaurants.city}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            
        </div>
    );
}

export default RestaurantList;