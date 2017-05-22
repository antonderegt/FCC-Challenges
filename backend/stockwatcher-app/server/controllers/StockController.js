const Stock = require('../models/stock')

module.exports = {
  findAll: callback => {
    Stock.find({}, (err, polls) => {
      if (err){
        callback(err, null)
        return
      }
      callback(null, polls)
    })
  },
  addStock: (params, callback) => {
    let symbolParam = params.toUpperCase()

    Stock.update(
      { symbol: symbolParam},
      { $setOnInsert: { symbol: symbolParam } },
      { upsert: true }, (err, poll) => {
      if (err){
        callback(err, null)
        return
      }
      callback(null, poll)
    })
  },
  deleteStock: function(symbol, callback){
    Stock.findOneAndRemove(symbol, (err, poll) => {
      if (err){
        callback(err, null)
        return
      }
      callback(null, poll)
    })
  }
}
