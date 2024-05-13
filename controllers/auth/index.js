const signup = require("./signup");
const signin = require("./signin");
const current = require("./current");
const logout = require("./logout");
const update = require("./update");
const forgotPassword = require("./forgotPassword");
const changePassword = require("./changepassword");
const addFavorite = require("./addfavorite");
const deleteFavorite = require("./deletefavorite");
const getFavorites = require("./getFavorites");
const getFavorites_ua = require("./getFavorites_ua");
const getFavorites_ru = require("./getFavorites_ru");
const getFavorites_en = require("./getFavorites_en");
const getFavorites_de = require("./getFavorites_de");

module.exports = {
  signup,
  signin,
  current,
  logout,
  update,
  forgotPassword,
  changePassword,
  addFavorite,
  deleteFavorite,
  getFavorites,
  getFavorites_ua,
  getFavorites_ru,
  getFavorites_en,
  getFavorites_de,
};
