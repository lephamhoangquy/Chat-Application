const mongoose = require('mongoose');

const connectDB = async (connectionStr) => {
  try {
    const db = await mongoose.connect(connectionStr, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    if (db) {
      console.log(`Connected to DB successfully ${db.connection.host}`);
      return db;
    }
    return null;
  } catch (error) {
    console.log(`Connected to DB failed ${error}`);
    return null;
  }
};

const getID = (objectId) =>
  mongoose.mongo.BSONPure.ObjectID.fromHexString(objectId);

module.exports = {
  connectDB,
  getID,
};
