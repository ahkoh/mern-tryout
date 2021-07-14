const express = require("express")
const route = express.Router()
const dataService = require("../dataService.js")
const { body, validationResult } = require('express-validator')

route.get('/', async (req, res) => {
	res.set('Cache-Control', 'no-store')
	const messages = await dataService.getMessagesAsync(res.locals.login)
	res.send({"OK": 1, messages})
})

route.post(
	'/',
	body('message').isLength({ min: 1 }),
	async (req, res) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
		  return res.status(400).json({ errors: errors.array() });
		}
		await dataService.addMessageAsync(res.locals.login, req.body.message)
		res.send({"OK": "Message is added successfully"})
	})

route.delete(
	'/',
	body('message').isLength({ min: 1 }),
	async (req, res) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
		  return res.status(400).json({ errors: errors.array() });
		}
		await dataService.delMessageAsync(res.locals.login, req.body.message)
		res.send({"OK": "Message is removed successfully"})
	})

module.exports = route