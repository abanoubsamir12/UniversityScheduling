const mongoose = require("mongoose");

const Schema = mongoose.Schema

const center = new Schema({
    name: {
      type: String,
      required: true,
      unique: true,
    },

    rooms:[{
      type: Schema.Types.ObjectId,
      ref : 'room'
    }],

    colleges:[{
      type: Schema.Types.ObjectId,
      ref: 'college',
      required: true
    }],
    
    doctor:[{
      type : Schema.Types.ObjectId,
      ref : 'doctor'
    }]



   
  });
  
  module.exports = mongoose.model('center' , center)