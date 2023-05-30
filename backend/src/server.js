const express = require("express");
const dotenv = require("dotenv").config();
const goalRouter = require("./routes/GoalRouter");
const userRouter = require("./routes/UserRouter");
const dbConnection = require("./db/mongo");
const { ErrorHandler } = require("./middlewares/ErrorHandler");
const { InvalidPathHandler } = require("./middlewares/InvalidPathHandler");

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use("/api/goals", goalRouter);
app.use("/api/users", userRouter);
app.use(ErrorHandler);
app.use(InvalidPathHandler);

const startServer = async () => {
  await dbConnection();
  app.listen(5000, () => {
    console.log(`Listening from port ${port}`);
  });
};

startServer();
