const bcrypt = require('bcrypt')
const express = require('express')
const route = express.Router()
const dataService = require("../dataService.js")

route.post('/register', async (req, res) => {
	if (!req.body.password || req.body.password.length < 6)
		throw new Error('Password requires minimum 6 characters')
	const ret = await dataService.findOneAsync(req.body.email)
	if (ret) {
		res.status(422).send({"Error": "Email has been registered."})
	} else {
		const salt = await bcrypt.genSalt(10)
		const hash = await bcrypt.hash(req.body.password, salt)
		await dataService.registerAsync(req.body.firstName, req.body.lastName, req.body.email, hash)
		res.send({"OK": "You have successfully registered."})
	}
})

route.post('/login', async (req, res) => {
	if (!req.body.email)
		throw new Error('Email is required')
	if (!req.body.password || req.body.password.length < 6)
		throw new Error('Password requires minimum 6 characters')
	const entity = await dataService.findOneAsync(req.body.email)
	if (entity && await bcrypt.compare(req.body.password, entity.password)) {
		req.session.token = `${parseInt(Date.now() /60e3)}|${req.body.email}`
		res.set('Cache-Control', 'no-store')
		res.send({"OK": `Hi ${entity.firstName} ${entity.lastName}, welcome back.`})
	} else {
		res.status(401).send({"Error": "Login failed. Please check email or password."})
	}
})

route.get('/logout', (req, res) => {
	req.session = null
	res.send({"OK": "You have logged out successfully"})
})

module.exports = route