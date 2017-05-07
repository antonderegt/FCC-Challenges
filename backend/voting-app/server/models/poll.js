'use strict';

const mongoose = require('mongoose'),
      Schema = mongoose.Schema;

var Poll = new Schema({
  _id: String,
  name: String,
  options: [{
    value: String,
    votes: Number
  }],
  totalVotes: Number,
  owner: String,
  voters: [{
    ip: String
  }]
});

module.exports = mongoose.model('Poll', Poll);
