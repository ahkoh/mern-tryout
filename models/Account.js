const mongoose = require('mongoose')

const AccountSchema = mongoose.Schema({
	email: {index: true, unique: true, type: String, required: true},
	firstName: {type: String, required: true},
	lastName: {type: String, required: true},
	password: {type: String, required: true},
	messages: [[String]]
})

module.exports = mongoose.model('Account', AccountSchema)
