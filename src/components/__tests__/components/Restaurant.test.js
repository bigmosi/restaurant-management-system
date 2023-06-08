const axios = require('axios');
const { getRestaurant } = require('../../api/restaurantAPI');

jest.mock('axios');

test('getRestaurant should fetch restaurant data from the server', async () => {
  const mockResponse = {
    data: {
      id: 'abc123',
      name: 'Restaurant A',
      cuisineType: 'Italian',
      location: 'New York',
    },
  };

  axios.get.mockResolvedValue(mockResponse);

  const restaurant = await getRestaurant('abc123');

  expect(axios.get).toHaveBeenCalledWith('http://localhost:8080/restaurants/abc123');
  expect(restaurant).toEqual(mockResponse.data);
});
