const mongoose = require('mongoose');
const Product = require('./models/Product');
const { data } = require('./data'); // Import your product data

const MONGO_URI = 'mongodb+srv://sulaiirf2930:QxyHSCCFTM3aXoLM@cluster0.y5ojxkh.mongodb.net/fecom'; // Update if needed

async function seed() {
  try {
    await mongoose.connect(MONGO_URI);

    await Product.deleteMany({});
    await Product.insertMany(data);

    console.log('Sample products inserted!');
    process.exit();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

seed();