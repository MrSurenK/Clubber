import React, { useState, useEffect, useRef, useContext } from "react";
import useFetch from "../hooks/useFetch";
import UserContext from "../context/user";
import {
  TextField,
  Button,
  FormControl,
  FormControlLabel,
  InputLabel,
  Container,
  Typography,
  Checkbox,
  RadioGroup,
  Radio,
} from "@mui/material";
import { v4 as uuidv4 } from "uuid";

const AddTransactionForm = () => {
  const userCtx = useContext(UserContext);
  const [transaction, setTransaction] = useState({
    transactionId: "TRA-" + uuidv4(),
    transactionDate: new Date(),
    product: "",
    memberId: "",
  });
  const [products, setProducts] = useState([]);
  const [members, setMembers] = useState([]);
  const [paymentStatus, setPaymentStatus] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState("");

  const fetchData = useFetch();

  // for adding new transaction
  const transactionIdRef = useRef("");
  const transactionDateRef = useRef("");
  const paymentStatusRef = useRef("");
  const memberIdRef = useRef("");
  const staffIdRef = useRef("");

  const fetchProducts = async () => {
    const res = await fetchData("/products");
    setProducts(res.data);
  };

  const fetchMembers = async () => {
    const res = await fetchData("/users/member");
    setMembers(res.data);
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

  // PUT to add a new transaction
  const addTransactions = async () => {
    const res = await fetchData(
      "/transactions",
      "PUT",
      {
        transactionId: transaction.transactionId,
        transactionDate: transactionDateRef.current.value,
        paymentStatus: paymentStatus,
        productId: selectedProductId,
        memberId: transaction.memberId,
        staffId: userCtx.staffId,
      },
      userCtx.accessToken
    );

    if (res.ok) {
      getTransactions();
      console.log("Transaction Added Successfully");
    } else {
      alert(JSON.stringify(res.data));
      console.log(res.data);
    }
  };

  const handlePaymentStatusChange = (event) => {
    setPaymentStatus(event.target.checked);
  };

  return (
    <Container component="main" maxWidth="xs">
      <Typography component="h1" variant="h5">
        Add a New Transaction
      </Typography>
      <br />
      <TextField
        label="Member ID"
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
            {member.memberId}
          </option>
        ))}
      </datalist>
      <br />
      <br />
      <FormControl fullWidth>
        <InputLabel>Product</InputLabel>
        <RadioGroup
          name="product"
          value={selectedProductId}
          onChange={(event) => setSelectedProductId(event.target.value)}
        >
          <br />
          <br />
          {products.map((product) => (
            <FormControlLabel
              key={product.productId}
              value={product.productId}
              control={<Radio />}
              label={`${product.productName} ($${product.productPrice})`}
            />
          ))}
        </RadioGroup>
      </FormControl>
      <br />
      <br />
      <FormControlLabel
        control={
          <Checkbox
            checked={paymentStatus}
            onChange={handlePaymentStatusChange}
            name="paymentStatus"
            color="primary"
          />
        }
        label="Paid?"
      />
      <br />
      <br />
      <Button
        type="submit"
        fullWidth
        variant="contained"
        onClick={addTransactions}
      >
        Add Transaction
      </Button>
      <br />
      <br />
      <Typography>For Staff Use Only</Typography>
      <Typography style={{ fontSize: "12px" }} value={userCtx.staffId}>
        Staff ID: {userCtx.staffId}
      </Typography>{" "}
      <Typography
        style={{ fontSize: "12px" }}
        value={transaction.transactionDate.toISOString()}
      >
        Transaction Date: {transaction.transactionDate.toISOString()}
      </Typography>
      <Typography
        style={{ fontSize: "12px" }}
        value={transaction.transactionId}
      >
        Transaction ID: {transaction.transactionId}
      </Typography>
      <br />
      <br />
    </Container>
  );
};

export default AddTransactionForm;
