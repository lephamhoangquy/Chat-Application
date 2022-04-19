const userModel = require('../models/users');

module.exports = {
  get: async (id) => {
    return await userModel.findById(id);
  },

  add: async (body) => {
    const user = new userModel(body);
    return await user.save();
  },

  getFriendsByID: async (id) => {
    return await userModel.find({ _id: { $nin: id } });
  },
};
