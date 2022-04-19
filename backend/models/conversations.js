const mongoose = require('mongoose');
const { Schema } = mongoose;

const schema = new Schema(
  {
    title: { type: String, required: true },
    creatorID: { type: Schema.Types.ObjectId, ref: 'Users', required: true },
    participants: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Users',
        required: true,
      },
    ],
    isDeleted: { type: Boolean, default: false },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Conversations', schema);
