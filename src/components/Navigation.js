import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const NavContainer = styled.nav`
  background-color: #f5f5f5;
  padding: 1rem;
`;

const NavList = styled.ul`
  list-style: none;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0;
  padding: 0;
`;

const NavItem = styled.li`
  margin: 0 0.5rem;

  &:first-child {
    margin-left: 0;
  }

  &:last-child {
    margin-right: 0;
  }
`;

const NavLink = styled(Link)`
  color: #333;
  text-decoration: none;
  padding: 0.5rem 1rem;

  &:hover {
    background-color: #eee;
  }

  &.active {
    background-color: #ddd;
    font-weight: bold;
  }
`;

const Navigation = () => (
  <NavContainer>
    <NavList>
      <NavItem>
        <NavLink to="/" exact activeClassName="active">
          All Restaurants
        </NavLink>
      </NavItem>

      <NavItem>
        <NavLink to="/restaurants/create" activeClassName="active">
          Create Restaurant
        </NavLink>
      </NavItem>
    </NavList>
  </NavContainer>
);

export default Navigation;
