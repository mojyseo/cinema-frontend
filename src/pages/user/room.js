import React from "react";
import { Link, useParams } from "react-router-dom";
import styled from "styled-components";

import useFetch from "hooks/useFetch";
import Loading from "components/Loading";
import Container from "components/containers/AppContainer";

const Room = () => {
  let { id } = useParams();
  const { data: room, error, loading } = useFetch(`reservation/rooms/${id}`);

  if (loading) return <Loading big />;
  if (error) return <p>Error fetching rooms: {error.message}</p>;
  if (room.message) {
    return (
      <div style={{ textAlign: "center", margin: "15vh 0" }}>
        {room.message}
        <div>
          <Link
            to="/"
            className="btn"
            style={{ width: "50%", margin: "32px auto" }}
          >
            Go Back
          </Link>
        </div>
      </div>
    );
  }

  return (
    <Container>
      <h2>Available Rooms</h2>
      <RoomList>
        {room.map((movie) => (
          <Link
            to={`/room/${movie.room_id}/seat/${movie.id}/${movie.title}`}
            key={movie.id}
          >
            <MovieCard>
              <h3>{movie.title}</h3>
              <img src={movie.poster_url} alt={movie.title} />

              <button>{movie.show_datetime}</button>
            </MovieCard>
          </Link>
        ))}
      </RoomList>
    </Container>
  );
};

export default Room;

const RoomList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  * {
    text-decoration: none;
  }
`;

const MovieCard = styled.div`
  background: rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  padding: 16px;
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.2);
  backdrop-filter: blur(10px);
  transition: transform 0.2s ease; /* Smooth transition */
  width: 290px;
  display: flex;
  flex-direction: column;
  align-items: center;
  h3 {
    margin: 6px 0 16px 0;
  }
  img {
    width: 280px;
    border-radius: 5px;
  }
  button {
    margin-top: 16px;
    width: 280px;
    font-size: 16px;
    height: 38px;
  }
  &:hover {
    transform: perspective(99vw) rotateY(4deg) rotateX(4deg); /* Tilt effect */
  }
`;
