const bcrypt = require('bcrypt')
const express = require('express')
const route = express.Router()
const dataService = require("../dataService.js")
const { body, validationResult } = require('express-validator')

route.post(
	'/register',
	body('email').isEmail(),
	body('password').isLength({ min: 6 }),
	body('firstName').isLength({ min: 1 }),
	body('lastName').isLength({ min: 1 }),
	async (req, res) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
		  return res.status(400).json({ errors: errors.array() });
		}
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

route.post(
	'/login',
	body('email').isEmail(),
	body('password').isLength({ min: 6 }),
	async (req, res) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
		  return res.status(400).json({ errors: errors.array() });
		}
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