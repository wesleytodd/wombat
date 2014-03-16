// Requirements
var fs = require('fs');

module.exports = function(wombat) {

	var transport = {};

	// Platform detection
	transport.platform = function(done) {
		done(null, process.platform);
	};

	// File exists?
	transport.exists = function(filepath, done) {
		fs.exists(filepath, function(exists) {
			done(null, exists);
		});
	};

	// Read a file
	transport.readFile = function(filename, done) {
		fs.readFile(filename, {encoding: 'utf8'}, done);
	};

	// Write a file
	transport.writeFile = function(filename, data, done) {
		fs.writeFile(filename, data, {encoding: 'utf8'}, done);
	};

	// Reads in the file, transforms it, writes it out
	transport.copy = function(src, dest, transform, done) {
		fs.readFile(src, {encoding: 'utf8'}, function(err, content) {
			// Return on error
			if (err) {
				return done(err);
			}

			// Default transform function is a identity func
			if (typeof transform !== 'function') {
				transform = function(d) { return d; };
			}

			// Process with transform function
			transform(content, function(err, content) {
				// Return on error
				if (err) {
					return done(err);
				}
				
				// Write file
				fs.writeFile(dest, content, {encoding: 'utf8'}, done);
			});
			
		});
	};

	// Decorate with transport
	wombat.transport = transport;

};
