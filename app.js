// Load modules
var express = require('express'),
	fs 		= require('fs'),
	path 	= require('path');

// Create Express app object
var app = express();

// Setup global variables for responses
app.locals({
	title: 'Basic Express skeleton app',
	year: (new Date).getFullYear().toString()
});

// Setup Express template engine
app.engine('html', require('ejs-locals'));

// Setup Express view options
app.set('views', __dirname + '/views');
app.set('view engine', 'html');

// Setup Express middlewares
app.use(express.bodyParser());
app.use(express.cookieParser());
app.use(express.methodOverride());
app.use(express.static(__dirname + '/public'));

// Initialize controllers
(function requireControllers(dir) {
	fs.readdirSync(dir).forEach(function(file) {
		// Do not process system files or dirs (started with ".")
		if (file.match(/^\./)) {
			return;
		}

		// Get stats for each file
		var stats = fs.statSync(path.join(dir, file));

		if (stats.isFile()) {
			// Require controller
			require(path.join(dir, file))(app);
		}
		else if (stats.isDirectory()) {
			// Recursive require controllers in sub-directories
			requireControllers(path.join(dir, file));
		}
	});
}(__dirname + '/controllers'));

// Setup 404 errors middleware
app.use(function(req, res, next) {
	console.log('--> Error: 404 Not Found ('+req.url+')');
	res.status(404).send('--> Error: 404 Not Found ('+req.url+')');
});

// Setup 500 errors middleware
//app.use(express.errorHandler({ dumpExceptions: false, showStack: false }));
app.use(function(err, req, res, next) {
	console.error('--> Error: 500 Internal Server Error ('+req.url+')');
	console.error(err.stack);
	res.status(500).send('--> Error: 500 Internal Server Error ('+req.url+')');
});

// Setup graceful shutdown handler
function onShutdown() {
	console.log('');
	console.log('Exiting...');
	// Some shutdown logic here...
	// ...
	process.exit();
}
process.on('SIGINT',  onShutdown); // CTRL+C
process.on('SIGTERM', onShutdown); // kill -15 <pid>

// Listen for requests
app.listen(7001);
console.log('App listening on port 7001...');
