const express = require('express');
const { shop } = require('../../controllers');
const ctrlWrapper = require('../../middleWares/ctrlWrapper');

const { getShop, getShopByFilter, getShopById } = shop;
const router = express.Router();

// router.get("/", ctrlWrapper(getShop));
router.get('/', ctrlWrapper(getShopByFilter));
// router.get('/:category/', ctrlWrapper(getByFilter));
router.get('/byid/:id/', ctrlWrapper(getShopById));

module.exports = routerShop = router;
