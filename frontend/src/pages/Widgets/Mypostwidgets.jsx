import React, { useState } from "react";
import {
  Box,
  Divider,
  Typography,
  useTheme,
  Button,
  IconButton,
  useMediaQuery,
  InputBase,
} from "@mui/material";
import FlexBetween from "../../components/FlexBetween";
import Dropzone from "react-dropzone";
import UserImage from "../../components/UserImage";
import WidgetWrapper from "../../components/widgetWrapper";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { setPosts } from "../../store";

const Mypostwidgets = ({ picturePath }) => {
  const dispatch = useDispatch();
  const [isImage, setIsImage] = useState(false);
  const [image, setImage] = useState(null);
  const [post, setPost] = useState("");
  const { palette } = useTheme();
  const { _id } = useSelector((state) => state.user);
  const token = useSelector((state) => state.token);
  const isNonMobile = useMediaQuery("(min-width:1000px)");
  const mediumMain = palette.neutral.mediumMain;
  const medium = palette.neutral.medium;

  const handlePost = async () => {
    const formData = new FormData();
    formData.append("userId", _id);
    formData.append("description", post);
    if (image) {
      formData.append("picture", image);
      formData.append("picturePath", image.name);
    }

    await axios
      .post("http://localhost:3001/posts", formData, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((data) => {
        dispatch(setPosts(data.data));
      });
    setImage(null);
    setPost("");
  };

  return (
    <div>
      <WidgetWrapper>
        <FlexBetween gap={"1.5rem"}>
          <UserImage picturePath={picturePath} />
          <InputBase
            placeholder="What's on your mind..."
            onChange={(e) => setPost(e.target.value)}
            value={post}
            sx={{
              width: "100%",
              backgroundColor: palette.neutral.light,
              borderRadius: "2rem",
              padding: "1rem 2rem",
            }}
          />
        </FlexBetween>
      </WidgetWrapper>
    </div>
  );
};

export default Mypostwidgets;
