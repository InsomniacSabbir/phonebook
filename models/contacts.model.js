const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const contactsSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    number: {
        type: String,
        required: true,
        unique: true,
    },
});

module.exports = mongoose.model('contacts', contactsSchema, 'contacts');
