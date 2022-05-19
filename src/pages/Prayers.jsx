import React, { useEffect } from "react";
import { Box, Container, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { setprayer, prayerData } from "../app/prayerSlice";
import { userData } from "../app/userSlice";
import Axios from "../utils/axios";
import { getPrayerRoute } from "../utils/apiRoutes";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Helmet } from "react-helmet-async";

const Prayers = () => {
  const user = useSelector(userData);
  const prayer = useSelector(prayerData);
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
        Axios.patch(getPrayerRoute, getbody)
          .then(({ data }) => {
            dispatch(setprayer(data));
            localStorage.setItem("prayer", JSON.stringify(data));
            toast.success("Prayer fetch successful", toastOptions);
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
        <title>Prayer</title>
      </Helmet>
      <Box>
        <Container
          maxWidth='sm'
          style={{
            backgroundColor: prayer?.color,
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
            {prayer.length < 1 && `No prayer yet`}
            {prayer?.body}
          </Typography>
        </Container>
      </Box>
      <ToastContainer />
    </div>
  );
};

export default Prayers;
