const express = require("express");
const { ready_styles } = require("../../controllers");
const ctrlWrapper = require("../../middleWares/ctrlWrapper");

const { getReadyStyles } = ready_styles;
const router = express.Router();

router.get("/", ctrlWrapper(getReadyStyles));

module.exports = routerStyles = router;
