const express = require('express'),
      router = express.Router(),
      axios = require('axios'),
      controllers = require('../controllers'),
      controller = controllers['stock']

module.exports = (() => {
  'use strict';

  router.get('/symbol/:symbol', (req, res) => {
    let symbol = req.params.symbol

    let today = new Date();
    let thisDay = today.getDate();
    let thisMonth = today.getMonth()+1; //January is 0!
    let thisYear = today.getFullYear();

    if(thisDay<10) {
        thisDay='0'+thisDay
    }

    if(thisMonth<10) {
        thisMonth='0'+thisMonth
    }

    today = `${thisYear}-${thisMonth}-${thisDay}`

    let prevDay = thisDay - 1
    let prevMonth = thisMonth - 1
    let prevYear = thisYear - 1
    if(prevDay === 0) {
      prevDay = 30
    }
    if(prevMonth === 0) {
      prevMonth = 12
    }

    let oneYearAgo = `${prevYear}-${prevMonth}-${prevDay}`

    let startDate = oneYearAgo
    let endDate = today

    axios.get(`https://www.quandl.com/api/v3/datasets/WIKI/${symbol}.json?start_date=${startDate}&end_date=${endDate}&order=asc&column_index=4&collapse=monthly&api_key=${process.env.QUANDL_API_KEY}`)
    .then(response => {
      res.json(response.data.dataset)
    })
    .catch(err => {
      console.log(err);
      res.json(symbol)
    })
  })

  router.post('/delete/:symbol', (req, res) => {
    let symbol = req.params.symbol
    controller.deleteStock({ symbol }, (err, result) => {
      if(err) throw err
      res.json(result);
    })
  })

  router.get('/', (req, res) => {
    controller.findAll((err, result) => {
      if(err) throw err
      res.json(result);
    })
  })

  return router;
})();
