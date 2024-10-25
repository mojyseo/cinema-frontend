import styled from "styled-components";

const Container = styled.div`
  display: flex;
  justify-content: space-evenly;
  flex-wrap: wrap;
  > div {
    display: flex;
    flex-direction: column;
    justify-content: start;
    width: 50%;
    min-width: 240px;
  }
  label {
    margin-top: 16px;
    margin-bottom: 8px;
  }

  @media only screen and (max-width: 900px) {
    > div {
      width: 100%;
    }
  }
`;

export default Container;
