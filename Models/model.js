/**
 * This is the model class
 * Holds the model
 * name
 * address
 * phoneNumber
 * emailAddress
 * rating (a number from 1 to 10)
 */
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
    rating: {//Setting a min and max fot 1-10
        required: true,
        type: Number,
        min: 0,
        max: 10
    }
})

module.exports = mongoose.model('Restaurant', dataSchema)