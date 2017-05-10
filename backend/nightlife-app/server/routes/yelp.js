const express = require('express'),
      GoingUser = require('../models/goingUser'),
      BarLocation = require('../models/location'),
      router = express.Router(),
      yelp = require('yelp-fusion'),
      init = new GoingUser({
        idBar: 'café-pieper-amsterdam-2',
        goingUsers: ['antonderegt']
      })

router.post('/', (req, res) => {
  let location = req.body.location

  yelp.accessToken(process.env.YELP_CLIENT_ID, process.env.YELP_CLIENT_SECRET).then(response => {
    const client = yelp.client(response.jsonBody.access_token);

    client.search({
      categories:'bars',
      location,
      sort_by: 'rating'
    }).then(response => {
      res.json({
        confirmation: 'success',
        result: response.jsonBody.businesses
      })
    });
  }).catch(e => {
    console.log(e);
  });
})

router.get('/goingusers', (req, res) => {
  GoingUser.find({}, (err, goingUsers) => {
    if(err) throw err
    if(!goingUsers.length) {
      init.save(err => {
        if(err) throw err
        res.json({
          confirmation: 'success',
          result: init
        })
      })
    } else {
      res.json({
        confirmation: 'success',
        result: goingUsers
      })
    }
  })
})

router.post('/goingusers', (req, res) => {
  let idBar = req.body.idBar
  let idUser = req.body.idUser

  GoingUser.findOneAndUpdate({ idBar }, {
      $push: {"goingUsers": idUser}
    }, {
      safe: true, upsert: true, new : true
    }, (err, model) => {
        if(err) throw err
        GoingUser.find({}, (err, goingUsers) => {
          if(err) throw err
            res.json({
              confirmation: 'success',
              result: goingUsers
            })
        })
      }
  )
})

router.post('/userbackingout', (req, res) => {
  let idBar = req.body.idBar
  let idUser = req.body.idUser

  GoingUser.findOneAndUpdate({ idBar }, {
      $pull: {"goingUsers": idUser}
    }, {
      safe: true, upsert: true, new : true
    }, (err, model) => {
        if(err) throw err
        GoingUser.find({}, (err, goingUsers) => {
          if(err) throw err
            res.json({
              confirmation: 'success',
              result: goingUsers
            })
        })
      }
  )
})

router.post('/review', (req, res) => {
  let id = req.body.id

  yelp.accessToken(process.env.YELP_CLIENT_ID, process.env.YELP_CLIENT_SECRET).then(response => {
    const client = yelp.client(response.jsonBody.access_token)

    client.reviews(id)
    .then(response => {
      res.json({
        confirmation: 'success',
        result: response.jsonBody.reviews[0].text
      })
    })
    .catch(e => {
      console.log('err');
      res.json({
        confirmation: 'fail',
        result: 'No reviews yet...'
      })
    })
  })
})

router.post('/location', (req, res) => {
  let location = req.body.location

  BarLocation.findOneAndUpdate({}, { location }, {
      safe: true, upsert: true, new : true
    }, (err, location) => {
      if(err) throw err
      res.json({
        confirmation: 'success',
        result: location
      })
    }
  )
})

router.get('/location', (req, res) => {
  BarLocation.find({}, (err, location) => {
    if(err) throw err
    res.json({
      confirmation: 'success',
      result: location
    })
  })
})

module.exports = router
