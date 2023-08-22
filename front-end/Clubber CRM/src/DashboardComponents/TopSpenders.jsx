import React, { useState, useEffect } from "react";
import useFetch from "../hooks/useFetch";
import { Typography } from "@mui/material";

const TopSpenders = () => {
  const [members, setMembers] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const fetchData = useFetch();

  useEffect(() => {
    getMembers();
  }, []);

  // Get members from API
  const getMembers = async () => {
    const res = await fetchData("/users/member", "GET");
    if (res.ok) {
      setMembers(res.data);
    } else {
      alert(JSON.stringify(res.data));
      console.log(res.data);
    }
  };

  const fetchSpend = async () => {
    await Promise.all(
      members.map((member) => getTransactions(member.memberId))
    );
  };

  const getTransactions = async (memberId) => {
    const res = await fetchData("/transactions/totalamount/" + memberId, "GET");
    // console.log("Transaction response for", memberId, ":", res);
    if (res.ok) {
      setTransactions((prevTransactions) => ({
        ...prevTransactions,
        [memberId]: res.data.totalAmount,
      }));
      console.log(res.data);
    } else {
      alert(JSON.stringify(res.data));
      console.log(res.data);
    }
  };

  useEffect(() => {
    fetchSpend();
  }, [members]);

  const getTopSpendingMembers = (members, transactions) => {
    const membersWithSpend = members.map((member) => {
      const spendAmount = transactions[member.memberId] || 0;
      return {
        ...member,
        spendAmount,
      };
    });

    // Sort the array in descending order based on spend amount
    const sortedMembers = membersWithSpend.sort(
      (a, b) => b.spendAmount - a.spendAmount
    );

    return sortedMembers.slice(0, 5);
  };

  const topSpendingMembers = getTopSpendingMembers(members, transactions);

  return (
    <div>
      <Typography component="h1" variant="h5">
        Spenders
      </Typography>
      <ol>
        {topSpendingMembers.map((member, index) => (
          <li key={member.memberId}>
            {member.name} ${member.spendAmount}
          </li>
        ))}
      </ol>
    </div>
  );
};

export default TopSpenders;
