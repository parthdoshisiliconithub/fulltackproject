import React from "react";
import {
  ChatBubbleOutline,
  FavoriteBorderOutlined,
  FavoriteOutlined,
  ShareOutlined,
} from "@mui/icons-material";
import { Box, Divider, IconButton, Typography, useTheme } from "@mui/material";
import FlexBetween from "../../components/FlexBetween";
import Friend from "./Friend";
import { useDispatch, useSelector } from "react-redux";
import { setPost } from "../../store";
import { useState } from "react";
import axios from "axios";
import WidgetWrapper from "../../components/widgetWrapper";

const Postwidget = ({
  postId,
  postUserId,
  name,
  description,
  picturePath,
  location,
  userpicturePath,
  likes,
  comments,
}) => {
  const [isComments, setIsComments] = useState(false);
  const { palette } = useTheme();
  const token = useSelector((state) => state.token);
  const dispatch = useDispatch();
  const primary = palette.primary.main;
  const main = palette.neutral.main;
  const loginId = useSelector((state) => state.user._id);
  const isLiked = Boolean(likes[loginId]);
  const likeCount = Object.keys(likes).length;

  const patchLike = async () => {
    await axios
      .put(
        `http://localhost:3001/posts/${postId}/like`,
        { userId: loginId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((data) => {
        dispatch(setPost({ post: data.data }));
      })
      .catch((err) => {
      });
  };

  return (
    <div>
      <WidgetWrapper m="2rem 0">
        <Friend
          friendId={postUserId}
          name={name}
          subtitle={location}
          userPicturePath={userpicturePath}
        ></Friend>
        <Typography color={main} sx={{ mt: "1rem" }}>
          {description}
        </Typography>
        {picturePath && (
          <img
            width={"100%"}
            height={"auto"}
            alt="post"
            style={{ borderRadius: "0.75rem", marginTop: "0.75rem" }}
            src={`http://localhost:3001/assets/${picturePath}`}
          />
        )}
        <FlexBetween mt={"0.25rem"}>
          <FlexBetween gap={"1rem"}>
            <FlexBetween gap={"0.3rem"}>
              <IconButton onClick={patchLike}>
                {isLiked ? (
                  <FavoriteOutlined sx={{ color: primary }} />
                ) : (
                  <FavoriteBorderOutlined />
                )}
              </IconButton>
              <Typography>{likeCount}</Typography>
            </FlexBetween>
          </FlexBetween>

          <FlexBetween gap="0.3rem">
            <IconButton onClick={() => setIsComments(!isComments)}>
              <ChatBubbleOutline />
            </IconButton>
            <Typography>{comments.length}</Typography>
          </FlexBetween>
        </FlexBetween>
        <IconButton>
          <ShareOutlined />
        </IconButton>
        <FlexBetween>
          {isComments && (
            <Box mt={"0.5rem"}>
              {comments.map((comment, i) => {
                return (
                  <>
                    <Box key={`${name}-${i}`}>
                      <Divider />
                      <Typography
                        sx={{ color: main, m: "0.5rem 0", pl: "1rem" }}
                      >
                        {comment}
                      </Typography>
                      <Divider />
                    </Box>
                  </>
                );
              })}
            </Box>
          )}
        </FlexBetween>
      </WidgetWrapper>
    </div>
  );
};

export default Postwidget;
