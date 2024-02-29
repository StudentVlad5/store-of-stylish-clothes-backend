const { ValidationError } = require('../../helpers');
const bcrypt = require('bcryptjs');
const nodemailer = require('nodemailer');

const { Users } = require('../../models');
const {
  userMainField,
  userFieldReceivedFromFront,
  dataFilter,
} = require('../../helpers');

const updateUser = async (req, res, next) => {
  const { id } = req.params;
  try {
    const newData = dataFilter(req.body, userFieldReceivedFromFront);
    console.log('updateUser ~ newData:', newData);
    req.file?.path && (newData.avatar = req.file.path);
    if (newData.password !== '' && newData.password !== undefined) {
      const hashPassword = bcrypt.hashSync(
        newData.password,
        bcrypt.genSaltSync(10)
      );
      const user = await Users.findById({ _id: id });
      newData.password = hashPassword;

      const transporter = nodemailer.createTransport({
        host: 'smtp.ukr.net',
        port: 465,
        secure: true,
        auth: {
          user: process.env.EMAIL_SEND,
          pass: process.env.EMAIL_PASSWORD,
        },
      });

      const from = 'Florist Support <vlad_np@ukr.net>';
      const to = user.email;

      transporter.sendMail(
        {
          from,
          to,
          subject: 'Change password',
          html: `<h1>Hello</h1><p>Hello. Please pay attention to replacing the access password to the Florist service</p><p>Hope to see you soon. <br> Wish you a nice day.</p><p>Your Florist service support</p>`,
        },
        (err, data) => {
          if (err) {
            console.error('Error sending:', err);
          } else {
            console.log('Letter sent');
          }
        }
      );
    }
    const resUpdate = await Users.findByIdAndUpdate({ _id: id }, newData, {
      new: true,
    });
    const newResponse = dataFilter(resUpdate, userMainField);
    req.file?.path && (newResponse.avatar = req.file.path);
    return res.status(201).json(newResponse);
  } catch (err) {
    throw new ValidationError(err.message);
  }
};

module.exports = updateUser;
