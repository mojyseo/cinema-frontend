import React from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { toast } from "react-toastify";

import axios from "lib/axios";
import useFetch from "hooks/useFetch";
import Loading from "components/Loading";
import Container from "components/containers/AppContainer";

import Chair from "assets/chair";

const Seat = () => {
  let { roomId, movieId, title } = useParams();

  const { data, error, loading, refetch } = useFetch(
    `reservations/${roomId}/${movieId}/unavailable-seats`
  );

  const handleSeatSelection = async (row_number, seat_number) => {
    // setLoading(true);
    axios
      .post("/reservations/book", {
        room_id: roomId,
        movie_id: movieId,
        row_number: row_number,
        seat_number: seat_number,
      })
      .then((res) => {
        refetch();
        toast.success(
          `Seat ${row_number + 1}-${seat_number + 1} is Booked for You!`
        );
      })
      .catch((err) => {
        console.log(err);
      });

    // setLoading(false);
  };
  if (loading) return <Loading big />;
  if (error) return <p>Error fetching rooms: {error.message}</p>;

  return (
    <Container>
      <h2>Please Choose a Seat</h2>
      <Screen>
        <div>{title}</div>
      </Screen>
      <SeatContainer>
        {data.map((row, row_number) => (
          <Row key={row_number}>
            {row.map((isTaken, seat_number) => (
              <ChairContainer
                key={`${row_number}-${seat_number}`}
                is_taken={isTaken ? "true" : null}
                onClick={() =>
                  isTaken ? {} : handleSeatSelection(row_number, seat_number)
                }
              >
                <Chair />
              </ChairContainer>
            ))}
          </Row>
        ))}
      </SeatContainer>
    </Container>
  );
};

export default Seat;

const SeatContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const Row = styled.div`
  display: flex;
  justify-content: center;
  gap: 10px;
`;

const ChairContainer = styled.div`
  cursor: pointer;
  width: 32px;
  height: 38px;
  margin-bottom: 4px;
  transition: background-color 0.3s ease;

  svg {
    width: 100%;
    height: 100%;
    object-fit: contain;
    transform: rotateZ(180deg) rotateX(7deg);
    cursor: default;
    path {
      transition: fill 0.4s ease-in-out;
      fill: ${({ is_taken }) => (is_taken ? "#ff0e0e" : "#dedede")};
    }
    :hover {
      transform: translateY(0.25px);
      fill: ${({ is_taken }) => (is_taken ? "#ff0e0e" : "#2ba930")};
      cursor: ${({ is_taken }) => (is_taken ? "not-allowed" : "pointer")};
    }
  }
`;
const Screen = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 36px;
  & > div {
    width: 500px;
    height: 150px;
    background: linear-gradient(135deg, #555, #999);
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.2rem;
    font-weight: bold;
    border-radius: 10px;
    text-align: center;
    box-shadow: 0 0 20px rgba(255, 255, 255, 0.5),
      0 0 40px rgba(255, 255, 255, 0.3), 0 0 60px rgba(255, 255, 255, 0.1);
    position: relative;

    animation: glow 3.5s ease-in-out infinite alternate;
    letter-spacing: 6px;
    font-size: 22px;
    color: #402621;
    @keyframes glow {
      from {
        box-shadow: 0 0 20px rgba(255, 255, 255, 0.5),
          0 0 40px rgba(255, 255, 255, 0.3), 0 0 60px rgba(255, 255, 255, 0.1);
      }
      to {
        box-shadow: 0 0 30px rgba(255, 255, 255, 0.8),
          0 0 50px rgba(255, 255, 255, 0.6), 0 0 80px rgba(255, 255, 255, 0.4);
      }
    }
  }
`;
