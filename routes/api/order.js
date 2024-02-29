const express = require("express");
const { order } = require("../../controllers");
const ctrlWrapper = require("../../middleWares/ctrlWrapper");

const { createOrder, getById } = order;
const router = express.Router();

router.get("/:id/", ctrlWrapper(getById));
router.post("/", ctrlWrapper(createOrder));

module.exports = routerOrder = router;
