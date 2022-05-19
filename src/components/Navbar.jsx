import styled from "styled-components";
import React from "react";
import Logo from "../assets/glorious-logos.png";
import {
  AppBar,
  Avatar,
  Box,
  Button,
  Container,
  Input,
  InputAdornment,
  Toolbar,
  Typography,
} from "@mui/material";
import { logout, userData } from "../app/userSlice";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logoutRoute } from "../utils/apiRoutes";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import Axios from "../utils/axios";

import { Link } from "react-router-dom";
import { toast } from "react-toastify";

const Navbar = () => {
  const navigate = useNavigate();
  let user = useSelector(userData);
  const dispatch = useDispatch();
  const userId = user.id;

  const toastOptions = {
    position: "bottom-right",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };

  const logoutUser = async () => {
    dispatch(logout());
    await Axios.post(logoutRoute, {
      params: {
        userId: userId,
      },
    })
      .then((res) => {
        localStorage.removeItem("user");
        navigate("/");
      })
      .catch((error) => {
        toast.error(error.response.data.message, toastOptions);
      });
  };

  return (
    <ContainerRapper>
      <AppBar
        position='static'
        sx={{
          height: "15vh",
          backgroundColor: "rgba(42, 224, 69, 0.8)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          "@media screen and (min-width: 300px) and (max-width: 1000px)": {
            backgroundColor: "#fffffff3",
          },
        }}
      >
        <Container
          maxWidth='xl'
          sx={{
            margin: 0,
            width: "100%",
          }}
        >
          <Toolbar
            disableGutters
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Link
              to='/'
              style={{
                textDecoration: "none",
                color: "#fff",
                display: "flex",
              }}
            >
              <img
                alt='logo'
                style={{
                  display: "block",
                  width: "50px",
                  height: "50px",
                }}
                src={Logo}
              ></img>
              <Typography
                variant='h6'
                noWrap
                component='a'
                sx={{
                  mr: 2,
                  display: { xs: "none", md: "flex" },
                  fontFamily: "monospace",
                  fontSize: "2rem",
                  fontWeight: 700,
                  letterSpacing: ".1rem",
                  color: "inherit",
                  textDecoration: "none",
                  marginLeft: "0.5em",
                }}
              >
                GLORIOUS SALVATION
              </Typography>
            </Link>

            <Box
              sx={{
                flexGrow: 0,
                gap: "1.5em",
                display: "flex",
                alignItems: "center",
              }}
            >
              <Input
                id='search'
                sx={{
                  width: "100%",
                  "@media screen and (min-width: 300px) and (max-width: 1000px)":
                    {
                      display: "none",
                    },
                }}
                startAdornment={
                  <InputAdornment position='start'>
                    <SearchOutlinedIcon />
                  </InputAdornment>
                }
              />
              {user.firstName && (
                <Link
                  style={{
                    textDecoration: "none",
                    color: "#fff",
                  }}
                  to='/profile'
                >
                  <Avatar
                    sx={{
                      bgcolor:
                        "#" + Math.floor(Math.random() * 19777215).toString(16),
                    }}
                  >
                    {user.firstName.charAt(0).toUpperCase()}
                  </Avatar>
                </Link>
              )}

              {user.firstName ? (
                <ButtonStyled
                  onClick={logoutUser}
                  size='large'
                  sx={{
                    margin: 0,
                    boxShadow: "none",
                    textSransform: "none",
                    fontSize: 16,
                    width: "110px",
                    padding: "6px 12px",
                    lineHeight: 1.5,
                    backgroundColor: "rgba(117,65,224,.8)",
                    fontFamily: "Roboto",
                    "&:hover": {
                      backgroundColor: "rgb(117,65,224)",
                      boxShadow: "none",
                    },
                    "&:active": {
                      boxShadow: "none",
                      backgroundColor: "rgb(117,65,224)",
                    },
                  }}
                  variant='contained'
                >
                  Logout
                </ButtonStyled>
              ) : (
                <Link
                  to='/login'
                  style={{
                    textDecoration: "none",
                  }}
                >
                  <ButtonStyled
                    size='medium'
                    sx={{
                      margin: 0,
                      boxShadow: "none",
                      textSransform: "none",
                      fontSize: 16,
                      width: "110px",
                      padding: "6px 12px",
                      lineHeight: 1.5,
                      backgroundColor: "rgba(117,65,224,.8)",
                      fontFamily: "Roboto",
                      "&:hover": {
                        backgroundColor: "rgb(117,65,224)",
                        boxShadow: "none",
                      },
                      "&:active": {
                        boxShadow: "none",
                        backgroundColor: "rgb(117,65,224)",
                      },
                    }}
                    variant='contained'
                  >
                    Login
                  </ButtonStyled>
                </Link>
              )}
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </ContainerRapper>
  );
};

const ContainerRapper = styled.nav`
  width: 100vw;
  height: 15vh;
  position: fixed;
  z-index: 1;
`;

const ButtonStyled = styled(Button)``;
export default Navbar;
