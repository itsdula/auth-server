require("dotenv").config();
const express = require("express");
const cors = require("cors");
const logger = require("./routers/Logger");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors({ origin: "*" }));
app.use(express.json());
app.use(logger);

// User the Auth routes
app.use("/auth", require("./routers/AuthRouter"));

app.listen(PORT, () => console.log(`Listening on port ${PORT} ...`));
