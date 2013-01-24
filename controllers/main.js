/**
 * Main controller
 */
module.exports = {

	/**
	 * Index action
	 *
	 * URL: /
	 */
	index: {
		method: 'get',
		path: 	'/',
		action: function(req, res) {
			res.locals.time = (new Date()).getTime().toString();
			res.render('index');
		}
	},

	/**
	 * Test action without method (this action must not be mapped)
	 *
	 * URL: /main/no-method
	 */
	noMethod: {
		path: 	'/main/no-method',
		action: function(req, res) {
			res.send('no-no-no!');
		}
	}

};
