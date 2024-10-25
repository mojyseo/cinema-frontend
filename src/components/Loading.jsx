import React from "react";
import styled from "styled-components";

export default function Loading({ big }) {
  return (
    <Container big={big ? "true" : null}>
      <div className="loader" />
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  justify-content: center;
  margin: ${({ big }) => (big ? "25vh 0" : "3rem 0")};
  .loader {
    position: relative;
    width: 48px;
    height: 48px;
    background: rgba(180, 3, 3, 0.4);
    transform: rotateX(65deg) rotate(45deg);
    // remove bellows command for perspective change
    //transform: perspective(200px) rotateX(65deg) rotate(45deg);
    color: #fff;
    animation: layers1 1s linear infinite alternate;
  }
  .loader:after {
    content: "";
    position: absolute;
    inset: 0;
    background: rgba(255, 255, 255, 0.7);
    animation: layerTr 1s linear infinite alternate;
  }

  @keyframes layers1 {
    0% {
      box-shadow: 0px 0px 0 0px;
    }
    90%,
    100% {
      box-shadow: 20px 20px 0 -4px;
    }
  }
  @keyframes layerTr {
    0% {
      transform: translate(0, 0) scale(1);
    }
    100% {
      transform: translate(-25px, -25px) scale(1);
    }
  }
`;
