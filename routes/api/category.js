const express = require('express');
const { category } = require('../../controllers');
const ctrlWrapper = require('../../middleWares/ctrlWrapper');

const { get_ua, get_ru, get_de, get_en, get } = category;
const router = express.Router();

// router.get('/ua', ctrlWrapper(get_ua));
// router.get('/ru', ctrlWrapper(get_ru));
// router.get('/en', ctrlWrapper(get_en));
// router.get('/de', ctrlWrapper(get_de));
router.get('/', ctrlWrapper(get));

module.exports = routerCategory = router;
