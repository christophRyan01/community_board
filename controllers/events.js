const express = require("express")
const router = express.Router()
const Today = require('../models/events')


// ---Get Index
router.get('/', async (req, res) => {
  try {
    const events = await Today.find({});
    res.render('events/index', {
      foundEvents: events.sort((a,b) => {
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
    res.render('events/new.ejs');
  } else {
    res.redirect('/');
  }
});

//-----Get Events Show
router.get('/:id', async (req, res) => {
  try {
    const event = await Today.findById(req.params.id);
    res.render('events/show.ejs', {
      foundEvent: event,
    });
  } catch (error) {
    res.status(500).send()
  }
});

//-----Get Event Edit
router.get('/:id/edit', async (req, res) => {
  try {
    const event = await Today.findById(req.params.id);
    res.render('events/edit.ejs', {
      foundEvent: event,
    });
  } catch (error) {
    res.status(500).send()
  }
});

//-----Get Events Update
router.put('/:id', async (req, res) => {
  try {
    await Today.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.redirect('/events');
  } catch (error) {
    res.status(500).send()
  }
});

//----Get Events Create
router.post('/', async (req, res) => {
  try {
    await Today.create(req.body);
    res.redirect('/events');
  } catch (error) {
    res.status(500).send()
  }
});

// ----Delete Route
router.delete('/:id', async (req, res) => {
  try {
    await Today.findByIdAndDelete(req.params.id);
    res.redirect('/events');
  } catch (error) {
    res.status(500).send()
  }
});

module.exports = router;