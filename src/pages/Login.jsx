import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import Logo from "../assets/glorious-logos.png";
import styled from "styled-components";
import TextField from "@mui/material/TextField";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Button } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import Axios from "../utils/axios";
import { loginRoute } from "../utils/apiRoutes";
import { login, userData } from "../app/userSlice";
import { useDispatch, useSelector } from "react-redux";

const Login = () => {
  const dispatch = useDispatch();
  const stateuser = useSelector(userData);
  const navigate = useNavigate();
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const toastOptions = {
    position: "bottom-right",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };

  useEffect(() => {
    if (stateuser.firstName) {
      navigate("/");
    }
  }, [stateuser]);

  const handleChange = (event) => {
    setUser({ ...user, [event.target.name]: event.target.value });
  };

  const handleValidation = () => {
    const { password, email } = user;

    if (password === "") {
      toast.error("Email and password are required", toastOptions);
      return false;
    } else if (email === "") {
      toast.error("Email and password are required", toastOptions);
      return false;
    }
    return true;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (handleValidation()) {
      const { password, email } = user;
      try {
        await Axios.post(loginRoute, {
          email,
          password,
        })
          .then(({ data }) => {
            const user = { ...data.user, accessToken: data.accessToken };
            dispatch(login(user));
            localStorage.setItem("user", JSON.stringify(user));

            navigate("/");
          })
          .catch((error) => {
            toast.error(error.response.data.message, toastOptions);
          });
      } catch (error) {
        toast.error("something went wrong", toastOptions);
      }
    }
  };

  return (
    <Rapper>
      <Container>
        <Helmet>
          <title>Login</title>
        </Helmet>
        <div className='logo'>
          <Link to='/' style={{ cursor: "pointer" }}>
            <img src={Logo} alt='Logo' className='image' />
          </Link>
        </div>
        <form
          className='register-form'
          onSubmit={(event) => handleSubmit(event)}
        >
          <TextField
            value={user.email}
            onChange={(e) => handleChange(e)}
            size='small'
            required
            label='Email'
            name='email'
            type='email'
            id='email'
            margin='normal'
            helperText='Please enter email'
            sx={{
              width: "60vw",
              maxWidth: "100%",
            }}
          />
          <TextField
            value={user.password}
            onChange={(e) => handleChange(e)}
            size='small'
            label='Password'
            name='password'
            type='password'
            id='password'
            margin='normal'
            helperText='Please enter password'
            sx={{
              width: "60vw",
              maxWidth: "100%",
            }}
          />
          <ButtonStyled
            size='medium'
            sx={{
              margin: 0,
              boxShadow: "none",
              textSransform: "none",
              fontSize: 16,
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
            type='submit'
          >
            Login
          </ButtonStyled>
        </form>
        <div>
          <p>
            Dont't have an account?{" "}
            <Link className='login-link' to='/register'>
              Register
            </Link>
          </p>
        </div>
        <ToastContainer />
      </Container>
    </Rapper>
  );
};

const Container = styled.div`
  background-color: #fff;
  width: 60vw;
  height: 95vh;
  display: flex;
  align-items: center;

  flex-direction: column;
  padding: 1em;
  .logo {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 2em;
    .image {
      width: 80px;
      height: 80px;
    }
  }
  .register-form {
    display: flex;
    width: 100%;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    padding: 1em;
  }
  div p {
    font-size: 1rem;
  }
  @media screen and (min-width: 300px) and (max-width: 1000px) {
    width: 100vw;
    height: 95vh;
    padding: 0;
    .logo {
      margin-bottom: 1em;
    }
    .register-form {
      padding: 1em;
      margin: 0;
      width: 100vw;
      div {
        width: 80vw;
      }
    }
  }
`;

const Rapper = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ButtonStyled = styled(Button)``;

export default Login;
