const { Users } = require("../../models");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const {
  dataFilter,
  userFullField,
  userFieldReceivedFromFront,
  requiredSignUpFields,
  checkObjByList,
  ValidationError,
  DuplicateEmailError,
} = require("../../helpers");

const { SECRET_KEY } = process.env;

const createUser = async (req, res, next) => {
  try {
    const isValidInData = checkObjByList(req.body, requiredSignUpFields);
    if (!isValidInData) {
      throw new ValidationError("Bad request, invalid data");
    }

    const userDataCreate = dataFilter(req.body, userFieldReceivedFromFront);

    const hashPassword = bcrypt.hashSync(
      req.body.password,
      bcrypt.genSaltSync(10)
    );
    userDataCreate.password = hashPassword;
    req.file?.path && (userDataCreate.avatar = req.file.path);
    const isFoundUser = await Users.findOne(
      { email: userDataCreate.email },
      "email"
    );
    if (isFoundUser) {
      throw new DuplicateEmailError(
        `Email: ${userDataCreate.email} already register`
      );
    }
    // userDataCreate.authToken = authToken;

    const user = await Users.create(userDataCreate);
    const payload = { id: user._id };
    const authToken = jwt.sign(payload, SECRET_KEY, { expiresIn: "14d" });
    const result = await Users.findByIdAndUpdate(
      user._id,
      { authToken },
      { new: true }
    );

    const newUser = dataFilter(result, userFullField);
    // const newData = req.body;
    // req.file?.path && (newData.avatar = req.file.path);
    // const resCreate = await Users.create(newData, {
    //   new: true,
    // });
    // req.file?.path && (resCreate.avatar = req.file.path);
    return res
      .status(201)
      .json({ code: "201", message: "user create", data: newUser._doc });
  } catch (err) {
    throw new ValidationError(err.message);
  }
};

module.exports = createUser;
