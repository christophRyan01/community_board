const express = require('express')
const User = require('../models/user');

const router = express.Router();

// --Get Login
router.post('/login', (req, res) => {
    req.session.username = req.body.username
    req.session.loggedIn = true
    res.redirect('/events')
})

// --Get Logout
router.get('/logout', (req, res) => {
    req.session.destroy(err => {
        if (err) {
            res.status(500).send()
            res.redirect('/')
        } else {
            res.redirect('/')
        }
    })
})


module.exports = router;