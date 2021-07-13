module.exports = (error, req, res, next) => {
	if (error.message && error.message.length === 3)
	{
		const status = parseInt(error.message)
		if (status >= 400)
		{
			res.status(status).send({"Error": status})
			return
		}
	}
	next(error)
}