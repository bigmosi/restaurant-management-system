import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function RestaurantDetails() {
  const { id } = useParams();
  const [restaurant, setRestaurant] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:8080/api/restaurants/${id}`)
      .then((response) => {
        setRestaurant(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.error('Error fetching restaurant', error);
      });
  }, [id]);

  // Conditional rendering to handle null restaurant object
  if (restaurant === null) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>Restaurant Details</h2>
      <p>
        Name:
        {restaurant.name}
      </p>
      <p>
        Cuisine Type:
        {restaurant.cuisineType}
      </p>
      <p>
        Location:
        {restaurant.location}
      </p>
    </div>
  );
}

export default RestaurantDetails;
