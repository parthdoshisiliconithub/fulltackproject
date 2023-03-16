import React, { useEffect } from "react";
import { setPosts } from "../../store";
import Postwidget from "./Postwidget";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";

const PostsWidget = ({ userId, isProfile = false }) => {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.token);
  const posts = useSelector((state) => state.posts);

  const getPosts = async () => {
    await axios
      .get("http://localhost:3001/posts", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((data) => {
        dispatch(setPosts({ posts: data.data }));
      });
  };

  const getPost = async () => {
    await axios
      .get(`http://localhost:3001/posts/${userId}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((data) => {
        dispatch(setPosts({ posts: data.data }));
      });
  };

  useEffect(() => {
    if (isProfile) {
      getPost();
    } else {
      getPosts();
    }
     // eslint-disable-next-line
  }, []);

  return (
    <>
      {posts.map(
        ({
          _id,
          userId,
          firstName,
          lastName,
          description,
          picturePath,
          userpicturePath,
          likes,
          location,
          comments,
        }) => (
          <Postwidget
            key={_id}
            postId={_id}
            location={location}
            postUserId={userId}
            name={`${firstName} ${lastName}`}
            description={description}
            picturePath={picturePath}
            userpicturePath={userpicturePath}
            likes={likes}
            comments={comments}
          />
        )
      )}
    </>
  );
};
export default PostsWidget;
