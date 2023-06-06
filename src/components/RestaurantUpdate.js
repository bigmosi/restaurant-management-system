// RestaurantUpdate.js
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

function RestaurantUpdate() {
  const { id } = useParams();
  const [name, setName] = useState('');
  const [cuisineType, setCuisineType] = useState('');
  const [location, setLocation] = useState('');

  useEffect(() => {
    fetch(`/api/restaurants/${id}`)
      .then((response) => { response.json(); })
      .then((data) => {
        setName(data.name);
        setCuisineType(data.cuisineType);
        setLocation(data.location);
      });
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch(`/api/restaurants/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, cuisineType, location }),
    })
      .then((response) => {
        if (response.ok) {
          // Handle successful update
          console.log('Restaurant updated successfully');
          // Perform any necessary actions or update the state
        } else {
          // Handle error response
          throw new Error('Failed to update restaurant');
        }
      })
      .catch((error) => {
        // Handle error
        console.error('Error updating restaurant:', error.message);
        // Handle the error, display an error message, or perform any necessary actions
      });
  };
  return (
    <div>
      <h2>Update Restaurant</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">
          Name:
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
        </label>
        <label htmlFor="cusineType">
          Cuisine Type:
          <input type="text" value={cuisineType} onChange={(e) => setCuisineType(e.target.value)} />
        </label>
        <label htmlFor="location">
          Location:
          <input type="text" value={location} onChange={(e) => setLocation(e.target.value)} />
        </label>
        <button type="submit">Update</button>
      </form>
    </div>
  );
}

export default RestaurantUpdate;
