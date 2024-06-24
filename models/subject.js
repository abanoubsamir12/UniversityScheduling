const mongoose = require("mongoose");

const subject = new mongoose.Schema({
    name: {
      type: String,
      required: true,
      unique: true,
    },
    doctor:{
      type: mongoose.Schema.ObjectId,
      ref: 'doctor'
    },
    lectures:[{
      type: mongoose.Schema.ObjectId,
      ref: 'lecture'
    }],
    students:[{
      type: mongoose.Schema.ObjectId,
      ref: 'student'
    }],

    level:{
      type: Number
      

    },

    sections:[{
      type: mongoose.Schema.ObjectId,
      ref: 'section'

    }],
    semester:{
      type: Number,
    },

    major:{
      type:String
    }
    
    
   
  });
  
  module.exports = mongoose.model('subject' , subject)