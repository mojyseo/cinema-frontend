import React from "react";
import { Outlet, NavLink } from "react-router-dom";
import styled from "styled-components";

export default function admin() {
  return (
    <>
      <h2>Welcome to Admin Panel.</h2>
      <Navbar>
        <NavLink
          to="/admin/movies"
          className={({ isActive }) => (isActive ? "active btn" : "btn")}
        >
          movies
        </NavLink>
        <NavLink
          to="/admin/rooms"
          className={({ isActive }) => (isActive ? "active btn" : "btn")}
        >
          rooms
        </NavLink>
      </Navbar>
      <Content>
        <Outlet /> {/* This will render the child routes */}
      </Content>
    </>
  );
}
const Content = styled.main`
  min-height: 60vh;
  ul {
    list-style: none;
    padding: 0;

    li {
      margin-bottom: 10px;
      padding: 15px;

      display: flex;
      justify-content: flex-start;
      align-items: center;

      button {
        margin-left: 12px;
      }
    }
  }
`;
const Navbar = styled.nav`
  display: flex;
  justify-content: flex-start;
  gap: 20px;
  margin: 20px 0;
`;
