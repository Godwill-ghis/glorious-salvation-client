import React, { useEffect } from "react";
import { Box, Container, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { setverse, verseData } from "../app/verseSlice";
import { userData } from "../app/userSlice";
import Axios from "../utils/axios";
import { getVerseRoute } from "../utils/apiRoutes";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Helmet } from "react-helmet-async";

const Verses = () => {
  const user = useSelector(userData);
  const verse = useSelector(verseData);
  const dispatch = useDispatch();
  const roles = [user.roles.admin, user.roles.user];

  const toastOptions = {
    position: "bottom-right",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };
  useEffect(() => {
    const fetchVerse = async () => {
      const getbody = { roles };
      try {
        Axios.patch(getVerseRoute, getbody)
          .then(({ data }) => {
            dispatch(setverse(data));
            localStorage.setItem("verse", JSON.stringify(data));
            toast.success("Verse fetch successful", toastOptions);
          })
          .catch((error) => {
            toast.error(error.response.data.message, toastOptions);
          });
      } catch (error) {
        toast.error("something went wrong", toastOptions);
      }
    };
    fetchVerse();
  }, []);

  return (
    <div>
      <Helmet>
        <title>Verse</title>
      </Helmet>
      <Box>
        <Container
          maxWidth='sm'
          style={{
            backgroundColor: verse?.color,
            height: "70vh",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            borderRadius: "10px",
            boxShadow: "1px 2px 3px #333",
          }}
        >
          <Typography variant='h4' component='h1' sx={{ color: "#fff" }}>
            {verse?.body}
          </Typography>
        </Container>
      </Box>
      <ToastContainer />
    </div>
  );
};

export default Verses;
