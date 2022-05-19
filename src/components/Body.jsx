import styled from "styled-components";
import React from "react";
import { Outlet } from "react-router-dom";

const Body = () => {
  return (
    <>
      <Container>
        <Outlet />
      </Container>
    </>
  );
};

const Container = styled.div`
  height: 85vh;
  width: 50vw;
  border: 1px solid grey;
  position: absolute;
  top: 15vh;
  left: 25vw;
  z-index: 0;
  overflow-y: scroll;
  @media screen and (min-width: 300px) and (max-width: 1000px) {
    width: 100vw;
    height: 75vh;
    left: 0;
  }
  &::-webkit-scrollbar {
    width: 0.4em;
  }

  &::-webkit-scrollbar-track {
    box-shadow: inset 0 0 6px rgb(117, 65, 224);
  }

  &::-webkit-scrollbar-thumb {
    background-image: linear-gradient(
      180deg,
      rgba(42, 224, 69, 0.8) 0%,
      #708ad4 99%
    );
    box-shadow: inset 2px 2px 5px 0 rgba(#fff, 0.5);
    border-radius: 100px;
  }
`;

export default Body;
