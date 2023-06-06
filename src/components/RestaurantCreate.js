import React, { useState } from 'react';
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

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:8080/api/restaurants', {
      name,
      cuisineType,
      location,
    })
      .then((data) => {
        console.log('Restaurant created:', data);
      })
      .catch((error) => {
        console.error('Error creating restaurant:', error);
      });
  };

  return (
    <Container>
      <h2>Create a New Restaurant</h2>
      <Form onSubmit={handleSubmit}>
        <InputGroup>
          <Label>Restaurant Name:</Label>
          <Input type="text" name="name" value={name} onChange={(e) => setName(e.target.value)} />
        </InputGroup>
        <InputGroup>
          <Label>Cuisine Type:</Label>
          <Input type="text" name="cuisine" value={cuisineType} onChange={(e) => setCuisineType(e.target.value)} />
        </InputGroup>
        <InputGroup>
          <Label>Location:</Label>
          <Input type="text" name="location" value={location} onChange={(e) => setLocation(e.target.value)} />
        </InputGroup>
        <Button type="submit">Create Restaurant</Button>
      </Form>
    </Container>
  );
}

export default RestaurantCreate;
