const mongoose = require('mongoose');

const PresetSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users'
  },
  name: {
    type: String,
    required: true
  },
  number: {
    type: Number,
    required: true
  },
  month: {
    type: String,
    required: true
  },
  year: {
    type: Number,
    required: false
  },
  category: {
    type: String,
    required: true
  },
  type: {
    type: String,
    required: true
  },
  piggybank: {
    type: [
      {
        month: {
          type: String,
          required: false
        },
        year: {
          type: Number,
          required: false
        },
        savedAmount: {
          type: Number,
          required: false
        }
      }
    ],
    required: false
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('preset', PresetSchema);
