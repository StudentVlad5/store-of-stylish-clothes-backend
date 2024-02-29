// const get = require('./get');
const getUserById = require("./getId");
const getUsers = require("./getAll");
const updateAvatar = require("./updateAvatar");
const updateUser = require("./updateUser");
const createUser = require("./createUser");
const deleteUsers = require("./delete");
const getUserEvents = require("./getUserEvents");

module.exports = {
  // get,
  getUserById,
  getUsers,
  updateAvatar,
  updateUser,
  createUser,
  deleteUsers,
  getUserEvents,
};
