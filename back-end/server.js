require("dotenv").config();

const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const connectDB = require("./src/db/db");

connectDB();

const auth = require("./src/routers/auth");
const products = require("./src/routers/products");
const transactions = require("./src/routers/transactions");
const reservations = require("./src/routers/reservations");
const users = require("./src/routers/users");
const staffRank = require("./src/routers/staffRank");
const memberRank = require("./src/routers/memberRank");

const limit = rateLimit({
  windowMs: 15 * 6 * 1000, // 15 mins
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
});

const app = express();

app.use(cors());
app.use(helmet());
app.use(limit);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/auth", auth);
app.use("/products", products);
app.use("/transactions", transactions);
app.use("/reservations", reservations);
app.use("/staffRank", staffRank);
app.use("/memberRank", memberRank);
app.use("/users", users);

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`server started on port ${PORT}`);
});
