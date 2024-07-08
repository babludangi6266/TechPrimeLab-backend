
// const mongoose = require('mongoose');
// // const config = require('config');
// const db = process.env.MONGO_URI;

// const connectDB = async () => {
//     try {
//         await mongoose.connect(db, {
//             useNewUrlParser: true,
//             useUnifiedTopology: true,
//         });
//         console.log('MongoDB Connected...');
//     } catch (err) {
//         console.error(err.message);
//         process.exit(1);
//     }
// };

// module.exports = connectDB;

const mongoose = require('mongoose');

const db = process.env.MONGO_URI;
const dbName = 'TechPrimeLab';

const connectDB = async () => {
  try {
    await mongoose.connect(db, { dbName });
    console.log('MongoDB Connected...');
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};

module.exports = connectDB;