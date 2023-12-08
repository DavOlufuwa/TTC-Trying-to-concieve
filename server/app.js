const express = require("express");
const cors = require("cors");
require("express-async-errors");
require("events").EventEmitter.defaultMaxListeners = 15;
const mongoose = require("mongoose");
const {
  requestLogger,
  unknownEndpoint,
  errorHandler,
  accessTokenExtractor,
} = require("./utils/middleware");
const { MONGODB_URI } = require("./utils/config");
const logger = require("./utils/logger");
const superAdminRouter = require("./controllers/superAdmin");
const userRouter = require("./controllers/users");
const loginRouter = require("./controllers/authentication");
const adminRouter = require("./controllers/admin");
const webhookRouter = require("./controllers/webhook");

const app = express();

mongoose.set("strictQuery", false);
logger.info(`connecting to ${MONGODB_URI}`);

mongoose
  .connect(MONGODB_URI)
  .then(() => logger.info("connected to MongoDB Database"))
  .catch((error) => {
    logger.error("error connecting to MongoDB:", error.message);
  });

app.use(express.json());
app.use(cors());
app.use(requestLogger);
app.use(accessTokenExtractor);
app.use("/api/superadmin", superAdminRouter);
app.use("/api/admin", adminRouter);
app.use("/api/users", userRouter);
app.use("/api/auth", loginRouter);
app.use("/api/webhook", webhookRouter)
app.use(unknownEndpoint);
app.use(errorHandler);

module.exports = app;
