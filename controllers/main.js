/**
 * Main controller
 */
module.exports = function(app) {

	/**
	 * Get current timestamp
	 * This example function shows how you can create private controller methods
	 *
	 * @return {Number}
	 */
	function getTime() {
		return (new Date).getTime();
	}

	/**
	 * Index action
	 */
	app.get('/', function(req, res) {
		res.locals.time = getTime();
		res.render('index');
	});

	/**
	 * Test action of all methods supported
	 */
	app.all('/main/all-methods', function(req, res) {
		res.send('method: '+req.method);
	});

};
