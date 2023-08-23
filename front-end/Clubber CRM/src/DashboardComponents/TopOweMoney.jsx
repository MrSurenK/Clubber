import React, { useState, useEffect, useContext } from "react";
import useFetch from "../hooks/useFetch";
import { Typography } from "@mui/material";
import UserContext from "../context/user";

const TopOweMoney = () => {
  const userCtx = useContext(UserContext);
  const fetchData = useFetch();
  const [topOweingMembers, setTopOweingMembers] = useState([]);

  useEffect(() => {
    fetchTopOwers();
  }, []);

  const fetchTopOwers = async () => {
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
            `/transactions/outstandingamount/${member.memberId}`,
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

      // Filter transactions based on paymentStatus being false
      const filteredTransactions = transactions.filter(
        (transaction) => !transaction.paymentStatus
      );

      const sortedTransactions = filteredTransactions.sort(
        (a, b) => b.spendAmount - a.spendAmount
      );
      setTopOweingMembers(sortedTransactions.slice(0, 5));
    } else {
      alert(JSON.stringify(res.data));
      console.log(res.data);
    }
  };

  return (
    <div>
      <Typography variant="h5">Top O$P$</Typography>
      <Typography variant="h6">
        <ol>
          {topOweingMembers.map((member, index) => (
            <li key={member.memberId}>
              {member.name} ${member.spendAmount}
            </li>
          ))}
        </ol>
      </Typography>
    </div>
  );
};

export default TopOweMoney;
