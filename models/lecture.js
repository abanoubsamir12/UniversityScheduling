const mongoose = require("mongoose");
const Schema = mongoose.Schema
const lecture = new Schema({
  
    room:{
      type: Schema.Types.ObjectId,
      ref:'room'
    },
    doctor:{
        type: Schema.Types.ObjectId,
        ref:'doctor'
    },
    subject:{
        type: Schema.Types.ObjectId,
        ref:'subject'
    },
    schedule:
    {
        type: Schema.Types.ObjectId,
        ref: 'schedule'
    },
    students:[{

        type: Schema.Types.ObjectId,
        ref: 'student'
    }],
    semester:{
        type: Number,
        required:true
    },
    row: {
        type: Number
      },
      col: {
        type: Number
      }
    

  });
  
  module.exports = mongoose.model('lecture' , lecture)