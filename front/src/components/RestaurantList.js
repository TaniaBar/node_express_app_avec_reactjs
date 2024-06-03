import React, {useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import RestaurantCard from './RestaurantCard';

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
            <Link to="/add-employee" className='linkAddEmployee'>Add Employee</Link>

            <div className='card-deck'>
                {restaurants.map(restaurants => (
                    <RestaurantCard key={restaurants.id} restaurants={restaurants} />
                ) )}
            </div>
            
        </div>
    );
}

export default RestaurantList;