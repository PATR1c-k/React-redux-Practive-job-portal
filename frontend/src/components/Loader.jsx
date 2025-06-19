import React from "react";
import { CircularProgress, Box } from "@mui/material";

const Loader = () => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100px",
        width: "100%",
      }}
    >
      <CircularProgress />
    </Box>
  );
};

export default Loader;
