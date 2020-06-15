// MIDDLEWARES

loguedUser = (req, res, next) => {
	 
    if (!req.session.usuario) {
		res.redirect('/login');
	} else {
		next();
	}
}

redirect = (req, res, next) => {
	if(!req.secure) { 
		res.redirect('https://' + req.headers.host + req.url); 
	} else { 
		next(); 
	} 
}

module.exports = {loguedUser, redirect};