const mongoose = require("mongoose");

const section = new mongoose.Schema({
    name: {
      type: String,
      required: true,
      unique: true,
    },

    subject:{
      
      type: mongoose.Schema.ObjectId,
      ref: 'subject'
    },


    schedule:{
      
      type: mongoose.Schema.ObjectId,
      ref: 'schedule'
    },

    room:{
      type:mongoose.Schema.ObjectId,
      ref: 'room' 
    },


    TA:[{
      
      type: mongoose.Schema.ObjectId,
      ref: 'TA'
    }],
    row: {
      type: Number
    },
    col: {
      type: Number
    }
  });
  
  module.exports = mongoose.model('section' , section)