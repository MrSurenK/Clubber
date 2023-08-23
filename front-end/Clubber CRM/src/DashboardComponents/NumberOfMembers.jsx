import React, { useState, useEffect, useContext } from "react";
import useFetch from "../hooks/useFetch";
import UserContext from "../context/user";
import { Typography } from "@mui/material";
import Grid from "@mui/material/Grid";

const NumberOfMembers = () => {
  const fetchData = useFetch();
  const userCtx = useContext(UserContext);
  const [previousMonthMembers, setPreviousMonthMembers] = useState(0);
  const [currentMonthMembers, setCurrentMonthMembers] = useState(0);

  const getNumberOfMembers = async () => {
    const res = await fetchData(
      "/users/member",
      "GET",
      undefined,
      userCtx.accessToken
    );

    if (res.ok) {
      const members = res.data;
      const currentDate = new Date();
      const currentYear = currentDate.getFullYear();
      const currentMonth = currentDate.getMonth();

      const previousMonthDate = new Date(currentYear, currentMonth - 1, 1);
      const currentMonthDate = new Date(currentYear, currentMonth, 1);

      const previousMonthMembersCount = members.filter(
        (member) =>
          new Date(member.created_at) >= previousMonthDate &&
          new Date(member.created_at) < currentMonthDate
      ).length;

      const currentMonthMembersCount = members.filter(
        (member) => new Date(member.created_at) >= currentMonthDate
      ).length;

      setPreviousMonthMembers(previousMonthMembersCount);
      setCurrentMonthMembers(currentMonthMembersCount);
    } else {
      alert(JSON.stringify(res.data));
      console.log(res.data);
    }
  };

  useEffect(() => {
    getNumberOfMembers();
  }, []);

  return (
    <div>
      <Typography variant="h6" align="center" fontWeight="bold">
        Number of New Members
      </Typography>
      <br></br>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <Typography variant="h1" align="center">
            {previousMonthMembers}
          </Typography>
          <Typography variant="h6" align="center">
            Previous Month
          </Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography variant="h1" align="center">
            {currentMonthMembers}
          </Typography>
          <Typography variant="h6" align="center">
            Current Month
          </Typography>
        </Grid>
      </Grid>
    </div>
  );
};

export default NumberOfMembers;
