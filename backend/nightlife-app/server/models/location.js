const mongoose = require('mongoose'),
      Schema = mongoose.Schema;

var Location = new Schema({
  location: String
});

module.exports = mongoose.model('Location', Location);
