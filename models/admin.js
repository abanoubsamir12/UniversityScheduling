const mongoose = require("mongoose");
const user = require("./user")
const adminSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    username : {
        type:String
    },
    password:{
        type:String
    }

});

const admin = mongoose.model('admin' , adminSchema)
module.exports = admin