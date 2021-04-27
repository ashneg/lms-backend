const mongoose = require('mongoose');


const loanSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: true
    },
    phoneNo:{
        type: Number,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    loanAmount: {
        type: Number,
        required : true
    },
    status: {
        type: String,
        enum: ['new','approved','rejected','cancelled'],
        default:"New",
        required: true
    },
    creditScore: {
        type: Number,
        required: true
    }
});

const loans = mongoose.model("loans",loanSchema);
module.exports.loans = loans;