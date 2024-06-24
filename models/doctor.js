const mongoose = require("mongoose");
const userSchema = require("./user")



const doctorSchema = new mongoose.Schema({

    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
     center: {
        type: mongoose.Schema.ObjectId,
        ref: 'center'
    },
    subject:[{
        type: mongoose.Schema.ObjectId,
        ref: 'subject'
    }],

    lecture:[{
        type: mongoose.Schema.ObjectId,
        ref: 'lecture'
    }]

    


});

const doctor = mongoose.model('doctor' , doctorSchema)
module.exports = doctor