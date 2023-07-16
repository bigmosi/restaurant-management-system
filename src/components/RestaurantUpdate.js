import React, { useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { useParams } from 'react-router';

function RestaurantUpdate({ restaurant, onUpdate, onCancel }) {
  const [updatedRestaurant, setUpdatedRestaurant] = useState(restaurant);
  const { id } = useParams();

  const handleChange = (e) => {
    setUpdatedRestaurant({
      ...updatedRestaurant,
      [e.target.name]: e.target.value,
    });
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    setUpdatedRestaurant((updatedRestaurant) => ({
      ...updatedRestaurant,
      image: file,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append('image', updatedRestaurant.image);

      await axios.put(`http://localhost:8080/restaurants/${id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

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
            id="name"
            value={updatedRestaurant.name}
            onChange={handleChange}
          />
        </div>
        <div>
          <input
            type="text"
            name="cuisineType"
            id="cuisineType"
            value={updatedRestaurant.cuisineType}
            onChange={handleChange}
          />
        </div>
        <div>
          <input
            type="text"
            name="location"
            id="location"
            value={updatedRestaurant.location}
            onChange={handleChange}
          />
        </div>
        <div>
          <input type="file" name="image" onChange={handleImageUpload} />
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
