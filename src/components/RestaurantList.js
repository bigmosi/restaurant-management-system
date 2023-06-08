import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './RestaurantList.css';

function RestaurantList() {
  const [restaurants, setRestaurants] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8080/restaurants/')
      .then((response) => {
        setRestaurants(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <div className="restaurant-list">
      <h2>Restaurant List</h2>
      <ul className="restaurant-card">
        {restaurants.map((restaurant) => (
          <li key={restaurant.id} className="restaurant-title">
            <Link to={`/restaurant/${restaurant.id}`} className="restaurant-info">{restaurant.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default RestaurantList;
