import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

function RestaurantDetails({ id }) {
  const [restaurant, setRestaurant] = useState(null);

  useEffect(() => {
    const fetchRestaurantDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/restaurants/${id}`);
        const { data } = response.data;
        setRestaurant(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchRestaurantDetails();
  }, []);

  return (
    <div>
      {restaurant ? (
        <div>
          <h2>
            {restaurant.name}
          </h2>
          <p>
            Cuisine Type:
            {restaurant.cuisineType}
          </p>
          <p>
            Location:
            {restaurant.location}
          </p>
        </div>
      ) : (
        <p>Loading restaurant details...</p>
      )}
    </div>
  );
}

RestaurantDetails.propTypes = {
  id: PropTypes.string.isRequired, // Add the prop type validation for 'id'
};

export default RestaurantDetails;
