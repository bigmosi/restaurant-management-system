import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './RestaurantList.css';
import Spinner from './Spinner';

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

  if (restaurants.length === 0) {
    return <Spinner />;
  }

  return (
    <div className="restaurant-container">
      <div className="restaurant-list">
        <h2>Restaurant Lists</h2>
        <ul className="restaurant-card">
          {restaurants.map((restaurant) => (
            <li key={restaurant.id} className="restaurant-title">
              <div className="description">
                <Link to={`/restaurant/${restaurant.id}`} className="restaurant-info">{restaurant.name}</Link>
                <p>{restaurant.location}</p>
              </div>
              {restaurant.image && (
                <img src={`http://localhost:8080/uploads/${restaurant.image}`} alt={restaurant.name} className="restaurant-image" />
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default RestaurantList;
