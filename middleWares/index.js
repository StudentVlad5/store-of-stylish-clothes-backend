const ctrlWrapper = require("./ctrlWrapper");
const { uploadCloud } = require("./uploadMiddleware");
const authMiddleware = require("./authMiddleware");
const tokenValidation = require("./tokenValidation");
const { validateId } = require("./validationIdFavorites");
const { validation } = require("./validation");

module.exports = {
  ctrlWrapper,
  uploadCloud,
  authMiddleware,
  tokenValidation,
  validation,
  validateId,
};
