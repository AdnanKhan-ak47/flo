import { readFile } from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import mongoose from 'mongoose';
import Order from '../models/Order.js';

// Get the current file path and directory name
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const jsonFilePath = path.join(__dirname, 'data.json');

const seedData = async () => {
  try {
    // Read JSON data from file
    const jsonData = JSON.parse(await readFile(jsonFilePath, 'utf-8'));

    // Connect to MongoDB using Mongoose
    await mongoose.connect('mongodb://localhost:27017/flo', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    // Seed data into MongoDB

    await Order.insertMany(jsonData);

    console.log('Database seeded successfully');
  } catch (error) {
    console.error('Error seeding database:', error);
  } finally {
    // Close mongoose connection or perform cleanup
    mongoose.disconnect();
  }
};

seedData();
