const express = require("express");
const { shop } = require("../../controllers");
const ctrlWrapper = require("../../middleWares/ctrlWrapper");

const {
  getShop,
  getShop_ua,
  getShop_ru,
  getShop_en,
  getShop_de,
  getShopByFilter_ua,
  getShopByFilter_ru,
  getShopByFilter_en,
  getShopByFilter_de,
  getShopById,
  getShopById_ua,
  getShopById_ru,
  getShopById_de,
  getShopById_en,
  getShopByFilter,
  getDiscountShop,
  getDiscountShop_ua,
  getDiscountShop_ru,
  getDiscountShop_en,
  getDiscountShop_de,
  getRateShop,
  getRateShop_ua,
  getRateShop_ru,
  getRateShop_en,
  getRateShop_de,
  getShopByFilterDiscounts,
  getShopByFilterDiscounts_ua,
  getShopByFilterDiscounts_ru,
  getShopByFilterDiscounts_de,
  getShopByFilterDiscounts_en,
} = shop;
const router = express.Router();

router.get("/newbd", ctrlWrapper(getShop));
// router.get("/ua/newbd", ctrlWrapper(getShop_ua));
// router.get("/ru/newbd", ctrlWrapper(getShop_ru));
// router.get("/en/newbd", ctrlWrapper(getShop_en));
// router.get("/de/newbd", ctrlWrapper(getShop_de));

router.get("/", ctrlWrapper(getShopByFilter));
// router.get("/ua", ctrlWrapper(getShopByFilter_ua));
// router.get("/ru", ctrlWrapper(getShopByFilter_ru));
// router.get("/de", ctrlWrapper(getShopByFilter_de));
// router.get("/en", ctrlWrapper(getShopByFilter_en));

router.get("/discount", ctrlWrapper(getDiscountShop));
// router.get("/ua/discount", ctrlWrapper(getDiscountShop_ua));
// router.get("/ru/discount", ctrlWrapper(getDiscountShop_ru));
// router.get("/de/discount", ctrlWrapper(getDiscountShop_de));
// router.get("/en/discount", ctrlWrapper(getDiscountShop_en));

router.get("/rate", ctrlWrapper(getRateShop));
// router.get("/ua/rate", ctrlWrapper(getRateShop_ua));
// router.get("/ru/rate", ctrlWrapper(getRateShop_ru));
// router.get("/de/rate", ctrlWrapper(getRateShop_de));
// router.get("/en/rate", ctrlWrapper(getRateShop_en));

router.get("/byid/:id/", ctrlWrapper(getShopById));
// router.get("/ua/byid/:id/", ctrlWrapper(getShopById_ua));
// router.get("/ru/byid/:id/", ctrlWrapper(getShopById_ru));
// router.get("/de/byid/:id/", ctrlWrapper(getShopById_de));
// router.get("/en/byid/:id/", ctrlWrapper(getShopById_en));

router.get("/discounts", ctrlWrapper(getShopByFilterDiscounts));
// router.get("/ua/discounts", ctrlWrapper(getShopByFilterDiscounts_ua));
// router.get("/ru/discounts", ctrlWrapper(getShopByFilterDiscounts_ru));
// router.get("/de/discounts", ctrlWrapper(getShopByFilterDiscounts_de));
// router.get("/en/discounts", ctrlWrapper(getShopByFilterDiscounts_en));

module.exports = routerShop = router;
