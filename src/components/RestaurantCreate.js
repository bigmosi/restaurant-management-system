import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';

const Container = styled.div`
  max-width: 600px;
  margin: 0 auto;
`;

const Form = styled.form`
  /* Todo */
`;

const InputGroup = styled.div`
  margin-bottom: 1rem;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 0.5rem;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const Button = styled.button`
  padding: 0.5rem 1rem;
  background-color: #f50057;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: #d5004f;
  }
`;

function RestaurantCreate() {
  const [name, setName] = useState('');
  const [cuisineType, setCuisineType] = useState('');
  const [location, setLocation] = useState('');
  const [image, setImage] = useState(null);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    setImage(file);
  };

  const validateForm = () => {
    const errors = {};

    if (!name.trim()) {
      errors.name = 'Restaurant name is required';
    }

    if (!cuisineType.trim()) {
      errors.cuisineType = 'Cuisine type is required';
    }

    if (!location.trim()) {
      errors.location = 'Location is required';
    }

    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const isValid = validateForm();

    if (isValid) {
      const formData = new FormData();
      formData.append('name', name);
      formData.append('cuisineType', cuisineType);
      formData.append('location', location);
      formData.append('image', image);
      axios
        .post('http://localhost:8080/restaurants', formData)
        .then((data) => {
          console.log('Restaurant created:', data);
          navigate('/');
        })
        .catch((error) => {
          console.error('Error creating restaurant:', error);
        });
    }
  };

  return (
    <Container>
      <h2>Create a New Restaurant</h2>
      <Form onSubmit={handleSubmit}>
        <InputGroup>
          <Label>Restaurant Name:</Label>
          <Input
            type="text"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          {errors.name && <span>{errors.name}</span>}
        </InputGroup>
        <InputGroup>
          <Label>Cuisine Type:</Label>
          <Input
            type="text"
            name="cuisine"
            value={cuisineType}
            onChange={(e) => setCuisineType(e.target.value)}
          />
          {errors.cuisineType && <span>{errors.cuisineType}</span>}
        </InputGroup>
        <InputGroup>
          <Label>Location:</Label>
          <Input
            type="text"
            name="location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
          {errors.location && <span>{errors.location}</span>}
        </InputGroup>
        <InputGroup>
          <Label>Upload Image:</Label>
          <Input type="file" name="image" onChange={handleImageUpload} />
        </InputGroup>
        <Button type="submit">Create Restaurant</Button>
      </Form>
    </Container>
  );
}

export default RestaurantCreate;
