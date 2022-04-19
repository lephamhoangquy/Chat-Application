const userModel = require('../models/users');

module.exports = {
  login: async (userName, password) => {
    let user = await userModel.findByCredentials(userName, password);
    if (user) {
      const accessToken = await userModel.generateAccessToken(user._id);
      return accessToken;
    }
    return false;
  },
};
