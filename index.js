// Requirements
var 
	os = require('os'),
	fs = require('fs'),
	winston = require('winston'),
	wombatfile = require('./lib/wombatfile'),
	platformDetect = require('./lib/platform-detect')
;

// Wombat constructor
var Wombat = module.exports = function(options) {

	// Set options
	this.options = options;

	// Default cwd
	this.options.cwd = this.options.cwd || process.cwd();

	// Setup logger
	this.logger = new (winston.Logger)({
		transports: [
			new (winston.transports.Console)({
				colorize: this.options.cli || true,
				prettyPrint: this.options.cli || true,
				level: this.options.logLevel || 'info',
				silent: this.options.silent || false,
			})
		]
	});

	// Log to a file?
	if (this.options.logFile) {
		this.logger.add(new (winston.transports.File)({
			filename: this.options.logFile,
			handleExceptions: true,
		}));
	}

	// Log init
	this.logger.log('info', 'Initalizing...');
	this.logger.log('verbose', 'Options: ', this.options);

	// Decorate with the platform driver
	var p = platformDetect();
	try {
		this.platform = require('./' + path.join('lib', 'platforms', p + '.js'))(this);
	} catch(e) {
		// Fail if platform is not supported
		this.logger.log('error', 'Platform not supported', e, p);
		process.exit(1);
	}
	this.logger.log('verbose', 'Platform detected: %s', p);
	
	// Decorate with plugins
	require('./lib/plugin.js')(this);

	// Decorate with exec
	require('./lib/exec.js')(this);

	// Decorate with package
	require('./lib/package.js')(this);

	// Decorate with service
	require('./lib/service.js')(this);

	// Load wombatfile and call the config function
	wombatfile.load(this.options.cwd, function(err, filepath, configFnc) {

		// Exit on error
		if (err) {
			this.logger.log('error', 'Initalization Error', err);
			this.logger.log('error', err.stack);
			process.exit(2);
		}

		// Log loaded file
		this.logger.log('info', 'Wombatfile: %s', filepath);

		// Call config function
		try {
			configFnc(this);
		} catch(err) {
			this.logger.log('error', 'Config Error', err);
			this.logger.log('error', err.stack);
			process.exit(3);
		}
		
	}.bind(this));

};

// Load the package.json to get version
try {
	// Get path to package.json
	var pkgPath = path.join(__dirname, 'package.json');

	// Load the file
	var pkg = fs.readFileSync(pkgPath, {encoding: 'utf8'});
	pkg = JSON.parse(pkg);

	// Add version to rufio
	Wombat.version = pkg.version;
} catch(err) {
	console.error('Failed to load package.json, version unknown');
}
