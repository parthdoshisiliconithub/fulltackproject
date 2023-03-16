import { Box, IconButton, Typography, useTheme } from "@mui/material";
import { PersonAddOutlined, PersonRemoveOutlined } from "@mui/icons-material";
import { useSelector, useDispatch } from "react-redux";
import { setFriends } from "../../store";
import FlexBetween from "../../components/FlexBetween";
import UserImage from "../../components/UserImage";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Friend = ({ friendId, name, subtitle, userPicturePath }) => {
  const { palette } = useTheme();
  const navigate = useNavigate();
  const token = useSelector((state) => state.token);
  const { _id } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const friends = useSelector((state) => state.user.friends);
  const primaryLight = palette.primary.light;
  const primaryDark = palette.primary.dark;
  const main = palette.neutral.main;
  const medium = palette.neutral.medium;
  const isFriend = friends.find((friend) => friend._id === friendId);

  const patchFriend = async () => {
    await axios
      .put(`http://localhost:3001/users/${_id}/${friendId}`, "", {
        headers: {
          Authorization: `Bearer ${token}`
        },
      })
      .then((data) => {
        dispatch(setFriends({ friends: data.data }));
      });
  };

  return (
    <>
      <FlexBetween>
        <FlexBetween>
          <UserImage image={userPicturePath} size="55px"></UserImage>
          <Box
            onClick={() => {
              navigate(`/profile/${friendId}`);
            }}
          >
            <Typography
              color={main}
              variant="h5"
              fontWeight={"500"}
              sx={{
                "&:hover": {
                  color: palette.primary.light,
                  cursor: "pointer",
                },
              }}  
            >
              {name}
            </Typography>
            <Typography color={medium} fontSize={"0.75rem"}>
              {subtitle}
            </Typography>
          </Box>
        </FlexBetween>
        <IconButton
          onClick={() => patchFriend()}
          sx={{ backgroundColor: primaryLight, p: "0.6rem" }}
        >
          {isFriend ? (
            <PersonRemoveOutlined sx={{ color: primaryDark }} />
          ) : (
            <PersonAddOutlined sx={{ color: primaryDark }} />
          )}
        </IconButton>
      </FlexBetween>
    </>
  );
};

export default Friend;
