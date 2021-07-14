const express = require("express")
const route = express.Router()
const dataService = require("../dataService.js")

route.post('/register', async (req, res) => {
	const ret = await dataService.findOneAsync(req.body.email)
	if (ret) {
		res.status(422).send({"Error": "Email has been registered."})
	} else {
		await dataService.registerAsync(req.body.firstName, req.body.lastName, req.body.email, req.body.password)
		res.send({"OK": "You have successfully registered."})
	}
})

route.post('/login', async (req, res) => {
	if (await dataService.loginAsync(req.body.email, req.body.password)) {
		const entity = await dataService.findOneAsync(req.body.email)
		req.session.token = `${parseInt(Date.now() /60e3)}|${req.body.email}`
		res.set('Cache-Control', 'no-store')
		res.set('Access-Control-Allow-Headers', 'Set-Cookie')
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