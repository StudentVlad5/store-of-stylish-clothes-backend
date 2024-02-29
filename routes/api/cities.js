const express = require("express");
const { cities } = require("../../controllers");
const ctrlWrapper = require("../../middleWares/ctrlWrapper");

const { postByFilter, getByFilter } = cities;
const router = express.Router();

router.post("/up", ctrlWrapper(getByFilter));
router.post("/", ctrlWrapper(postByFilter));

module.exports = routerSities = router;
