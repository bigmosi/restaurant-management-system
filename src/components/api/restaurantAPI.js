const axios = require('axios');

// Function to fetch restaurant details by ID
async function getRestaurant(restaurantId) {
  try {
    const response = await axios.get(`http://localhost:8080/restaurants/${restaurantId}`);
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error('Failed to fetch restaurant details');
  }
}

// Export the functions to be used in other modules
module.exports = {
  getRestaurant,
};
