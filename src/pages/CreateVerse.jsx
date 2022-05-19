import { Box } from "@mui/system";
import React, { useRef, useState } from "react";
import styled from "styled-components";
import { HexColorPicker } from "react-colorful";
import { Button, InputLabel, OutlinedInput, Typography } from "@mui/material";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch, useSelector } from "react-redux";
import { setverse } from "../app/verseSlice";
import Axios from "../utils/axios";
import { createVerseRoute } from "../utils/apiRoutes";
import { userData } from "../app/userSlice";
import { Helmet } from "react-helmet-async";

const CreateVerse = () => {
  const verseRef = useRef();
  const [color, setColor] = useState("#aabbcc");
  const [verse, setVerse] = useState("");
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
    const vverse = verse.trim();
    if (vverse.length < 1) {
      toast.error("Verse is required", toastOptions);
      return false;
    }
    return true;
  };

  const handleSubmit = async () => {
    const post = { body: verse, color, roles: role };
    try {
      if (validate()) {
        await Axios.post(createVerseRoute, post)
          .then(({ data }) => {
            const newVerse = data[0];
            localStorage.setItem("verse", JSON.stringify(newVerse));
            dispatch(setverse(newVerse));
            setVerse("");
            toast.success("Verse created successfully", toastOptions);
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
        <title>Create a Verse</title>
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
              {verse}
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
                  ref={verseRef}
                  value={verse}
                  fullWidth
                  id='outlined-adornment-amount'
                  label='Prayer'
                  onChange={(e) => setVerse(e.target.value)}
                />
                Verse
              </InputLabel>
            </div>
            <Button
              onClick={handleSubmit}
              type='submit'
              variant='contained'
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
export default CreateVerse;
