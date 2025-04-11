const express = require("express");
const bodyParser = require("body-parser");
require("dotenv").config();
const cors = require("cors");

const authRoutes = require("./routes/auth");
const wantedRoutes = require("./routes/wanted");
const logger = require("./middleware/logger");

const app = express();

// app.use(
//   cors({
//     origin: "http://localhost:5173", //my fe is running on :5173
//     credentials: true,
//   })
// );

app.use(cors()); // I have allowed all

app.use(bodyParser.json());
app.use(logger);
app.use("/auth", authRoutes);
app.use("/wanted", wantedRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

