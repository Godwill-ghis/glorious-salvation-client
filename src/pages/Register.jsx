import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import Logo from "../assets/glorious-logos.png";
import styled from "styled-components";
import TextField from "@mui/material/TextField";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Button, FormControlLabel, Radio, RadioGroup } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import Axios from "../utils/axios";
import { registerRoute } from "../utils/apiRoutes";
import { register, userData } from "../app/userSlice";
import { useDispatch, useSelector } from "react-redux";

const Register = () => {
  const dispatch = useDispatch();
  const stateuser = useSelector(userData);

  const navigate = useNavigate();
  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    gender: "",
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
    const { password, confirmPassword, firstName, lastName, email, gender } =
      user;

    if (password !== confirmPassword) {
      toast.error("Password and confirm password should be same", toastOptions);
      return false;
    } else if (lastName.length < 3 || lastName.length > 8) {
      toast.error(
        "LastName must be more than 3 characters and less than 8 characters",
        toastOptions
      );
      return false;
    } else if (firstName.length < 3 || firstName.length > 8) {
      toast.error(
        "FirstName must be more than 3 characters and less than 8 characters",
        toastOptions
      );
      return false;
    } else if (password.length < 8) {
      toast.error("password must be more than 7 characters", toastOptions);
      return false;
    } else if (email === "") {
      toast.error("email required", toastOptions);
      return false;
    } else if (gender === "") {
      toast.error("Set your gender please", toastOptions);
      return false;
    }
    return true;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (handleValidation()) {
      const { password, firstName, lastName, email, gender } = user;
      try {
        await Axios.post(registerRoute, {
          firstName,
          lastName,
          gender,
          email,
          password,
        })
          .then(({ data }) => {
            dispatch(register(data.user));
            localStorage.setItem("user", JSON.stringify(data.user));

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
          <title>Register</title>
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
            onChange={(e) => handleChange(e)}
            value={user.firstName}
            size='small'
            required
            margin='normal'
            label='Firstname'
            name='firstName'
            id='firstName'
            helperText='Please enter firstname'
            sx={{
              width: "60vw",
              maxWidth: "100%",
            }}
          />
          <TextField
            value={user.lastName}
            onChange={(e) => handleChange(e)}
            size='small'
            required
            label='Lastname'
            name='lastName'
            id='lastname'
            margin='normal'
            helperText='Please enter lastname'
            sx={{
              width: "60vw",
              maxWidth: "100%",
            }}
          />
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
          <TextField
            value={user.confirmPassword}
            onChange={(e) => handleChange(e)}
            size='small'
            label='Confirm Password'
            name='confirmPassword'
            type='password'
            id='confirm password'
            margin='normal'
            helperText='Please Confirm your password'
            sx={{
              width: "60vw",
              maxWidth: "100%",
            }}
          />
          <RadioGroup
            value={user.gender}
            onChange={(e) => handleChange(e)}
            sx={{
              margin: "2em",
              alignSelf: "flex-start",
            }}
            name='gender'
            row
          >
            <FormControlLabel
              value='female'
              control={<Radio />}
              label='Female'
            />
            <FormControlLabel value='male' control={<Radio />} label='Male' />
          </RadioGroup>
          <ButtonStyled
            size='medium'
            sx={{
              margin: 0,
              boxShadow: "none",
              textSransform: "none",
              fontSize: 16,
              padding: "6px 12px",
              border: "1px solid",
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
              "&:focus ": {
                boxShadow: "0 0 0 0.2rem rgba(0,123,255,.5)",
              },
              alignSelf: "flex-end",
              marginBottom: "1em",
            }}
            variant='contained'
            type='submit'
          >
            Register
          </ButtonStyled>
        </form>
        <div>
          <p>
            Alredy have an account?{" "}
            <Link className='login-link' to='/login'>
              Login
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

export default Register;
