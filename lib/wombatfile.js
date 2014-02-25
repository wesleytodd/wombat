// Requirements
var fs = require('fs')
	path = require('path');

// Public Interface
var wombatfile = module.exports = {};

// Wombatfile name
wombatfile.filename = 'Wombatfile.js';

// Find the Wombatfile.js
wombatfile.find = function(cb) {

	// Check for in the current directory
	var checkFile = function(file) {
		// Get the abslute path
		var abspath = path.resolve(file);

		// Check if it exists
		fs.exists(file, function(exists) {
			if (exists) {
				return cb(null, abspath);
			}
			
			// Check if we are at the root
			if (abspath == path.sep + wombatfile.filename) {
				return cb(new Error('Wombatfile not found.'));
			}

			// Check the next filepath
			checkFile(path.join('..', file));
		});
	};

	// Kick things off
	checkFile(wombatfile.filename);

};

// Find and require the wombatfile
wombatfile.load = function(cwd, cb) {
	// Cwd default
	if (!cb) {
		cb = cwd;
		cwd = process.cwd();
	}

	// Chdir to specified directory
	curCwd = process.cwd();
	if (curCwd != cwd) {
		process.chdir(cwd);
	}

	wombatfile.find(function(err, wombatfile) {
		// Change dir back
		if (curCwd != cwd) {
			process.chdir(curCwd);
		}

		// Fail on find error
		if (err) {
			return cb(err);
		}

		// Require it
		try {
			var configFnc = require(wombatfile);
		} catch(err) {
			return cb(err);
		}

		// Loaded
		cb(null, wombatfile, configFnc);
	});
};
