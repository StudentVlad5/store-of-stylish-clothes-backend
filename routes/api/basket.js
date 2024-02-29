const express = require("express");
const { basket } = require("../../controllers");
const ctrlWrapper = require("../../middleWares/ctrlWrapper");

const { addItemInBasket, getById, removeItemInBasket, updateItemInBasket } = basket;
const router = express.Router();

router.get("/:id/", ctrlWrapper(getById));
router.post("/", ctrlWrapper(addItemInBasket));
router.patch("/:id/", ctrlWrapper(removeItemInBasket));
router.post("/:id/", ctrlWrapper(updateItemInBasket));

module.exports = routerBasket = router;
