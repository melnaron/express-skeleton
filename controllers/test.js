/**
 * Test controller
 */
module.exports = {

	/**
	 * Index action
	 *
	 * URL: /test
	 */
	index: {
		method: 'get',
		path: 	'/test',
		action: function(req, res) {
			res.locals.title = 'Test';
			res.locals.time = 'test time, baby!';
			res.render('index');
		}
	},

	/**
	 * Error action
	 * Fake error in the action of the controller
	 *
	 * URL: /test/error
	 */
	error: {
		method: 'get',
		path: 	'/test/error',
		action: function(req, res) {
			res.locals.title = 'Test / Error';
			res.locals.time = getTime(); // getTime() is not defined
			res.render('index');
		}
	}

};
