import React from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Body from "../components/Body";
import Navbar from "../components/Navbar";
import SideBarMenuNav from "../components/SideBarMenuNav";
import styled from "styled-components";
import LeaderPanel from "../components/LeaderPanel";

const Dashboard = () => {
  return (
    <div>
      <Navbar></Navbar>
      <Container>
        <SideBarMenuNav />
        <Body />
        <LeaderPanel />
      </Container>
      <ToastContainer />
    </div>
  );
};

const Container = styled.main`
  display: flex;
  align-items: center;
`;

export default Dashboard;
