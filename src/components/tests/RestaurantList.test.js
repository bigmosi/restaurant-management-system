import { render, screen } from '@testing-library/react';
import axios from 'axios';
import RestaurantList from '../RestaurantList';

// Mock the axios get method
jest.mock('axios');

describe('RestaurantList', () => {
  test('renders "Empty Restaurant Lists" when no restaurants are available', async () => {
    // Mock the axios get response with an empty array
    axios.get.mockResolvedValue({ data: [] });

    render(<RestaurantList />);

    const emptyListText = await screen.findByText('Empty Restaurant Lists');
    expect(emptyListText).toBeInTheDocument();
  });

  test('renders restaurant names and locations when restaurants are available', async () => {
    // Mock the axios get response with sample restaurant data
    const mockRestaurants = [
      { id: 1, name: 'Restaurant 1', location: 'Location 1', image: 'image1.jpg' },
      { id: 2, name: 'Restaurant 2', location: 'Location 2', image: 'image2.jpg' },
    ];
    axios.get.mockResolvedValue({ data: mockRestaurants });

    render(<RestaurantList />);

    // Verify that restaurant names and locations are rendered
    const restaurant1Name = await screen.findByText('Restaurant 1');
    expect(restaurant1Name).toBeInTheDocument();
    const restaurant1Location = screen.getByText('Location 1');
    expect(restaurant1Location).toBeInTheDocument();

    const restaurant2Name = screen.getByText('Restaurant 2');
    expect(restaurant2Name).toBeInTheDocument();
    const restaurant2Location = screen.getByText('Location 2');
    expect(restaurant2Location).toBeInTheDocument();
  });

  test('renders restaurant images when available', async () => {
    // Mock the axios get response with sample restaurant data containing images
    const mockRestaurants = [
      { id: 1, name: 'Restaurant 1', location: 'Location 1', image: 'image1.jpg' },
      { id: 2, name: 'Restaurant 2', location: 'Location 2', image: 'image2.jpg' },
    ];
    axios.get.mockResolvedValue({ data: mockRestaurants });

    render(<RestaurantList />);

    // Verify that restaurant images are rendered
    const restaurant1Image = await screen.findByAltText('Restaurant 1');
    expect(restaurant1Image).toBeInTheDocument();
    const restaurant2Image = screen.getByAltText('Restaurant 2');
    expect(restaurant2Image).toBeInTheDocument();
  });
});
