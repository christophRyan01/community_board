//----------------Require Statments
const express = require("express")
const ejsLayouts = require("express-ejs-layouts");
const methodOverride = require("method-override")
const session = require('express-session')
const expressLayouts = require('express-ejs-layouts')
const app = express()
require('dotenv').config()
const router = express.Router()

// -----------Controllers
const eventsController = require('./controllers/events')
const futureEventsController = require('./controllers/futureEvents')
const sessionsController = require('./controllers/sessions')

// ---DataBase
require('./db/db')


// ---MiddleWare
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
}))

// ----Parse data

app.use(methodOverride('_method'))
app.use(express.urlencoded({ extended: false }))
app.set('view engine', 'ejs');
app.use(ejsLayouts);

// --StyleCSS
app.use(express.static(__dirname + '/public/'));

//---------------Routes
app.get('/', (req, res) => {
    res.render('home')
})

// ----------Events Routes
app.use('/', sessionsController)
app.use('/events', eventsController)
app.use('/futureEvents', futureEventsController)

app.listen(process.env.PORT || 3000)


