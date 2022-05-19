import { Button, IconButton, InputLabel, OutlinedInput } from "@mui/material";
import React, { useState, useRef } from "react";
import styled from "styled-components";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import { useDispatch, useSelector } from "react-redux";
import { postsData, editpost } from "../app/postsSlice";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { userData } from "../app/userSlice";
import Axios from "../utils/axios";
import { createPostRoute } from "../utils/apiRoutes";
import { useParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";

const Input = styled.input`
  display: none;
`;

const EditPost = () => {
  const postTitleRef = useRef();
  const postBodyRef = useRef();
  const { id } = useParams();
  const posts = useSelector(postsData);
  const thisPost = posts.find((post) => post._id === id);
  const [previewSource, setPreviewSource] = useState("");
  const [postImageState, setPostImageState] = useState("");

  const [postTitle, setPostTitle] = useState(thisPost.title);

  const [postBody, setPostBody] = useState(thisPost.body);

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
    if (!previewSource || previewSource.length < 1) {
      toast.error("A post Image is required", toast);
      return false;
    } else if (postTitle.length < 1) {
      toast.error("Title for this post is required", toastOptions);
      return false;
    } else if (postBody.length < 1) {
      toast.error("A post is required", toastOptions);
      return false;
    }
    return true;
  };

  const handleImageInputChange = (e) => {
    const file = e.target.files[0];
    previewFile(file);
  };

  const previewFile = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setPreviewSource(reader.result);
    };
  };

  const upLoadPost = async (base64EncodedImage) => {
    const post = {
      title: postTitle,
      body: postBody,
      image: base64EncodedImage,
      by: currentUser.id,
      roles: role,
      id,
    };

    try {
      if (validate()) {
        await Axios.patch(createPostRoute, post)
          .then(({ data }) => {
            dispatch(editpost({ value: data, postId: id }));
            const localstoragePost = JSON.parse(localStorage.getItem("posts"));
            localstoragePost.map((post) => {
              if (post._id === id) {
                return (post = data);
              }
              return post;
            });
            localStorage.setItem("posts", JSON.stringify(localstoragePost));
            toast.success("Post Edited successfully", toastOptions);
            postTitleRef.current.value = "";
            postBodyRef.current.value = "";
          })
          .catch((error) => {
            toast.error(error.response.data.message, toastOptions);
          });
      }
    } catch (error) {
      toast.error("Something went Wrong", toastOptions);
    }
  };

  const handleSubmitPost = (e) => {
    e.preventDefault();
    if (!previewSource) return;
    upLoadPost(previewSource);
  };

  return (
    <Container>
      <Helmet>
        <title>Edit Post</title>
      </Helmet>
      <form onSubmit={handleSubmitPost}>
        <InputLabel htmlFor='outlined-adornment-amount' required>
          Post Title
        </InputLabel>
        <OutlinedInput
          ref={postTitleRef}
          fullWidth
          name='title'
          id='outlined-adornment-amount'
          label='Title'
          onChange={(e) => setPostTitle(e.target.value)}
          value={postTitle}
        />
        <PostBody
          ref={postBodyRef}
          required
          placeholder='Write you Post here'
          onChange={(e) => setPostBody(e.target.value)}
          value={postBody}
        />
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <label htmlFor='icon-button-file'>
            <Input
              accept='image/*'
              id='icon-button-file'
              type='file'
              name='image'
              onChange={handleImageInputChange}
              value={postImageState}
            />
            <IconButton
              color='primary'
              aria-label='upload picture'
              component='span'
            >
              <PhotoCamera
                sx={{
                  color: "rgb(117,65,224)",
                  fontSize: "40px",
                }}
              />
            </IconButton>
          </label>
          <Button
            type='submit'
            variant='contained'
            sx={{
              backgroundColor: "rgb(117,65,224)",
            }}
            component='button'
          >
            Create
          </Button>
        </div>
      </form>
      <ToastContainer />
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  height: 100%;
  padding: 2em;
`;

const PostBody = styled.textarea`
  width: 100%;
  height: 50vh;
  margin: 2em 0;
  padding: 1em;
  font-family: "Roboto" sans-serif;
  font-size: 1.1rem;
  &:focus {
    outline: none;
  }
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
`;

export default EditPost;
