const assert = require('assert');
const atob = require('atob');

/**
 * @param {function} find
 */
module.exports = function basicAuth({ find }) {
	return (req, res, next) => {
		const authorization = req.get('Authorization');
		assert(authorization, 'mo Authorization header was provided');
		if (authorization.includes('Basic')) {
			const [username, password] = atob(authorization.replace(/^Basic\s+/, '')).split(':');
			req.auth = { username, password };
			Promise.resolve(find(username, password))
			.then(res => {
				if (find.length === 2) {
					assert(res, 'username:password doesn\'t match');
				} else {
					// find returns {username: password}
					assert(res, 'username doesn\'t match');
					assert(res[username] === password, 'password doesn\'t match');
				}
				next();
			})
			.catch(next);
		}
	};
};
