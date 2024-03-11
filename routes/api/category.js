const express = require('express');
const { category } = require('../../controllers');
const ctrlWrapper = require('../../middleWares/ctrlWrapper');

const { get } = category;
const router = express.Router();

router.get('/', ctrlWrapper(get));

module.exports = routerCategory = router;
