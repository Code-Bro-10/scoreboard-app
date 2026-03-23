require('dotenv').config();
const mongoose = require('mongoose');
const seedDatabase = require('./seed');

mongoose.connect(process.env.MONGO_URI)
  .then(async () => {
    console.log('Connected to remote MongoDB Atlas for seeding...');
    await seedDatabase();
    process.exit(0);
  })
  .catch(err => {
    console.error('Connection error:', err);
    process.exit(1);
  });
