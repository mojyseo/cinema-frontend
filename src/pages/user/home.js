import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

import useFetch from "hooks/useFetch";
import Loading from "components/Loading";
import Container from "components/containers/AppContainer";
const Home = () => {
  const { data: rooms, error, loading } = useFetch("rooms");

  if (loading) return <Loading big />;
  if (error) return <p>Error fetching rooms: {error.message}</p>;

  return (
    <Container>
      <h2>Available Rooms</h2>
      <RoomList>
        {rooms.map((room) => (
          <Link to={`/room/${room.id}`} key={room.id}>
            <RoomCard style={{ backgroundColor: room.color }}>
              <h3>{room.name}</h3>
              <p>
                movies : {room.movies.map((movie) => movie.title).join(" ,")}
              </p>
              <button
                onClick={() => {
                  /* Handle room selection or navigation */
                }}
              >
                Select Room
              </button>
            </RoomCard>
          </Link>
        ))}
      </RoomList>
    </Container>
  );
};

export default Home;

const RoomList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  * {
    text-decoration: none;
  }
`;

const RoomCard = styled.div`
  background: rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  padding: 16px;
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.2);
  backdrop-filter: blur(10px);
  transition: transform 0.2s ease; /* Smooth transition */
  width: 360px;
  max-width: 100%;
  h3,
  p,
  button {
    mix-blend-mode: difference;
  }
  &:hover {
    transform: perspective(99vw) rotateY(4deg) rotateX(4deg); /* Tilt effect */
  }
`;
