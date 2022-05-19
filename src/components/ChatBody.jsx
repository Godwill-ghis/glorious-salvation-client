import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import { Avatar } from "@mui/material";
import { v4 as uuidv4 } from "uuid";

const ChatMessage = ({ messages, user }) => {
  const formatYmd = (date) => date.toISOString().slice(0, 10);
  const scrollRef = useRef();
  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behaviour: "smooth" });
  }, [messages]);
  return (
    <Wrapper>
      {messages.map((message) => {
        return (
          <Container
            className={message.id === user.id ? "sender" : ""}
            ref={scrollRef}
            key={uuidv4()}
          >
            <div className='message_header'>
              <Avatar
                sx={{
                  width: 30,
                  height: 30,
                  bgcolor:
                    "#" + Math.floor(Math.random() * 19777215).toString(16),
                }}
              >
                {message.name.charAt(0).toUpperCase()}
              </Avatar>
              <span style={{ display: "block" }}>{message.name}</span>
            </div>

            <p className='content '>
              {message.message}
              <span>{`sent ${formatYmd(new Date(message?.time))}`}</span>
            </p>
          </Container>
        );
      })}
    </Wrapper>
  );
};
const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 47vw;
  height: 80vh;
  overflow-x: scroll;
  padding: 0.7em;
  &::-webkit-scrollbar {
    width: 0.4em;
  }

  &::-webkit-scrollbar-track {
    box-shadow: inset 0 0 6px rgb(117, 65, 224);
  }

  &::-webkit-scrollbar-thumb {
    background-image: linear-gradient(
      180deg,
      rgba(42, 224, 69, 0.8) 0%,
      #708ad4 99%
    );
    box-shadow: inset 2px 2px 5px 0 rgba(#fff, 0.5);
    border-radius: 100px;
  }
  @media screen and (min-width: 300px) and (max-width: 1000px) {
    width: 97vw;
    height: 70vh;
  }
  .sender {
    align-self: flex-end;
    background-color: #c0f3b6;
  }
`;

const Container = styled.div`
  width: fit-content;
  max-width: 70%;
  min-width: 250px;
  margin: 0.7em 0;
  background-color: #9186f3;
  padding: 0.6em;
  border-radius: 0.7rem;
  .content {
    overflow: break-word;
    span {
      font-size: 0.8rem;
    }
  }
  .message_header {
    background-color: #ffffff34;
    margin-bottom: 0.6rem;
    max-width: 200px;
    padding: 0.3em;
    display: flex;
    align-items: center;
    gap: 1em;
    border-radius: 0.2rem;
  }
`;
export default ChatMessage;
