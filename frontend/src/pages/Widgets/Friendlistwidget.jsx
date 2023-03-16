import React from "react";
import { Box, Typography, useTheme } from "@mui/material";
import Friend from "./Friend";
import WidgetWrapper from "../../components/widgetWrapper";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setFriends } from "../../store";
import axios from "axios";

const FriendlistWidget = () => {
  const { palette } = useTheme();
  const token = useSelector((state) => state.token);
  const { _id } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const friends = useSelector((state) => state.user.friends);

  const getFriends = async () => {
    await axios
      .get(`http://localhost:3001/users/${_id}/friends`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((data) => {
        dispatch(setFriends({ friends: data.data }));
      });
  };

  useEffect(() => {
    getFriends();
    // eslint-disable-next-line
  }, []);
  return (
    <>
      <WidgetWrapper>
        <Typography
          color={palette.neutral.dark}
          variant="h5"
          fontWeight={"500"}
          sx={{ mb: "1.5rem" }}
        >
          Friend List
        </Typography>
        <Box display={"flex"} flexDirection={"column"} gap={"1.5rem"}>
          {friends &&
            friends.map((friend) => {
              return (
                <Friend
                  key={friend._id}
                  friendId={friend._id}
                  name={`${friend.firstName} ${friend.lastName}`}
                  subtitle={friend.occupation}
                  userPicturePath={friend.picturePath}
                />
              );
            })}
        </Box>
      </WidgetWrapper>
    </>
  );
};
export default FriendlistWidget;
