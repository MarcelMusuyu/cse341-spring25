const mongoose = require('mongoose'); // Import mongoose
const Schema = mongoose.Schema; // Get Schema from mongoose
const userSchema = new Schema({
    fistName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    favoriteColor: {
        type: String,
        required: true
    },
    birthdate: {
        type: Date,
        default: Date.now
    }
});
const Contacts = mongoose.model('Contacts', userSchema);
module.exports = Contacts;