var _ = require('lodash');

module.exports = function(wombat) {

	// Decorate Wombat
	wombat.template = function(src, dest, data, done) {

		// Default data to empty object
		if (typeof data === 'function') {
			done = data;
			data = {};
		}

		// Default done function
		done = done || function() {};

		// The transform function
		var tmpl = function(content, done) {
			// Render the template
			try {
				var c = _.template(content, data);
			} catch(e) {
				wombat.log('error', 'Template rendering error: %s', e.toString());
				done(e);
			}

			// Complete
			done(null, c);
		};

		// Call transport copy method
		wombat.transport.copy(src, dest, tmpl, done);

	};

};
