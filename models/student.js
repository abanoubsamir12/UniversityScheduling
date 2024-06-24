const mongoose = require("mongoose");
const user = require("./user")
const student = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    studentID:{
        type: Number
    },
    lecture:[{
        type:mongoose. Schema.ObjectId,
        ref: 'lecture'
    }],
    level:{
        type: Number
    },
    semester:{
        type: Number
    },
    subjects:[{
        
        type: mongoose.Schema.ObjectId,
        ref:'subject'
    }]


});
const stud = mongoose.model('student' , student)
module.exports = stud