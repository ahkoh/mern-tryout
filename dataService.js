const Account = require('./models/Account')

exports.findOneAsync = async (email) => {
	const account = await Account.findOne({email}).exec()
	return account
}

exports.loginAsync = async (email, password) => {
	const entity = await this.findOneAsync(email)
	return (entity && entity.password === password)
}

exports.registerAsync = async (firstName, lastName, email, password) => {
	const account = new Account({
		firstName,
		lastName,
		email,
		password,
		messages: []
	})
	await account.save() //try catch
}

exports.getMessagesAsync = async (email) => {
	const entity = await this.findOneAsync(email)
	if (entity)
		return entity.messages
	return []
}

exports.addMessageAsync = async (email, message) => {
	const entity = await this.findOneAsync(email)
	if (entity)
	{
		entity.messages.push(message)
		await entity.save()
	}
}

exports.delMessageAsync = async (email, message) => {
	const entity = await this.findOneAsync(email)
	if (entity)
	{
		const i = entity.messages.indexOf(message)
		if (i >= 0)
		{
			entity.messages.pull(message)
			await entity.save()
		}
	}
}