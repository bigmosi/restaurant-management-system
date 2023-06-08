// RestaurantUpdate.js

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

function RestaurantUpdate({ restaurant, onUpdate, onCancel }) {
  const [updatedRestaurant, setUpdatedRestaurant] = useState(restaurant);

  const handleChange = (e) => {
    setUpdatedRestaurant({
      ...updatedRestaurant,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:8080/restaurants/${restaurant.id}`, updatedRestaurant);
      onUpdate(updatedRestaurant);
    } catch (error) {
      console.error(error);
    }
  };

  const handleCancel = () => {
    onCancel();
  };

  return (
    <div>
      <h2>Update Restaurant</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <input
            type="text"
            name="name"
            id="name" // Add unique id
            value={updatedRestaurant.name}
            onChange={handleChange}
          />
        </div>
        <div>
          <input
            type="text"
            name="cuisineType"
            id="cuisineType" // Add unique id
            value={updatedRestaurant.cuisineType}
            onChange={handleChange}
          />
        </div>
        <div>
          <input
            type="text"
            name="location"
            id="location" // Add unique id
            value={updatedRestaurant.location}
            onChange={handleChange}
          />
        </div>
        <button type="submit">Update</button>
        <button type="button" onClick={handleCancel}>Cancel</button>
      </form>
    </div>
  );
}

RestaurantUpdate.propTypes = {
  restaurant: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    cuisineType: PropTypes.string.isRequired,
    location: PropTypes.string.isRequired,
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
};

export default RestaurantUpdate;
