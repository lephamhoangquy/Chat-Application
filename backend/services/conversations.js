const conversationModel = require('../models/conversations');
const messageService = require('../services/messages');

module.exports = {
  add: async ({ title, creatorID, participants }) => {
    let conversation = new conversationModel({
      title,
      creatorID,
      participants,
    });
    return await conversation.save(conversation);
  },

  update: async (conversationID, body) => {
    return await conversationModel.findOneAndUpdate(
      { _id: conversationID },
      body
    );
  },

  getByID: async (id, limit, offset) => {
    let conversation = await conversationModel
      .findById(id)
      .populate('creatorID')
      .populate('participants');
    let messages = await messageService.getByConversationID(
      conversation._id,
      limit,
      offset
    );
    return {
      conversation,
      messages,
    };
  },

  getConversationsByUserID: async (userID) => {
    let conversations = await conversationModel
      .find({
        participants: userID,
      })
      .populate('creatorID')
      .populate('participants');

    for (let conversation of conversations) {
      let messages = await messageService.getByConversationID(
        conversation._id,
        1,
        0,
        'desc'
      );
      conversation._doc.messages = messages;
    }
    return conversations;
  },
};
