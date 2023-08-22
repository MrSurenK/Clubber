import React, { useState, useEffect } from "react";
import useFetch from "../hooks/useFetch";
import { Typography } from "@mui/material";

const TopSpenders = () => {
  const fetchData = useFetch();
  const [topSpendingMembers, setTopSpendingMembers] = useState([]);

  useEffect(() => {
    fetchTopSpenders();
  }, []);

  const fetchTopSpenders = async () => {
    const res = await fetchData("/users/member", "GET");
    if (res.ok) {
      const members = res.data;
      const transactions = await Promise.all(
        members.map(async (member) => {
          const transactionRes = await fetchData(
            `/transactions/totalamount/${member.memberId}`,
            "GET"
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
      <Typography variant="h5">Top Spenders</Typography>
      <Typography variant="h6">
        <ol>
          {topSpendingMembers.map((member, index) => (
            <li key={member.memberId}>
              {member.name} ${member.spendAmount}
            </li>
          ))}
        </ol>
      </Typography>
    </div>
  );
};

export default TopSpenders;