import React from 'react';
import { shallow } from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16';
import RestaurantCreate from './RestaurantCreate';

Enzyme.configure({ adapter: new EnzymeAdapter() });

describe('RestaurantCreate', () => {
  test('renders without error', () => {
    const wrapper = shallow(<RestaurantCreate />);
    expect(wrapper.length).toBe(1);
  });

  test('handles form submission', () => {
    const wrapper = shallow(<RestaurantCreate />);
    const form = wrapper.find('form');

    form.simulate('submit', { preventDefault() {} });

    const successMessage = wrapper.find('.success-message');
    expect(successMessage.length).toBe(1);
    
    const axiosMock = new axiosMockAdapter(axios);
    axiosMock.onPost('http://localhost:8080/restaurants').reply(200, { success: true });

    expect(axiosMock.history.post.length).toBe(1);
  });
});
