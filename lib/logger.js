// Requirements
var winston = require('winston');

module.exports = function(wombat) {

	// Setup logger
	wombat.logger = new (winston.Logger)({
		transports: [
			new (winston.transports.Console)({
				colorize: wombat.options.cli || true,
				prettyPrint: wombat.options.cli || true,
				level: wombat.options.logLevel || 'info',
				silent: wombat.options.silent || false,
			})
		]
	});

	// Log to a file?
	if (wombat.options.logFile) {
		wombat.logger.add(new (winston.transports.File)({
			filename: wombat.options.logFile,
			handleExceptions: true,
		}));
	}

	// Alias: wombat.logger.log => wombat.log
	wombat.log = wombat.logger.log.bind(wombat.logger);

};
