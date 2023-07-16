import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import RestaurantUpdate from './RestaurantUpdate';
import './RestaurantDetails.css';

function RestaurantDetails() {
  const [restaurant, setRestaurant] = useState(null);
  const [isUpdateOpen, setIsUpdateOpen] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRestaurantDetails = async () => {
      try {
        const { data } = await axios.get(`http://localhost:8080/restaurants/${id}`);
        setRestaurant(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchRestaurantDetails();
  }, [id]);
  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:8080/restaurants/${id}`);
      navigate('/');
    } catch (error) {
      console.error('Error deleting restaurant', error);
    }
  };

  const handleUpdate = async () => {
    setIsUpdateOpen(true);
  };

  const handleUpdateSubmit = (updatedRestaurant) => {
    setRestaurant(updatedRestaurant);
    setIsUpdateOpen(false);
  };

  const handleUpdateCancel = () => {
    setIsUpdateOpen(false);
  };

  if (restaurant === null) {
    return <p className="loading-indication">Loading restaurant details...</p>;
  }

  return (
    <div className="restaurant-details">
      <div>
        <h2>
          {restaurant && restaurant.name}
        </h2>
        <p>
          Cuisine Type:
          {restaurant && restaurant.cuisineType}
        </p>
        <p>
          Location:
          {restaurant && restaurant.location}
        </p>
        <p>
          {restaurant && <img src={`http://localhost:8080/uploads/${restaurant.image}`} alt={restaurant.name} />}
        </p>
        <button onClick={handleUpdate} type="button">Update</button>
        <button onClick={handleDelete} type="button">Delete</button>
      </div>
      {
        isUpdateOpen && (
          <RestaurantUpdate
            restaurant={restaurant}
            onUpdate={handleUpdateSubmit}
            onCancel={handleUpdateCancel}
          />
        )
      }
    </div>
  );
}

RestaurantDetails.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }),
  }).isRequired,
};

export default RestaurantDetails;
