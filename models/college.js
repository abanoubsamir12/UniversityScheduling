const mongoose = require("mongoose");
const center = require("./center");

const college = new mongoose.Schema({
    name: {
      type: String,
      required: true,
      unique: true,
    },
    centers:[{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'center',
      required: true
    }],
    
    levels: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'level'
    }]

    

    
  });
 
  module.exports = mongoose.model('college' , college)