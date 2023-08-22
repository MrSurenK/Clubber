import React from "react";
import { Typography } from "@mui/material";

const NumberOfMembers = () => {
  return (
    <div>
      <Typography variant="h6">Number of New Members</Typography>
      [Previous Month] | [Current Month]
      <br />
      34 | 49
    </div>
  );
};

export default NumberOfMembers;
