import { useEffect, useState } from "react";
import axios from "axios";
import { useParams, Link } from "react-router-dom";
import '../style/EditRestaurant.css';

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
                    <button type="submit" className="btn-form-edit-restaurant">Edit Restaurant</button>
            </form>
            ) : (
                <p>...Loading</p>
            )}
            <Link to="/" className="link-return">Return to Restaurant List</Link>
        </div>
    );
}

