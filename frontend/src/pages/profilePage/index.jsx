import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Mypostwidgets from "../Widgets/Mypostwidgets";
import PostsWidget from "../Widgets/Postswidget";
import Userwidgets from "../Widgets/Userwidgets";
import { useSelector } from "react-redux";
import { Box, useMediaQuery } from "@mui/material";
import axios from "axios";
import NavBar from "../navBar";
import FriendlistWidget from "../Widgets/Friendlistwidget";

const ProfilePage = () => {
  const [user, setUser] = useState(null);
  const { userId } = useParams();
  const token = useSelector((state) => state.token);
  const isNonMobile = useMediaQuery("(min-width:1000px)");

  const getUser = async () => {
    axios
      .get(`http://localhost:3001/users/${userId}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((data) => {
        setUser(data);
      });
  };

  useEffect(() => {
    getUser();
    // eslint-disable-next-line
  }, []);

  if (!user) {
    return null;
  }

  return (
    <div>
      <Box>
        <NavBar />
        <Box
          width={"100%"}
          padding="2rem 6%"
          display={isNonMobile ? "flex" : "block"}
          gap={"2rem"}
          justifyContent={"center"}
        >
          <Box flexBasis={isNonMobile ? "26%" : ""}>
            <Userwidgets userId={userId} picturePath={user.picturePath} />
            <Box m={"2rem 0"}></Box>
            <FriendlistWidget userId={userId} />
          </Box>
          <Box
            flexBasis={isNonMobile ? "42%" : ""}
            mt={isNonMobile ? "" : "2rem"}
          >
            <Mypostwidgets picturePath={user.picturePath} />
            <Box />
            <PostsWidget userId={userId} isProfile />
          </Box>
        </Box>
      </Box>
    </div>
  );
};

export default ProfilePage;
