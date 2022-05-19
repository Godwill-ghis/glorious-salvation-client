import styled from "styled-components";
import React, { useEffect } from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import Axios from "../utils/axios";
import { getLeadersRoute } from "../utils/apiRoutes";
import { setleaders, leadersData } from "../app/leadersSlice";
import { useDispatch, useSelector } from "react-redux";

const LeaderPanel = () => {
  const dispatch = useDispatch();
  const leaders = useSelector(leadersData);

  useEffect(() => {
    const fetchLeaders = async () => {
      try {
        await Axios.get(getLeadersRoute)
          .then(({ data }) => {
            dispatch(setleaders(data));
            localStorage.setItem("leaders", JSON.stringify(data));
          })
          .catch((err) => {});
      } catch (error) {}
    };
    fetchLeaders();
  }, []);
  return (
    <>
      <Container>
        <List
          dense
          sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
        >
          {leaders.map((leader) => {
            const labelId = leader._id;
            return (
              <ListItem key={leader._id}>
                <ListItemButton>
                  <ListItemAvatar
                    sx={{
                      marginRight: "1em",
                    }}
                  >
                    <Avatar
                      sx={{
                        bgcolor:
                          "#" +
                          Math.floor(Math.random() * 19777215).toString(16),
                      }}
                    >
                      {leader.firstName.charAt(0).toUpperCase()}
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    id={labelId}
                    primary={`${leader.firstName} ${leader.lastName}`}
                  />
                </ListItemButton>
              </ListItem>
            );
          })}
        </List>
      </Container>
    </>
  );
};

const Container = styled.div`
  width: 25vw;
  height: 85vh;
  padding: 1em;
  right: 0;
  position: fixed;
  top: 15vh;
  @media screen and (min-width: 300px) and (max-width: 1000px) {
    display: none;
  }
`;

export default LeaderPanel;
