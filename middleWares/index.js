const ctrlWrapper = require("./ctrlWrapper");
const { upload } = require("./uploadMiddleware");
const authMiddleware = require("./authMiddleware");
const tokenValidation = require("./tokenValidation");
const { validateId } = require("./validationIdFavorites");
const { validation } = require("./validation");

module.exports = {
  ctrlWrapper,
  upload,
  authMiddleware,
  tokenValidation,
  validation,
  validateId,
};
