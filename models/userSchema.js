const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: true
    },
    loanID: {
        tyoe: [String]
    }
})

const user = mongoose.model('userSchema',userSchema);

module.exports.userSchema = userSchema;