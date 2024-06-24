const mongoose = require("mongoose");
const user = require("./user")
const TASchema = new mongoose.Schema({
    //userSchema:{user},
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    section:[{
        type: mongoose.Schema.ObjectId,
        ref: 'section'
    }]

    


});
const TA = mongoose.model('TA' , TASchema)
module.exports = TA