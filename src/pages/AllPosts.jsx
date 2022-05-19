import React, { useEffect } from "react";
import st from "styled-components";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { Helmet } from "react-helmet-async";
import {
  postsData,
  deletepost,
  setposts,
  likepost,
  unlikepost,
} from "../app/postsSlice";
import { useDispatch, useSelector } from "react-redux";
import {
  getPostsRoute,
  likePostsRoute,
  createPostRoute,
} from "../utils/apiRoutes";
import Axios from "../utils/axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Container } from "@mui/material";
import { Cloudinary } from "@cloudinary/url-gen";
import { AdvancedImage, responsive } from "@cloudinary/react";
import { fill } from "@cloudinary/url-gen/actions/resize";
import { Link } from "react-router-dom";
import { userData } from "../app/userSlice";
import MarkChatReadIcon from "@mui/icons-material/MarkChatRead";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

const AllPosts = () => {
  const posts = useSelector(postsData);
  const dispatch = useDispatch();
  const user = useSelector(userData);

  const myCld = new Cloudinary({
    cloud: {
      cloudName: "godwillmycloud",
    },
  });

  const toastOptions = {
    position: "bottom-right",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };
  const formatYmd = (date) => date.toISOString().slice(0, 10);
  const roles = [user?.roles?.admin, user?.roles?.user];

  const likePost = async (postId, userId) => {
    try {
      const body = { by: userId, postId, roles };
      await Axios.post(likePostsRoute, body)
        .then(({ data }) => {
          dispatch(likepost({ postId, data }));

          const localPost = JSON.parse(localStorage.getItem("posts"));

          localPost.find((post) => post._id === postId).likes.push(data);
          localStorage.setItem("posts", JSON.stringify(localPost));
          toast.success("Post Like was successfull", toastOptions);
        })
        .catch((error) => {
          toast.error(error.response.data.message, toastOptions);
        });
    } catch (error) {
      toast.error("an error occured trying to like post", toastOptions);
    }
  };

  const deletePost = async (postId) => {
    try {
      const deleteBody = { roles };
      await Axios.delete(`${createPostRoute}/${postId}`, { data: deleteBody })
        .then((res) => {
          dispatch(deletepost(postId));
          const loPosts = JSON.parse(localStorage.getItem("posts"));
          loPosts.filter((post) => post._id !== postId);
          localStorage.setItem("posts", JSON.stringify(loPosts));
          toast.success("post delete was successful", toastOptions);
        })
        .catch((error) => {
          toast.error(error?.response?.data?.message, toastOptions);
        });
    } catch (error) {
      toast.error("an error occured while trying to delete post", toastOptions);
    }
  };

  const unlikePost = async (postId, likeId) => {
    try {
      const deletebody = { postId, roles, likeId };
      Axios.delete(likePostsRoute, { data: deletebody })
        .then((res) => {
          dispatch(unlikepost({ postId, likeId }));
          const localpostsinstance = JSON.parse(localStorage.getItem("posts"));
          const postIn = localpostsinstance
            .find((post) => post._id === postId)
            .likes.findIndex((like) => like._id === likeId);
          localpostsinstance
            .find((post) => post._id === postId)
            .likes.splice(postIn, 1);
          localStorage.setItem("posts", JSON.stringify(localpostsinstance));
          toast.success("post Unlike successful", toastOptions);
        })
        .catch((error) => {
          toast.error(error?.response?.data?.message, toastOptions);
        });
    } catch (error) {
      toast.error("an error occured while trying to unlike post", toastOptions);
    }
  };

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();
    const fetchPosts = async () => {
      try {
        await Axios.get(getPostsRoute, { signal: controller.signal })
          .then(({ data }) => {
            isMounted && dispatch(setposts(data));
            localStorage.setItem("posts", JSON.stringify(data));
            toast.success("Posts fetched successful", toastOptions);
          })
          .catch((error) => {
            toast.error(error.response.data.message, toastOptions);
          });
      } catch (error) {
        toast.error("something went wrong trying to fetch posts", toastOptions);
      }
    };
    fetchPosts();
    return () => {
      isMounted = false;
      controller.abort();
    };
  }, []);
  return (
    <Contain>
      <Helmet>
        <title>Posts</title>
      </Helmet>
      {posts.length < 1 ? (
        <Container>
          <Typography variant='h5' component='h4'>
            There is no Posts yet check back later
          </Typography>
        </Container>
      ) : (
        posts.map((post) => {
          return (
            <Card key={post._id} sx={{ maxWidth: "100%", marginBottom: "2em" }}>
              <CardHeader
                avatar={
                  <Avatar
                    sx={{
                      bgcolor:
                        "#" + Math.floor(Math.random() * 19777215).toString(16),
                    }}
                  >
                    {post.by.firstName.charAt(0).toUpperCase()}
                  </Avatar>
                }
                title={`${post.by.firstName} ${post.by.lastName}`}
                subheader={`Joined ${formatYmd(new Date(post.by.joined))}`}
              />

              <AdvancedImage
                cldImg={myCld
                  .image(post.image)
                  .resize(fill().width(500).height(270))}
                plugins={[responsive()]}
              />

              <CardContent>
                <Link
                  to={`/posts/${post._id}`}
                  style={{
                    width: "100%",
                    textDecoration: "none",
                    color: "inherit",
                  }}
                >
                  <Typography variant='body2' color='text.secondary'>
                    {`${post.body.slice(0, 300)} | Read more...`}
                  </Typography>
                </Link>
              </CardContent>
              <CardActions disableSpacing>
                <IconButton
                  aria-label='add to favorites'
                  onClick={() => {
                    const index = post.likes.findIndex(
                      (like) => like.by._id === user.id
                    );
                    const likeIdentity = post.likes.map((like) => {
                      return like._id;
                    });
                    const likeStatus = post.likes.some(
                      (like) => like.by._id === user.id
                    );

                    if (likeStatus) {
                      return unlikePost(post._id, likeIdentity[index]);
                    } else if (!likeStatus) {
                      return likePost(post._id, user.id);
                    }

                    return;
                  }}
                >
                  <FavoriteIcon
                    style={{
                      color: post.likes.map((like) => {
                        const thisLike = like?.by._id === user.id;
                        if (thisLike) {
                          return "red";
                        } else {
                          return "inherit";
                        }
                      }),
                    }}
                  />
                  <Typography variant='body2' color='text.secondary'>
                    {`${post?.likes?.length} likes`}
                  </Typography>
                </IconButton>
                <IconButton aria-label='Comments'>
                  <MarkChatReadIcon />
                  <Typography variant='body2' color='text.secondary'>
                    {`${post?.comments?.length} Comments`}
                  </Typography>
                </IconButton>
                {user?.roles?.admin === 1000 && (
                  <>
                    <IconButton onClick={() => deletePost(post._id)}>
                      <DeleteIcon />
                    </IconButton>
                    <Link to={`/dashboard/editpost/${post._id}`}>
                      <IconButton
                        sx={{
                          "@media screen and (min-width: 300px) and (max-width: 1000px)":
                            {
                              display: "none",
                            },
                        }}
                      >
                        <EditIcon />
                      </IconButton>
                    </Link>
                  </>
                )}
              </CardActions>
            </Card>
          );
        })
      )}
      <ToastContainer />
    </Contain>
  );
};

const Contain = st.div`
  
`;
export default AllPosts;
