const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();
// console.log(process.env.MONGO_URI);
const connectDB = async () => {
  await mongoose.connect(process.env.MONGO_URI);
};

module.exports = connectDB;
