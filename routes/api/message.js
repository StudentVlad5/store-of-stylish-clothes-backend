const express = require('express');
const { message } = require('../../controllers');
const {ctrlWrapper, validation} = require("../../middleWares");
const {
    eMailValidationSchema,
  } = require("../../models");

const { create } = message;
const router = express.Router();

router.post('/', 
validation(eMailValidationSchema),
ctrlWrapper(create));


module.exports = routerMessage = router;