const mongoose = require("mongoose");
const Schema = mongoose.Schema
const room = new Schema({
    name: {
      type: String,
      required: true,
    },
    capacity: {
        type: Number,
        required: true,
      },
    center:{
      type: Schema.Types.ObjectId,
      ref: 'center',
      required: true
    },
    lecture:{
      type: Schema.Types.ObjectId,
      ref:'lecture'
    },
    section:{
      type: Schema.Types.ObjectId,
      ref: 'section'
    }
    
  });
  
  module.exports = mongoose.model('room' , room)