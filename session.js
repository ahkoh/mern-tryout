const cookieSession = require('cookie-session')

const cookie = (secret) => cookieSession({
	name: 's',
	secret: secret,
	//process.env.COOKIE_SECRET,
	sameSite: 'strict',
	httpOnly: true,
	secure: false,
	maxAge: 1 * 60 * 60 * 1000 // 1 hours
})

const readSession = (req, res, next) => {
	if (req.session && req.session.token)
	{
		const [timestamp, email] = req.session.token.split('|')
		if (parseInt(timestamp) + 2 >= parseInt(Date.now() /60e3))
		{
			res.locals.login = email
			//extend session by minute
			req.session.token = `${parseInt(Date.now() /60e3)}|${email}`
		}
	}
	next()
}

function isUser(req, res, next) {
	if (res.locals.login)
		next()
	else
		res.status(401).send({"OK": 0, "Error": "You are not logged in or session is expired."})
}

exports.middleware = (secret) => [cookie(secret), readSession]

exports.checkLogin =  (req, res, next) => {
	if (res.locals.login)
		next()
	else
		res.status(401).send({"OK": 0, "Error": "You are not logged in or session is expired."})
}
