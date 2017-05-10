const express = require('express'),
      router = express.Router(),
      passport = require('passport')

router.get('/github',
  passport.authenticate('github'))

router.get('/github/callback',
  passport.authenticate('github', { failureRedirect: '/' }),
  (req, res) => {
    res.redirect('/')
  })

module.exports = router
