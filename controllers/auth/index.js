const signup = require('./signup');
const signin = require('./signin');
const current = require('./current');
const logout = require('./logout');
const update = require('./update');
const forgotPassword = require('./forgotPassword');
const changePassword = require('./changepassword');
const addFavorite = require('./addfavorite');
const deleteFavorite = require('./deletefavorite');
const getFavorites = require('./getFavorites');

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
};
