const mongoose = require('mongoose'),
      Schema = mongoose.Schema;

var Stock = new Schema({
  symbol: String
});

module.exports = mongoose.model('Stock', Stock);
