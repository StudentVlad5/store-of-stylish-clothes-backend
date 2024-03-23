const express = require("express");
const { shop } = require("../../controllers");
const ctrlWrapper = require("../../middleWares/ctrlWrapper");

const {
  getShop_ua,
  getShop_ru,
  getShop_en,
  getShop_de,
  getShopByFilter_ua,
  getShopByFilter_ru,
  getShopByFilter_en,
  getShopByFilter_de,
  getShopById_ua,
  getShopById_ru,
  getShopById_de,
  getShopById_en,
} = shop;
const router = express.Router();

router.get("/ua/newbd", ctrlWrapper(getShop_ua));
router.get("/ru/newbd", ctrlWrapper(getShop_ru));
router.get("/en/newbd", ctrlWrapper(getShop_en));
router.get("/de/newbd", ctrlWrapper(getShop_de));

router.get("/ua", ctrlWrapper(getShopByFilter_ua));
router.get("/ru", ctrlWrapper(getShopByFilter_ru));
router.get("/de", ctrlWrapper(getShopByFilter_de));
router.get("/en", ctrlWrapper(getShopByFilter_en));

router.get("/ua/byid/:id/", ctrlWrapper(getShopById_ua));
router.get("/ru/byid/:id/", ctrlWrapper(getShopById_ru));
router.get("/de/byid/:id/", ctrlWrapper(getShopById_de));
router.get("/en/byid/:id/", ctrlWrapper(getShopById_en));

module.exports = routerShop = router;
