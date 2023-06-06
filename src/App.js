import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Navigation from './components/Navigation';
import RestaurantList from './components/RestaurantList';
import RestaurantCreate from './components/RestaurantCreate';
import RestaurantDetails from './components/RestaurantDetails';
import RestaurantUpdate from './components/RestaurantUpdate';
import RestaurantDelete from './components/RestaurantDelete';

function App() {
  return (
    <Router>
      <div className="App">
        <Navigation />
        <Switch>
          <Route exact path="/" component={RestaurantList} />
          <Route exact path="/restaurants/create" component={RestaurantCreate} />
          <Route exact path="/restaurants/:id" component={RestaurantDetails} />
          <Route exact path="/restaurants/:id/edit" component={RestaurantUpdate} />
          <Route exact path="/restaurants/:id/delete" component={RestaurantDelete} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
