import React from "react";
import NavBar from "../navBar";
import { Box, useMediaQuery } from "@mui/material";
import Userwidgets from "../Widgets/Userwidgets";
import { useSelector } from "react-redux";
import MyPostWidget from "../Widgets/Mypostwidgets";
import PostsWidget from "../Widgets/Postswidget";

const HomePage = () => {
  const isNonMobile = useMediaQuery("(min-width:1000px)");
  const { _id, picturePath } = useSelector((state) => state.user);

  return (
    <div>
      <Box>
        <NavBar />
        <Box
          width={"100%"}
          padding="2rem 6%"
          display={isNonMobile ? "flex" : "block"}
          gap={"0.5rem"}
          justifyContent={"space-between"}
        >
          <Box flexBasis={isNonMobile ? "26%" : ""}>
            <Userwidgets userId={_id} picturePath={picturePath} />
          </Box>
          <Box
            flexBasis={isNonMobile ? "42%" : ""}
            mt={isNonMobile ? "" : "2rem"}
          >
            <MyPostWidget picturePath={picturePath} />
            <PostsWidget userId={_id}/>
          </Box>
          {isNonMobile && <Box flexBasis={"26%"} />}
        </Box>
      </Box>
    </div>
  );
};

export default HomePage;
