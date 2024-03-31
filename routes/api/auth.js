const express = require("express");
const { auth: ctrl } = require("../../controllers");
const {
  ctrlWrapper,
  authMiddleware,
  validation,
  validateId,
} = require("../../middleWares");
const {
  userValidationSchema,
  userUpdateValidationSchema,
} = require("../../models");
const uploadCloud = require("../../middleWares/uploadMiddleware");

const router = express.Router();

router.post("/signin", ctrlWrapper(ctrl.signin));
router.post(
  "/signup",
  validation(userValidationSchema),
  ctrlWrapper(ctrl.signup)
);

router.post("/logout", ctrlWrapper(authMiddleware), ctrlWrapper(ctrl.logout));
router.post("/forgotPassword", ctrlWrapper(ctrl.forgotPassword));
router.post("/changePassword", ctrlWrapper(ctrl.changePassword));
router.post(
  "/favorites/:id",
  ctrlWrapper(authMiddleware),
  validateId,
  ctrlWrapper(ctrl.addFavorite)
);
router.delete(
  "/favorites/:id",
  ctrlWrapper(authMiddleware),
  validateId,
  ctrlWrapper(ctrl.deleteFavorite)
);
router.post(
  "/shop/ua/:id",
  ctrlWrapper(authMiddleware),
  validateId,
  ctrlWrapper(ctrl.getFavorites_ua)
);
router.post(
  "/shop/ru/:id",
  ctrlWrapper(authMiddleware),
  validateId,
  ctrlWrapper(ctrl.getFavorites_ru)
);
router.post(
  "/shop/en/:id",
  ctrlWrapper(authMiddleware),
  validateId,
  ctrlWrapper(ctrl.getFavorites_en)
);
router.post(
  "/shop/de/:id",
  ctrlWrapper(authMiddleware),
  validateId,
  ctrlWrapper(ctrl.getFavorites_de)
);

router.post("/", ctrlWrapper(authMiddleware), ctrlWrapper(ctrl.current));

router.patch(
  "/user/:id",
  ctrlWrapper(authMiddleware),
  uploadCloud.single("avatar"),
  validation(userUpdateValidationSchema),
  ctrlWrapper(ctrl.update)
);

module.exports = routerAuth = router;
