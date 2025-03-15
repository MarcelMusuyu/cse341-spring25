const mongoose = require('mongoose'); // Import mongoose
const Schema = mongoose.Schema; // Get Schema from mongoose
const contactSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    trim: true,
  },
  lastName: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
    match: [
      /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
      'Please enter a valid email address',
    ],
  },
  favoriteColor: {
    type: String,
    trim: true,
  },
  birthDate: {
    type: Date,
  },
});

const Contact = mongoose.model('Contacts', contactSchema);

module.exports = Contact;