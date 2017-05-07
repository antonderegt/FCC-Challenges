const express = require('express'),
      Poll = require('../models/poll'),
      router = express.Router(),
      shortid = require('shortid');

module.exports = (() => {
  'use strict';

  // Fetching my polls
  router.get('/mypolls/:username', (req, res) => {
    let username = req.params.username

    Poll.find({ owner: username }, (err, result) => {
      if(err) {
        res.json({
          confirmation: 'fail',
          message: err
        })
      }
      res.json({
        confirmation: 'success',
        result
      })
    })
  })

  // Removing a poll
  router.post('/removepoll/:id', (req, res) => {
    let id = req.params.id

    Poll.findByIdAndRemove(id, (err, result) => {
      if(err) {
        res.json({
          confirmation: 'fail',
          message: err
        })
      }
      console.log(result);
      res.json({
        confirmation: 'success'
      })
    })
  })

  // Finding single poll by id
  router.get('/:id', (req, res) => {
    let id = req.params.id

    Poll.findById(id, (err, result) => {
      if(err) {
        res.json({
          confirmation: 'fail',
          message: err
        })
      }
      res.json({
        confirmation: 'success',
        result
      })
    })
  })

  // Checking if voter already voted on poll
  router.post('/checkvoter', (req, res) => {
    let id = req.body._id
    let voters = req.body.voters
    let ip = req.headers['x-forwarded-for'] ||
             req.connection.remoteAddress ||
             req.socket.remoteAddress ||
             req.connection.socket.remoteAddress;

    let voted = false

    voters.map(voter => {
      if(voter.ip === ip) {
        voted = true
      }
      return voter
    })

    if(voted) {
      console.log('already voted if statement');
      res.json({
        confirmation: 'fail'
      })
    } else {
      console.log('not voted yet');
      res.json({
        confirmation: 'success'
      })
    }
  })

  // Checking if users ip has already voted on poll
  const checkIp = (voters, ip) => {
    let voted = false

    voters.map(voter => {
      if(voter.ip === ip) {
        voted = true
      }
      return voter
    })

    return voted ? false : true
  }

  // Voting on a poll
  router.post('/vote', (req, res) => {
    let id = req.body._id
    let updatedPoll = req.body
    let ip = req.headers['x-forwarded-for'] ||
             req.connection.remoteAddress ||
             req.socket.remoteAddress ||
             req.connection.socket.remoteAddress;

    if(checkIp(updatedPoll.voters, ip)) {
      updatedPoll.voters.push({ip})
      Poll.findByIdAndUpdate(id, updatedPoll, (err, poll) => {
        if(err) {
          res.json({
            confirmation: 'fail',
            message: err
          })
        }

        res.json({
          confirmation: 'success',
          result: updatedPoll
        })
      })
    } else {
      Poll.findById(id, (err, result) => {
        if(err) {
          res.json({
            confirmation: 'fail',
            message: err
          })
        }
        res.json({
          confirmation: 'fail',
          result
        })
      })
    }
  })

  // Adding an option to a poll
  router.post('/addoption', (req, res) => {
    let id = req.body._id
    let updatedPoll = req.body

    Poll.findByIdAndUpdate(id, updatedPoll, (err, poll) => {
      if(err) {
        res.json({
          confirmation: 'fail',
          message: err
        })
      }

      res.json({
        confirmation: 'success',
        result: updatedPoll
      })
    })
  })

  // Adding a new poll
  router.post('/addpoll', (req, res) => {
    let id = shortid.generate()
    let updatedPoll = req.body
    updatedPoll._id = id

    Poll.create(updatedPoll, (err, poll) => {
      if(err) {
        res.json({
          confirmation: 'fail',
          message: err
        })
      }

      res.json({
        confirmation: 'success',
        result: poll
      })
    })
  })

  // Fetching all polls
  router.get('/', (req, res) => {

    Poll.find({}, (err, polls) => {
      if(err) throw err
      if(!polls.length) {
        const init = new Poll({
          _id: shortid.generate(),
          name: 'Who\'s your super hero',
          options: [{value: 'Tess', votes: 2}, {value: 'Suzanne', votes: 1}],
          totalVotes: 3,
          owner: "antonderegt"
        })
        init.save((err) => {
          if(err) throw err
        })
        res.send([init])
      } else {
        res.send(polls)
      }
    })
  })

  return router
})()
