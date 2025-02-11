const express = require("express");
const userRouter = require("./Routes/routes");

require('dotenv').config();

const app = express();

app.use(express.json());
app.use("/users", userRouter);

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});