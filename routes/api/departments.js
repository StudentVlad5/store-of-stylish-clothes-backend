const express = require("express");
const { departments } = require("../../controllers");
const ctrlWrapper = require("../../middleWares/ctrlWrapper");

const { postDepartmentsByFilter, getByFilter } = departments;
const router = express.Router();

router.post("/up", ctrlWrapper(getByFilter));
router.post("/", ctrlWrapper(postDepartmentsByFilter));

module.exports = routerDepartments = router;
