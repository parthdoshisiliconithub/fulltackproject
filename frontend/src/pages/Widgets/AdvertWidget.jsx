import React from "react";
import WidgetWrapper from "../../components/widgetWrapper";
import FlexBetween from "../../components/FlexBetween";
import { Typography, useTheme } from "@mui/material";
// import { useTheme } from "@emotion/react";

const AdvertWidget = () => {
  const { palette } = useTheme();
  const dark = palette.neutral.dark;
  const main = palette.neutral.main;
  const medium = palette.neutral.medium;

  return (
    <div>
      <WidgetWrapper>
        <FlexBetween>
          <Typography color={dark} variant="h5" fontWeight={"500"}>
            Sponsored
          </Typography>
          <Typography color={medium}>Create Ad</Typography>
        </FlexBetween>
        <img
          width={"100%"}
          height={"auto"}
          alt="advert"
          src="http://localhost:3001/assets/info4.jpeg"
          style={{ borderRadius: "0.75rem", margin: "0.75rem 0" }}
        />
        <FlexBetween>
          <Typography color={main}>NikaCosmetics</Typography>
          <Typography color={medium}>mikacosmetics.com</Typography>
        </FlexBetween>
        <Typography color={medium} m="0.5rem 0">
          create friend to increase your network
        </Typography>
      </WidgetWrapper>
    </div>
  );
};

export default AdvertWidget;
