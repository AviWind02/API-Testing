const mongoose = require('mongoose');

const dataSchema = new mongoose.Schema({
    name: {
        required: true,
        type: String
    },
    address: {
        required: true,
        type: String
    },
    phoneNumber: {
        required: true,
        type: String
    },
    emailAddress: {
        required: true,
        type: String
    },
    rating: {
        required: true,
        type: String
    }
})

module.exports = mongoose.model('RestaurantAvi', dataSchema)