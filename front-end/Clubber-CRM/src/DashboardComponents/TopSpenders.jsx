import React, { useState, useEffect, useContext } from "react";
import useFetch from "../hooks/useFetch";
import { Typography } from "@mui/material";
import UserContext from "../context/user";

const TopSpenders = () => {
  const userCtx = useContext(UserContext);
  const fetchData = useFetch();
  const [topSpendingMembers, setTopSpendingMembers] = useState([]);

  useEffect(() => {
    fetchTopSpenders();
  }, []);

  const fetchTopSpenders = async () => {
    const res = await fetchData(
      "/users/member",
      "GET",
      undefined,
      userCtx.accessToken
    );
    if (res.ok) {
      const members = res.data;
      const transactions = await Promise.all(
        members.map(async (member) => {
          const transactionRes = await fetchData(
            `/transactions/totalamount/${member.memberId}`,
            "GET",
            undefined,
            userCtx.accessToken
          );
          return {
            memberId: member.memberId,
            name: member.name,
            spendAmount: transactionRes.ok
              ? transactionRes.data.totalAmount
              : 0,
          };
        })
      );
      const sortedMembers = transactions.sort(
        (a, b) => b.spendAmount - a.spendAmount
      );
      setTopSpendingMembers(sortedMembers.slice(0, 5));
    } else {
      alert(JSON.stringify(res.data));
      console.log(res.data);
    }
  };

  return (
    <div>
      <Typography variant="h6" align="center" fontWeight="bold">
        Top Spenders
      </Typography>
      <br />
      {topSpendingMembers.map((member, index) => (
        <Typography variant="h6" align="center" key={member.memberId}>
          {index + 1}. {member.name} ${member.spendAmount}
        </Typography>
      ))}
    </div>
  );
};

export default TopSpenders;
