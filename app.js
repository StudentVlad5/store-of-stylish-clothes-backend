const express = require("express");
const logger = require("morgan");
const cors = require("cors");
const { errorHandler } = require("./helpers");
const {
  routerAuth,
  // routerUser,
  // routerEvent,
  // routerUpdateEvent,
  // routerOwner,
  // routerMessage,
  // routerAdmin,
  routerDevelopers,
  routerCatalog,
  routerSities,
  routerCare,
  routerOrder,
} = require("./routes/api");

const app = express();

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatsLogger));
app.use(cors());
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "*");
  next();
});
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/uploads", express.static(`${__dirname}/images`));
app.use("/uploads", express.static(`${__dirname}/images/avatars`));

app.use("/api/auth", routerAuth);
app.use("/api/cities", routerSities);
app.use("/api/departments", routerDepartments);
app.use("/api/catalog", routerCatalog);
app.use("/api/care", routerCare);
app.use("/api/order", routerOrder);
app.use("/api/basket", routerBasket);

app.use((req, res) => {
  console.log("!!!!! APP (req, res) !!!!!!");
  res.status(404); // .json({ message: "Not found", data: null });
  res.json({ messages: "ERRR JSONS" });
});

app.use(errorHandler);

module.exports = app;
