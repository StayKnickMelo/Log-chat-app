const mongoose = require('mongoose');


const LogSchema = mongoose.Schema({
  message: {
    type: String,
    required: true
  },

  attention: {
    type: Boolean,
    default: false

  },

  tech: {
    type: String,
    required: true
  },

  date: {
    type: Date,
    default: Date.now
  },
  idNum: {
    type: Number
  }

});

module.exports = mongoose.model('log', LogSchema)