const messageModel = require('../models/messages');

let self = (module.exports = {
  getByConversationID: async (
    conversationID,
    limit,
    offset,
    sortBy = 'desc'
  ) => {
    return await messageModel
      .find({ conversationID })
      .populate('sender')
      .limit(limit)
      .skip(offset)
      .sort({ updatedAt: sortBy });
  },
  addNewMessage: async (sender, conversationID, message) => {
    const newMessage = new messageModel({ sender, conversationID, message });
    return await newMessage.save();
  },
});
