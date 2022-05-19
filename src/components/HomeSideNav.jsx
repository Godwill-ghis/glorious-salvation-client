import {
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import styled from "styled-components";
import Divider from "@mui/material/Divider";
import HomeIcon from "@mui/icons-material/Home";
import { NavLink } from "react-router-dom";
import ForumIcon from "@mui/icons-material/Forum";
import AccessTimeFilledIcon from "@mui/icons-material/AccessTimeFilled";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import { useSelector } from "react-redux";
import { userData } from "../app/userSlice";

const HomeSideNav = () => {
  const user = useSelector(userData);
  return (
    <Container>
      <Box>
        <nav aria-label='main mailbox folders'>
          <List sx={{ backgroundColor: "transparent" }}>
            <NavLink
              to='/'
              style={({ isActive }) => ({
                color: isActive ? "rgba(117,65,224,.8)" : "inherit",
                textDecoration: "none",
              })}
            >
              <ListItem
                sx={{
                  backgroundColor: "transparent",
                }}
              >
                <ListItemButton>
                  <ListItemIcon>
                    <HomeIcon />
                  </ListItemIcon>
                  <ListItemText primary='Home' />
                </ListItemButton>
              </ListItem>
            </NavLink>
            {user.firstName && (
              <>
                <Divider />
                <NavLink
                  to='/chat'
                  style={({ isActive }) => ({
                    color: isActive ? "rgba(117,65,224,.8)" : "inherit",
                    textDecoration: "none",
                  })}
                >
                  <ListItem>
                    <ListItemButton>
                      <ListItemIcon>
                        <ForumIcon />
                      </ListItemIcon>
                      <ListItemText primary='Chat Group' />
                    </ListItemButton>
                  </ListItem>
                </NavLink>
                <Divider />
                <NavLink
                  to='/today'
                  style={({ isActive }) => ({
                    color: isActive ? "rgba(117,65,224,.8)" : "inherit",
                    textDecoration: "none",
                  })}
                >
                  <ListItem>
                    <ListItemButton>
                      <ListItemIcon>
                        <AccessTimeFilledIcon />
                      </ListItemIcon>
                      <ListItemText primary='Today' />
                    </ListItemButton>
                  </ListItem>
                </NavLink>
                {user.roles.admin === 1000 && (
                  <>
                    <Divider />
                    <NavLink
                      to='/dashboard/addpost'
                      style={({ isActive }) => ({
                        color: isActive ? "rgba(117,65,224,.8)" : "inherit",
                        textDecoration: "none",
                      })}
                    >
                      <ListItem>
                        <ListItemButton>
                          <ListItemIcon>
                            <AdminPanelSettingsIcon />
                          </ListItemIcon>
                          <ListItemText primary='Admin Dashboard' />
                        </ListItemButton>
                      </ListItem>
                    </NavLink>
                  </>
                )}
              </>
            )}
          </List>
        </nav>
      </Box>
    </Container>
  );
};

const Container = styled.div`
  height: 85vh;
  position: fixed;
  top: 15vh;
  width: 25vw;
  @media screen and (min-width: 300px) and (max-width: 1000px) {
    display: none;
  }
`;

export default HomeSideNav;
