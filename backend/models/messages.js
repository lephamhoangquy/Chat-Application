const mongoose = require('mongoose');
const { Schema } = mongoose;

const schema = new Schema(
  {
    sender: { type: Schema.Types.ObjectId, ref: 'Users' },
    conversationID: { type: Schema.Types.ObjectId, ref: 'Conversations' },
    message: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model('Messages', schema);
