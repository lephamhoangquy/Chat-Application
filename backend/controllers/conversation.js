const service = require('../services/conversations');

module.exports = {
  getByID: async (req, res) => {
    try {
      const { id } = req.params;
      const { limit, offset } = req.query;
      const result = await service.getByID(id, limit, offset);
      return res.send({ code: 200, message: 'success', data: result });
    } catch (error) {
      return res.status(500).send({ code: 500, message: error.message });
    }
  },
  getConversationsByUserID: async (req, res) => {
    try {
      const { _id } = req.user;
      const result = await service.getConversationsByUserID(_id);
      return res.send({ code: 200, message: 'success', data: result });
    } catch (error) {
      return res.status(500).send({ code: 500, message: error.message });
    }
  },
  init: async (req, res) => {
    try {
      let { body } = req;
      const { _id } = req.user;
      body.participants.push(_id);
      body = { ...body, creatorID: _id };
      const result = await service.add(body);
      return res.send({ code: 200, message: 'success', data: result });
    } catch (error) {
      return res.status(500).send({ code: 500, message: error.message });
    }
  },
};
