import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useParams, useNavigate } from 'react-router-dom';
import { css } from '@emotion/react';
import { ScaleLoader } from 'react-spinners';
import axios from 'axios';
import RestaurantUpdate from './RestaurantUpdate';
import './RestaurantDetails.css';
import ConfirmationDailog from './ConfirmDialog';

function RestaurantDetails() {
  const [restaurant, setRestaurant] = useState(null);
  const [isUpdateOpen, setIsUpdateOpen] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRestaurantDetails = async () => {
      try {
        const { data } = await axios.get(`http://localhost:8080/restaurants/${id}`);
        setRestaurant(data);
        setIsLoading(false);
      } catch (error) {
        console.error(error);
        setIsLoading(false);
      }
    };

    fetchRestaurantDetails();
  }, [id]);

  const handleDelete = async () => {
    const confirmDelete = window.confirm('Are you sure you want to delete this restaurant?');
    if (confirmDelete) {
      try {
        await axios.delete(`http://localhost:8080/restaurants/${id}`);
        navigate('/');
      } catch (error) {
        console.error('Error deleting restaurant', error);
      }
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

  const handleConfirmation = () => {
    setShowConfirmation(true);
  };

  const handleConfirmDelete = () => {
    setShowConfirmation(false);
    handleDelete();
  };

  const handleCancelDelete = () => {
    setShowConfirmation(false);
  };

  const override = css`
  display: block;
  margin: 0 auto;
  border-color: red
  `;

  if (isLoading) {
    return (
      <div className="spinner-container">
        <ScaleLoader color="#36D7B7" css={override} loading={isLoading} size={120} />
      </div>
    );
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
        <button onClick={handleConfirmation} type="button">Delete</button>
        {showConfirmation && (
          <ConfirmationDailog
            message="Are you sure you want to delete this restaurant?"
            onConfirm={handleConfirmDelete}
            onCancel={handleCancelDelete}
          />
        )}
      </div>
      {isUpdateOpen && (
        <RestaurantUpdate
          restaurant={restaurant}
          onUpdate={handleUpdateSubmit}
          onCancel={handleUpdateCancel}
        />
      )}
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
