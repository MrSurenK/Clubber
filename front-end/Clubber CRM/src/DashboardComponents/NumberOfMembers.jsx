import React, { useState, useEffect, useContext } from "react";
import useFetch from "../hooks/useFetch";
import UserContext from "../context/user";


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
      Number of New Members
      <br />
      <br />
      {previousMonthMembers} | {currentMonthMembers}
    </div>
  );
};

export default NumberOfMembers;
