import React from "react";
import { Box } from "@mui/material";

const UserImage = ({ image, size = "60px", src }) => {
  return (
    <div>
      <Box width={size} height={size}>
        <img
          width={size}
          height={size}
          style={{ objectFit: "cover", borderRadius: "50%" }}
        />
      </Box>
    </div>
  );
};

export default UserImage;
