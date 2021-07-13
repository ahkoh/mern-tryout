const express = require("express")
const route = express.Router()
const dataService = require("../dataService.js")

route.get('/', async (req, res) => {
	res.set('Cache-Control', 'no-store')
	const messages = await dataService.getMessagesAsync(res.locals.login)
	res.send({"OK": 1, messages})
})

route.post('/', async (req, res) => {
	const count = await dataService.addMessageAsync(res.locals.login, req.body.message)
	res.send({"OK": "Message is added successfully", count})
})

route.delete('/', async (req, res) => {
	await dataService.delMessageAsync(res.locals.login, req.body.message)
	res.send({"OK": "Message is removed successfully"})
})


module.exports = route