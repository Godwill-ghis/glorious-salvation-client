import { Box } from "@mui/system";
import React from "react";
import styled from "styled-components";
import HomeIcon from "@mui/icons-material/Home";
import { NavLink } from "react-router-dom";
import ForumIcon from "@mui/icons-material/Forum";
import AccessTimeFilledIcon from "@mui/icons-material/AccessTimeFilled";
import { useSelector } from "react-redux";
import { userData } from "../app/userSlice";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";

const HomeSideNav = () => {
  const user = useSelector(userData);

  const [value, setValue] = React.useState("recents");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Container>
      <Box
        sx={{
          width: "100vw",
          height: "15vh",
        }}
      >
        <BottomNavigation
          sx={{
            width: "100vw",
            height: "12vh",
            backgroundColor: "rgba(42, 224, 69, 0.8)",
            justifyContent: "space-between",
            fontFamily: "Roboto sans-serif",
            margin: 0,
          }}
          value={value}
          onChange={handleChange}
        >
          <NavLink
            to='/'
            style={({ isActive }) => ({
              color: isActive ? "rgba(117,65,224,.8)" : "inherit",
              textDecoration: "none",
            })}
          >
            <BottomNavigationAction
              label='Home'
              value='home'
              sx={{
                backgroundColore: "red",
              }}
              icon={<HomeIcon />}
            />
          </NavLink>
          {user.firstName && (
            <>
              <NavLink
                to='/chat'
                style={({ isActive }) => ({
                  color: isActive ? "rgba(117,65,224,.8)" : "inherit",
                  textDecoration: "none",
                })}
              >
                <BottomNavigationAction
                  label='Chat Group'
                  value='chat group'
                  icon={<ForumIcon />}
                />
              </NavLink>
              <NavLink
                to='/today'
                style={({ isActive }) => ({
                  color: isActive ? "rgba(117,65,224,.8)" : "inherit",
                  textDecoration: "none",
                })}
              >
                <BottomNavigationAction
                  label='Today'
                  value='today'
                  icon={<AccessTimeFilledIcon />}
                />
              </NavLink>
            </>
          )}
        </BottomNavigation>
      </Box>
    </Container>
  );
};

const Container = styled.div`
  display: none;
  position: fixed;
  top: 90vh;
  height: 10vh;
  width: 100vw;
  @media screen and (min-width: 300px) and (max-width: 1000px) {
    display: block;
  }
`;

export default HomeSideNav;
