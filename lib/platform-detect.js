// Requirements
var path = require('path')
	fs = require('fs');

// Detect platform function
module.exports = function() {
	// Is linux?
	if (process.platform == 'linux') {
		// Does the issues file exist?
		var issueFilePath = path.join('/', 'etc', 'issue');
		if (fs.existsSync(issueFilePath)) {
			var issueFile = fs.readFileSync(issueFilePath);
			if (/ubuntu|debian/i.test(issueFile)) {
				return 'debian';
			}
		}
	}
};
