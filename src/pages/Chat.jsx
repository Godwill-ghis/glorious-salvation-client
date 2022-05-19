import React, { useEffect, useState } from "react";
import styled from "styled-components";
import ChatMessageInput from "../components/ChatMessageInput";
import ChatBody from "../components/ChatBody";
import { io } from "socket.io-client";
import { host } from "../utils/apiRoutes";
import { userData } from "../app/userSlice";
import { useSelector, useDispatch } from "react-redux";
import { messagesData, setmessages, addmessage } from "../app/messageSlice";
import Axios from "../utils/axios";
import { messageRoute } from "../utils/apiRoutes";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Helmet } from "react-helmet-async";

const Chat = () => {
  const messages = useSelector(messagesData);
  const dispatch = useDispatch();
  const user = useSelector(userData);
  const roles = [user.roles.admin, user.roles.user];
  const socket = io(host);

  const toastOptions = {
    position: "bottom-right",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };
  useEffect(() => {
    // fetch previous chat messages here
    const fetchMessage = async () => {
      try {
        await Axios.get(messageRoute)
          .then(({ data }) => {
            dispatch(setmessages(data));
            localStorage.setItem("messages", JSON.stringify(data));
          })
          .catch((error) => {
            toast.error("An error occured", toastOptions);
          });
      } catch (error) {
        toast.error("An error occured", toastOptions);
      }
    };
    fetchMessage();
    socket.emit("connected", { name: user.firstName, id: user.id });

    socket
      .off("user-joined", (data) => {
        if (data.id !== user.id) {
          return toast.info(
            `${data.name} just entered the chat room`,
            toastOptions
          );
        }
        return;
      })
      .on("user-joined", (data) => {
        if (data.id !== user.id) {
          return toast.info(
            `${data.name} just entered the chat room`,
            toastOptions
          );
        }
        return;
      });
    return () => socket.removeAllListeners();
  }, []);

  useEffect(() => {
    socket
      .off("arrival-message", (data) => {
        dispatch(addmessage(data));
      })
      .on("arrival-message", (data) => {
        dispatch(addmessage(data));
      });
    return () => socket.removeAllListeners();
  }, []);

  const handleMsg = async (message) => {
    const data = {
      name: user.firstName,
      id: user.id,
      message: message,
      time: Date.now(),
      roles,
    };
    // send this message to the server

    try {
      await Axios.post(messageRoute, data)
        .then(({ data }) => {
          // dispatch(setmessages(data));
          localStorage.setItem("messages", JSON.stringify(data));
        })
        .catch((error) => {
          toast.error("An error occured", toastOptions);
        });
    } catch (error) {
      toast.error("An error occured", toastOptions);
    }
    // send this message to other users
    socket.emit("send-message", data);
  };
  return (
    <Container>
      <Helmet>
        <title>Group Chat</title>
      </Helmet>
      <ChatBody messages={messages} user={user} />
      <MessageInput handleMsg={handleMsg} />
      <ToastContainer />
    </Container>
  );
};

const MessageInput = styled(ChatMessageInput)`
  width: 100%;
  position: fixed;
`;

const Container = styled.div`
  height: 85vh;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  @media screen and (min-width: 300px) and (max-width: 1000px) {
    width: 96vw;
    height: 75vh;
  }
`;
export default Chat;
