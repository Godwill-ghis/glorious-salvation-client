import React from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Body from "../components/Body";
import Navbar from "../components/Navbar";
import styled from "styled-components";
import LeaderPanel from "../components/LeaderPanel";
import HomeSideNav from "../components/HomeSideNav";
import BottoNav from "../components/BottomNav";

const Home = () => {
  return (
    <div>
      <Navbar></Navbar>
      <Container>
        <HomeSideNav />
        <Body />
        <LeaderPanel />
      </Container>
      <BottoNav />
      <ToastContainer />
    </div>
  );
};

const Container = styled.main`
  display: flex;
  align-items: center;
`;

export default Home;
