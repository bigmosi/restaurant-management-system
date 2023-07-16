import React from 'react';
import {
  BrowserRouter as Router, Routes, Route, useParams,
} from 'react-router-dom';
import Navigation from './components/Navigation';
import RestaurantList from './components/RestaurantList';
import RestaurantCreate from './components/RestaurantCreate';
import RestaurantDetails from './components/RestaurantDetails';
import RestaurantUpdate from './components/RestaurantUpdate';
import RestaurantDelete from './components/RestaurantDelete';

function App() {
  const { id } = useParams();

  return (
    <Router>
      <div className="App">
        <Navigation />
        <Routes>
          <Route path="/" element={<RestaurantList />} />
          <Route path="/restaurants/create" element={<RestaurantCreate />} />
          <Route path="/restaurant/:id" element={<RestaurantDetails id={id} />} />
          <Route path="/restaurants/:id/edit" element={<RestaurantUpdate />} />
          <Route path="/restaurants/:id/delete" element={<RestaurantDelete />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
