const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { Schema } = mongoose;

const schema = new Schema(
  {
    userName: { type: String, trim: true, required: true, unique: true },
    password: { type: String, trim: true, required: true },
    displayName: { type: String, required: true },
    dob: String,
    gender: String,
    avatar: String,
  },
  { timestamps: true }
);

schema.pre('save', async function (next) {
  const user = this;
  if (user.isModified()) {
    user.password = await bcrypt.hash(user.password, 8);
  }
  next();
});

schema.statics.findByCredentials = async (userName, password) => {
  const user = await Users.findOne({ userName });
  if (!user) {
    return false;
  }
  const isPasswordMatch = await bcrypt.compare(password, user.password);
  return isPasswordMatch ? user : false;
};

schema.statics.generateAccessToken = async (_id) => {
  const accessToken = jwt.sign({ _id }, process.env.JWT_KEY, {
    expiresIn: '24h',
  });
  return accessToken;
};

const Users = mongoose.model('Users', schema);

module.exports = Users;
