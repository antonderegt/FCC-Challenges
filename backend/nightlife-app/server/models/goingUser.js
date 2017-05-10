const mongoose = require('mongoose'),
      Schema = mongoose.Schema

var GoingUser = new Schema({
  idBar: String,
  goingUsers: [String]
})

module.exports = mongoose.model('GoingUser', GoingUser)
