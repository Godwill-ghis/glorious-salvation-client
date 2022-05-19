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
import AddCommentIcon from "@mui/icons-material/AddComment";
import GroupIcon from "@mui/icons-material/Group";
import AutoStoriesIcon from "@mui/icons-material/AutoStories";
import ChurchIcon from "@mui/icons-material/Church";
import HomeIcon from "@mui/icons-material/Home";
import { NavLink } from "react-router-dom";

const SideBarMenuNav = () => {
  return (
    <Container>
      <Box>
        <nav aria-label='main mailbox folders'>
          <List>
            <NavLink
              to='/'
              style={({ isActive }) => ({
                color: isActive ? "rgba(117,65,224,.8)" : "inherit",
                textDecoration: "none",
              })}
            >
              <ListItem>
                <ListItemButton>
                  <ListItemIcon>
                    <HomeIcon />
                  </ListItemIcon>
                  <ListItemText primary='Home' />
                </ListItemButton>
              </ListItem>
            </NavLink>
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
                    <AddCommentIcon />
                  </ListItemIcon>
                  <ListItemText primary='Create Post' />
                </ListItemButton>
              </ListItem>
            </NavLink>
            <Divider />
            <NavLink
              to='/dashboard/addprayer'
              style={({ isActive }) => ({
                color: isActive ? "rgba(117,65,224,.8)" : "inherit",
                textDecoration: "none",
              })}
            >
              <ListItem>
                <ListItemButton>
                  <ListItemIcon>
                    <ChurchIcon />
                  </ListItemIcon>
                  <ListItemText primary='Create a Prayer' />
                </ListItemButton>
              </ListItem>
            </NavLink>
            <Divider />
            <NavLink
              to='/dashboard/addverse'
              style={({ isActive }) => ({
                color: isActive ? "rgba(117,65,224,.8)" : "inherit",
                textDecoration: "none",
              })}
            >
              <ListItem>
                <ListItemButton>
                  <ListItemIcon>
                    <AutoStoriesIcon />
                  </ListItemIcon>
                  <ListItemText primary='Create Verse' />
                </ListItemButton>
              </ListItem>
            </NavLink>
            <Divider />
            <NavLink
              to='/dashboard/allusers'
              style={({ isActive }) => ({
                color: isActive ? "rgba(117,65,224,.8)" : "inherit",
                textDecoration: "none",
              })}
            >
              <ListItem>
                <ListItemButton>
                  <ListItemIcon>
                    <GroupIcon />
                  </ListItemIcon>
                  <ListItemText primary='Users' />
                </ListItemButton>
              </ListItem>
            </NavLink>
            <Divider />
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

export default SideBarMenuNav;
