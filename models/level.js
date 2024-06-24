const mongoose = require("mongoose");

const level = new mongoose.Schema({
    name: {
      type: Number,
      required: true,
      unique: true,
    },

    college: {
      type :mongoose.Schema.Types.ObjectId,
      ref : 'college'
      
    },
    students:[{
      type: mongoose.Schema.ObjectId,
      ref:'student'
    }],

    subjects:[{
      type: mongoose.Schema.ObjectId,
      ref:'subject'
    }],
   
  });
  
  module.exports = mongoose.model('level' , level)