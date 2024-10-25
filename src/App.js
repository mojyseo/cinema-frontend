import React from "react";
import styled from "styled-components";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  NavLink,
} from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Import the CSS for react-toastify

import Home from "pages/user/home";
import RoomPage from "pages/user/room";
import SeatPage from "pages/user/seat";

import Admin from "pages/admin";
import Rooms from "pages/admin/rooms";
import Movies from "pages/admin/movies";

function App() {
  return (
    <div className="app">
      <ToastContainer />
      <Background>
        <div className="overlay"></div>
        <img src="/images/background.jpg" alt="bg" />
      </Background>
      <Router>
        <Header>
          <h3>🎞️ Cinema Reservation</h3>
          <div>
            <NavLink
              to="/"
              className={({ isActive }) => (isActive ? "active btn" : "btn")}
            >
              Landing
            </NavLink>
            <NavLink
              to="/admin"
              className={({ isActive }) => (isActive ? "active btn" : "btn")}
            >
              Admin
            </NavLink>
          </div>
        </Header>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/room/:id" element={<RoomPage />} />
          <Route
            path="/room/:roomId/seat/:movieId/:title"
            element={<SeatPage />}
          />

          <Route path="/admin" element={<Admin />}>
            <Route path="" element={<>Please Select a Model to Continue</>} />
            <Route path="rooms" element={<Rooms />} />
            <Route path="movies" element={<Movies />} />
          </Route>
        </Routes>
      </Router>
      <Footer></Footer>
    </div>
  );
}

export default App;

const Footer = styled.div`
  height: 64px;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const Header = styled.div`
  background-color: #2b2b2b;
  color: #fff;
  margin: 16px 0;
  padding: 8px;
  background: rgba(18, 11, 9, 0.67);
  border-radius: 16px;
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(10.8px);
  border: 1px solid rgba(18, 11, 9, 0.31);
  display: flex;
  justify-content: space-between;
  align-items: center;
  > div {
    display: flex;
    .btn {
      height: 36px;
      margin-left: 7px;
    }
  }
`;
const Background = styled.div`
  .overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    overflow: hidden;
    backdrop-filter: blur(16px);
    z-index: -1;
    background-color: #120b0954;
  }
  img {
    position: absolute;
    top: 0;
    left: 0;
    z-index: -2;
    width: 100vw;
    height: 100vh;
    object-fit: cover;
  }
`;
// background: rgba(18, 11, 9, 0.67);
// border-radius: 16px;
// box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
// backdrop-filter: blur(10.8px);
// border: 1px solid rgba(18, 11, 9, 0.31);
