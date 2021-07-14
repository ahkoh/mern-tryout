const mongoose = require('mongoose')
const express = require('express')
const messageRoute = require('./routes/messages')
const loginRoute = require('./routes/login')
const session = require('./session')
const errorHandler = require('./errorHandler')
const cors = require('cors')
const path = require('path')
require("dotenv/config")

mongoose.connect(
	process.env.MONGODB_CONNECTION_STRING,
	{
		useNewUrlParser: true,
		useUnifiedTopology: true,
		useCreateIndex: true
	},
	() => console.log('Mongodb connected'))

const app = express()
app.disable('x-powered-by')
app.set('trust proxy', 'loopback')
app.use(cors({'credentials': true, 'origin':process.env.CORS_ORIGIN}))
app.use(express.static('public'))
app.use(express.json({extended: true}))
app.use(session.middleware(process.env.COOKIE_SECRET, process.env.COOKIE_EXPIRE_MINUTE))
app.use('/messages', session.checkLogin, messageRoute)
app.use('/', loginRoute)
app.get('/', (req, res) => res.sendFile(path.join(__dirname, '/public/index.htm')))
app.use(errorHandler)

app.listen(process.env.PORT, () => console.info('Server started'))