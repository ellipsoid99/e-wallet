const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcryptjs");
const Transactions = require("./transcations");

const UserSchema = new Schema({
    accountnumber: {
        type: Number,
        required: false,
        default: 0,
    },
    firstname: {
        type: String,
        required: true,
    },
    lastname: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    phoneNumber: {
        type: Number,
        required: false,
        default: 0,
    },
    transaction: {
        balance: {
            type: Number,
            required: false,
            default: 0,
        },
        transactions: [],
    },
    paymentSession: {
        type: Boolean,
        default: false,
    },
    loggedInCount: {
        type: Number,
        default: 0,
    },
});

const User = mongoose.model("user", UserSchema);
module.exports = User;
