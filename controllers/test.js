/**
 * Test controller
 */
module.exports = function(app) {

	/**
	 * Index test action
	 */
	app.get('/test', function(req, res) {
		res.locals.title = 'Test';
		res.locals.time = 'test time, baby!';
		res.render('index');
	});

	/**
	 * Error test action
	 * Fake error in the action of the controller
	 */
	app.get('/test/error', function(req, res) {
		res.locals.title = 'Test / Error';
		res.locals.time = getTime(); // getTime() is not defined
		res.render('index');
	});

};
