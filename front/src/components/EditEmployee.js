import { useState, useEffect } from "react";
import axios from "axios";
import { Link, useParams } from 'react-router-dom';
import '../style/EditEmployee.css';

export default function EditEmployee() {
    const { idEmployee, id } = useParams();
    console.log('console rest id: ' + id);
    console.log('console employee id: ' + idEmployee); 

    const [employee, setEmployee] = useState({
        firstname: '',
        lastname: '',
        hire_date: '',
        restaurant_id: ''
    });

    const [restaurants, setRestaurants] = useState([]);

    const handleChange = (e) => {
        
        setEmployee(employee => ({
            ...employee,
            [e.target.name]: e.target.value
        }));
    }

    const formatDate = (dateStr) => {
        const [day, month, year] = dateStr.split('-');
        return `${year}-${month}-${day}`;
    }

    useEffect(() => {
        const fetchEmployee = async () => {
            console.log(`Sending GET request to /restaurant/${id}/employees/${idEmployee}`);
            axios.get(`/restaurant/${id}/employees/${idEmployee}`)
            .then(response => {
                console.log('Received response:', response);
                const EmployeeData = response.data[0];
                setEmployee({
                    firstname: EmployeeData.first_name,
                    lastname: EmployeeData.last_name,
                    hire_date: formatDate(EmployeeData.hire_date),
                    restaurant_id: EmployeeData.restaurantId
                });
            })
            .catch(error => {
                console.error('error occurred: ', error);
            })
        }

        const fetchRestaurants = async () => {
            try {
                const response = await axios.get('/restaurant');
                setRestaurants(response.data);
            } catch (error) {
                console.error('Error occurred while fetching restaurants:', error);
                
            }
        };
        fetchEmployee();
        fetchRestaurants();

    }, [idEmployee, id]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log( employee);
        try {
            const response = await axios.put(`http://localhost:5000/restaurant/${id}/employees/${idEmployee}`, {
                first_name: employee.firstname,
                last_name: employee.lastname,
                hire_date: employee.hire_date,
                restaurant_id: employee.restaurant_id
            });

            if(response.status === 200) {
                console.log('put ok');
            } else {
                console.log('error put');
            }
        } catch {
            console.log('error in PUT request: ');
        }
        
    }

    return (
        <div className="div-form">
            {employee.firstname ? (

            
            <form onSubmit={handleSubmit} className="form-container">
                <h1 className="form-title">Edit Employee</h1>
                <div className="form-group">
                    <label>Firstname: </label>
                    <input
                        type="text"
                        name="firstname"
                        value={employee.firstname}
                        onChange={handleChange}
                        required
                    ></input>
                </div>
                <div className="form-group">
                    <label>Lastname: </label>
                    <input
                        type="text"
                        name="lastname"
                        value={employee.lastname}
                        onChange={handleChange}
                        required
                    ></input>
                </div>
                <div className="form-group">
                    <label>Hire-date: </label>
                    <input
                        type="date"
                        name="hire_date"
                        value={employee.hire_date}
                        onChange={handleChange}
                        required
                    ></input>
                </div>
                <div className="form-group">
                    <label>Restaurant: </label>
                    <select
                        name="restaurant_id"
                        className="form-input"
                        value={employee.restaurant_id}
                        onChange={handleChange}
                        required
                    >
                        <option value="">Select a restaurant</option>
                        {restaurants.map((restaurant) => (
                            <option key={restaurant.id} value={restaurant.id}>
                                {restaurant.name}
                            </option>
                        ))}
                    </select>
                </div>
                <button type="submit" className="btn-form-edit-employee">Edit Employee</button>
            </form>
            ) : (
                <p>...Loading</p>
            )}
            <Link to="/" className="link-return">Return to Restaurant List</Link>
        </div>
    );
}
