const express = require("express");
const { care } = require("../../controllers");
const ctrlWrapper = require("../../middleWares/ctrlWrapper");

const { get, getBySearch } = care;
const router = express.Router();

router.get("/", ctrlWrapper(get));
router.get("/", ctrlWrapper(getBySearch));

module.exports = routerCare = router;
