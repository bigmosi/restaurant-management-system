import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import RestaurantUpdate from './RestaurantUpdate';

function RestaurantDetails() {
  const [restaurant, setRestaurant] = useState(null);
  const [isUpdateOpen, setIsUpdateOpen] = useState(false);
  const { id } = useParams();

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
    } catch (error) {
      console.error(error);
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

  // Add conditional rendering for when restaurant is null or still being fetched
  if (restaurant === null) {
    return <p>Loading restaurant details...</p>;
  }

  return (
    <div>
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
          Image:
          {restaurant && <img src={restaurant.image} alt={restaurant.name} />}
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
