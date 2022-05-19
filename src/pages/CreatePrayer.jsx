import { Box } from "@mui/system";
import React, { useState } from "react";
import styled from "styled-components";
import { HexColorPicker } from "react-colorful";
import { Button, InputLabel, OutlinedInput, Typography } from "@mui/material";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch, useSelector } from "react-redux";
import { setprayer } from "../app/prayerSlice";
import Axios from "../utils/axios";
import { createPrayerRoute } from "../utils/apiRoutes";
import { userData } from "../app/userSlice";
import { Helmet } from "react-helmet-async";

const CreatePrayer = () => {
  const [color, setColor] = useState("#aabbcc");
  const [prayer, setPrayer] = useState("");
  const dispatch = useDispatch();

  const currentUser = useSelector(userData);
  const user_roles = currentUser.roles;
  const role = [user_roles.admin, user_roles.user];

  const toastOptions = {
    position: "bottom-right",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };

  const validate = () => {
    const vprayer = prayer.trim();
    if (vprayer.length < 1) {
      toast.error("Prayer is required", toastOptions);
      return false;
    }
    return true;
  };

  const handleSubmit = async () => {
    const post = { body: prayer, color, roles: role };
    try {
      if (validate()) {
        await Axios.post(createPrayerRoute, post)
          .then(({ data }) => {
            const newPrayer = data[0];
            localStorage.setItem("prayer", JSON.stringify(newPrayer));
            dispatch(setprayer(newPrayer));
            setPrayer("");
            toast.success("Prayer created successfully", toastOptions);
          })
          .catch((error) => {
            toast.error(error.response.data.message, toastOptions);
          });
      }
    } catch (error) {
      toast.error("an error occured", toastOptions);
    }
  };
  return (
    <Wrapper>
      <Helmet>
        <title>Create a Prayer</title>
      </Helmet>
      <Container>
        <div className='main'>
          <Box
            sx={{
              boxShadow: "1px 2px 1px grey",
              borderRadius: "15px",
              textAlign: "center",
              display: "flex",
              alignItem: "center",
              justifyContent: "center",
              height: "65vh",
              width: "40vw",
              backgroundColor: color,
              marginBottom: "2em",
            }}
          >
            <Typography
              variant='h5'
              component='h2'
              sx={{
                padding: "3em",
                color: "#fff",
                opacity: "0.8",
                lineHeight: "1.7",
              }}
            >
              {prayer}
            </Typography>
          </Box>
          <Box
            sx={{
              width: "100%",
              display: "flex",
              alignItems: "center",
              gap: "2em",
            }}
          >
            <HexColorPicker
              style={{ width: "150px", height: "150px" }}
              color={color}
              onChange={setColor}
            />
            <div>
              <InputLabel htmlFor='outlined-adornment-amount' required>
                <OutlinedInput
                  value={prayer}
                  fullWidth
                  id='outlined-adornment-amount'
                  label='Prayer'
                  onChange={(e) => setPrayer(e.target.value)}
                />
                Prayer
              </InputLabel>
            </div>
            <Button
              type='submit'
              variant='contained'
              onClick={handleSubmit}
              sx={{
                backgroundColor: "rgb(117,65,224)",
              }}
              component='button'
            >
              Create
            </Button>
          </Box>
        </div>
      </Container>
      <ToastContainer />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;
const Container = styled.div`
  width: 47vw;
  .main {
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-direction: column;
  }
`;
export default CreatePrayer;
