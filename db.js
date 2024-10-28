require('dotenv').config();
const mongoose = require('mongoose');

//Define the MongoDB connection URL
const mongoURL = process.env.PORT // Replace 'mydatabase' with your database name

// Set up MongoDB connection
mongoose.connect(mongoURL)

// Get the default connecyion
// Mongoose maintains a default connection representing the MOngoDB connection
const db = mongoose.connection

db.on('connected', () => {
    console.log('connected to MongoDB server');

})

db.on('erroe', () => {
    console.log('MongoDB connection error');

})

db.on('disconnected', () => {
    console.log('MOngoDB disconnected');

})

// Export the database connection
module.exports = db