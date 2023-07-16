import React from 'react';
import { useParams } from 'react-router-dom';

function RestaurantDelete() {
  const { id } = useParams();

  const handleDelete = () => {
    fetch(`/restaurants/${id}`, {
      method: 'DELETE',
    })
      .then((response) => {
        if (response.ok) {
          // Handle successful deletion
          console.log('Restaurant deleted successfully');
          // Perform any necessary actions or update the state
        } else {
          // Handle error response
          throw new Error('Failed to delete restaurant');
        }
      })
      .catch((error) => {
        // Handle error
        console.error('Error deleting restaurant:', error.message);
        // Handle the error, display an error message, or perform any necessary actions
      });
  };

  return (
    <div>
      <h2>Delete Restaurant</h2>
      <p>Are you sure you want to delete this restaurant?</p>
      <button onClick={handleDelete} type="button">Delete</button>
    </div>
  );
}

export default RestaurantDelete;
