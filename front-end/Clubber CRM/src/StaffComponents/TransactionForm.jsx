import React, { useState, useEffect, useRef } from "react";
import useFetch from "../hooks/useFetch";
import UserContext from "../context/user";
import {
  TextField,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Container,
} from "@mui/material";
import { v4 as uuidv4 } from "uuid";

const AddTransactionForm = ({ onSubmit }) => {
  const [transaction, setTransaction] = useState({
    transactionId: "TRA-" + uuidv4(),
    transactionDate: new Date(),
    product: "",
    memberId: "",
  });
  const [products, setProducts] = useState([]);
  const [members, setMembers] = useState([]);

  const fetchData = useFetch();

  // // for adding new transaction
  // const transactionIdRef = useRef("");
  // const transactionDateRef = useRef("");
  // const paymentStatusRef = useRef("");
  // const productIdRef = useRef("");
  // const memberIdRef = useRef("");
  // const staffIdRef = useRef("");

  const fetchProducts = async () => {
    const res = await fetchData("/products");
    setProducts(res.data);
    console.log(products);
  };

  const fetchMembers = async () => {
    const res = await fetchData("/users/members");
    setMembers(res.data);
    console.log(members);
  };

  useEffect(() => {
    fetchProducts();
    fetchMembers();
  }, []);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setTransaction((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit(transaction);
  };

  // // PUT to add a new transaction
  // const addTransactions = async () => {
  //   const res = await fetchData("/transactions", "PUT", {
  //     transactionId: transactionIdRef.current.value,
  //     transactionDate: transactionDateRef.current.value,
  //     paymentStatus: paymentStatusRef.current.value,
  //     productId: productIdRef.current.value,
  //     memberId: memberIdRef.current.value,
  //     staffId: staffIdRef.current.value,
  //   });

  //   if (res.ok) {
  //     getTransactions();
  //   } else {
  //     alert(JSON.stringify(res.data));
  //     console.log(res.data);
  //   }
  // };

  return (
    <Container maxWidth="md" sx={{ textAlign: "center", marginBottom: "50vh" }}>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Transaction ID"
          name="transactionId"
          value={transaction.transactionId}
          fullWidth
          disabled
        />
        <br />
        <br />
        <TextField
          label="Transaction Date"
          name="transactionDate"
          type="date"
          value={transaction.transactionDate.toISOString().split("T")[0]}
          onChange={handleInputChange}
          fullWidth
          InputLabelProps={{
            shrink: true,
          }}
          disabled
        />
        <br />
        <br />

        <FormControl fullWidth>
          <InputLabel>Product</InputLabel>
          <Select
            name="product"
            value={transaction.product}
            onChange={handleInputChange}
          >
            {products.map((product) => (
              <MenuItem key={product.productId} value={product.productId}>
                {product.productName}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <br />
        <br />

        <TextField
          label="Member"
          name="memberId"
          value={transaction.memberId}
          onChange={handleInputChange}
          fullWidth
          placeholder="Search for a member..."
          inputProps={{
            list: "member-options",
            autoComplete: "off",
          }}
        />
        <datalist id="member-options">
          {members.map((member) => (
            <option key={member.memberId} value={member.memberId}>
              {member.memberName}
            </option>
          ))}
        </datalist>
        <br />
        <br />
        <Button type="submit" variant="contained" color="primary">
          Add Transaction
        </Button>
      </form>
    </Container>
  );
};

export default AddTransactionForm;
