import './App.css';
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import RestaurantList from './components/RestaurantList';
import AddRestaurant from './components/AddRestaurant';
import AddEmployee from './components/AddEmployee';

function App() {
  return (
    <Router>
      <div className='App'>
        <Routes>
          <Route path="/" element={<RestaurantList />}></Route>
          <Route path="/add-restaurant" element={<AddRestaurant />}></Route>
          <Route path="/add-employee" element={<AddEmployee />}></Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
