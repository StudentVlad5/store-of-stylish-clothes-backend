const userMainField = [
  '_id',
  'userName',
  'surname',
  'email',
  // 'password',
  'location',
  'phone',
  'birthday',
  'avatar',
  'favorites',
  'address',
  'delivery',
  // "groupAcces",
  // "role",
  // 'authToken',
];

const userFullField = [
  '_id',
  'userName',
  'surname',
  'email',
  // 'password',
  'location',
  'phone',
  'birthday',
  'avatar',
  // "groupAcces",
  'authToken',
  'favorites',
  'address',
  'delivery',
  // "role",
];

const userFieldReceivedFromFront = [
  'userName',
  'surname',
  'email',
  'location',
  'phone',
  'birthday',
  'avatar',
  'password',
  'address',
  'delivery',
  'id',
];

const requiredSignUpFields = [
  'userName',
  'email',
  'location',
  'phone',
  'password',
];

module.exports = {
  userMainField,
  userFullField,
  userFieldReceivedFromFront,
  requiredSignUpFields,
};
