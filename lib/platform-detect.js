// Requirements
var path = require('path')
	fs = require('fs');

// Detect platform function
module.exports = function(wombat, done) {

	// Detect the platform we are running on
	wombat.transport.platform(function(err, platform) {
		if (platform == 'linux') {

			// Check for the issue file
			var issueFilePath = path.join('/', 'etc', 'issue');
			wombat.transport.exists(issueFilePath, function(err, exists) {
				if (err) {
					return done('Linux flavor not known');
				}

				// Read the issue file
				wombat.transport.readFile(issueFilePath, function(err, issueFile) {
					if (err) {
						return done(err);
					}
					
					// Check for Debian like value
					if (/ubuntu|debian/i.test(issueFile)) {
						return done(null, 'debian');
					}
				});
				
			});

		} else {
			// Not supported
			done('Platform not supported');
		}
	});

};
