const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log('Dataabse is connected');
  } catch (e) {
    console.error(e, 'Failed to connect to the database')
    process.exit(1);
  }
}

module.exports = connectDB;