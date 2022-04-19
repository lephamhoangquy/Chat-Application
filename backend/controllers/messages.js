const services = require('../services/messages');
module.exports = {
  addNewMessage: async (req, res) => {
    try {
      const { _id } = req.user;
      const { conversationID, message } = req.body;
      const result = await services.addNewMessage(_id, conversationID, message);
      return res.send({ code: 200, message: 'success', data: result });
    } catch (error) {
      return res.status(500).send({ code: 500, message: error.message });
    }
  },
};
