const mongoose = require("mongoose");


const scheduleSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },

  lectures: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'lecture'
  }],
  sections: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'section'
  }],
  level:{
    type:Number
  },
  semester:{
    type:Number
  }
});

module.exports = mongoose.model('schedule', scheduleSchema)

