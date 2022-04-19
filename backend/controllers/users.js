const services = require('../services/users');

module.exports = {
  get: async (req, res) => {
    try {
      const { id } = req.params;
      const result = await services.get(id);
      return res.send({ code: 200, message: 'success', data: result });
    } catch (error) {
      return res.status(500).send({ code: 500, message: error.message });
    }
  },

  getFriends: async (req, res) => {
    try {
      const { _id } = req.user;
      let result = await services.getFriendsByID(_id);
      return res.send({ code: 200, message: 'success', data: result });
    } catch (error) {
      return res.status(500).send({ code: 500, message: error.message });
    }
  },

  add: async (req, res) => {
    try {
      const { body } = req;
      const result = await services.add(body);
      return res.send({ code: 200, message: 'success', data: result });
    } catch (error) {
      return res.status(500).send({ code: 500, message: error.message });
    }
  },
  me: async (req, res) => {
    try {
      const { _id } = req.user;
      const result = await services.get(_id);
      return res.send({ code: 200, message: 'success', data: result });
    } catch (error) {
      return res.status(500).send({ code: 500, message: error.message });
    }
  },
};
