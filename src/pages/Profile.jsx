import { Container, List, ListItem, ListItemText } from "@mui/material";
import React from "react";
import { userData } from "../app/userSlice";
import { useSelector } from "react-redux";
import { Helmet } from "react-helmet-async";

const Profile = () => {
  const user = useSelector(userData);

  return (
    <Container maxWidth='sm'>
      <Helmet>
        <title>Profile</title>
      </Helmet>
      <List
        sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
        aria-label='contacts'
      >
        <ListItem disablePadding>
          <ListItemText primary='FirstName' />
          <ListItemText primary={user.firstName} />
        </ListItem>
        <ListItem disablePadding>
          <ListItemText primary='LastName' />
          <ListItemText primary={user.lastName} />
        </ListItem>
        <ListItem disablePadding>
          <ListItemText primary='Email' />
          <ListItemText primary={user.email} />
        </ListItem>
        <ListItem disablePadding>
          <ListItemText primary='Gender' />
          <ListItemText primary={user.gender} />
        </ListItem>
        <ListItem disablePadding>
          <ListItemText primary='Leader' />
          <ListItemText primary={user.leader} />
        </ListItem>
        <ListItem disablePadding>
          <ListItemText primary='Role' />
          <ListItemText
            primary={user.roles.admin === 1000 ? "Admin" : "User"}
          />
        </ListItem>
      </List>
    </Container>
  );
};

export default Profile;
