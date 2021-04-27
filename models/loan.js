const mongoose = require('mongoose');

const loanList = mongoose.Schema({
    allLoans:{
        type : [String]
    },
});

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
const allLoans = mongoose.model('allLoans',loanList);

module.exports.loans = loans;
module.exports.allLoans = allLoans;

// {
//     customerName: String,
//     phoneNo: String,
//     Email: String,
//     loanAmount: Number,
//     status: Enum {New, Approved, Rejected,Cancelled}
//     creditScore: Number
//     }