const express = require("express")
const router = express.Router()
const Future = require('../models/futureEvents')

// ---Get Index
router.get('/', async (req, res) => {
    try {
        const futureEvents = await Future.find({});
        res.render('futureEvents/index', {
            foundFutureEvents: futureEvents.sort((a,b) => {
                if(a.date > b.date) return 1;
                if(a.date < b.date) return -1;
                return 0;
              }),
        });
    } catch (error) {
        res.status(500).send()
    }
});

//-----Get New Event
router.get('/new', (req, res) => {
    if (req.session.loggedIn === true) {
        res.render('futureEvents/new.ejs');
      } else {
        res.redirect('/');
      }
});

//-----Get Events Show
router.get('/:id', async (req, res) => {
    try {
        const futureEvent = await Future.findById(req.params.id);
        res.render('futureEvents/show.ejs', {
            foundFutureEvent: futureEvent,
        });
    } catch (error) {
        res.status(500).send()
    }
});

//-----Get Event Edit
router.get('/:id/edit', async (req, res) => {
    try {
        const futureEvent = await Future.findById(req.params.id);
        res.render('futureEvents/edit.ejs', {
            foundFutureEvent: futureEvent,
        });
    } catch (error) {
        res.status(500).send()
    }
});

//----Get Events Create
router.post('/', async (req, res) => {
    try {
        await Future.create(req.body);
        res.redirect('/futureEvents');
    } catch (error) {
        res.status(500).send()
    }
});

// ----Delete Route
router.delete('/:id', async (req, res) => {
    try {
      await Future.findByIdAndDelete(req.params.id);
      res.redirect('/futureEvents');
    } catch (error) {
        res.status(500).send()
    }
  });

//-----Get Events Update
router.put('/:id', async (req, res) => {
    try {
        await Future.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.redirect('/futureEvents');
    } catch (error) {
        res.status(500).send()
    }
});

module.exports = router;