// Requirements
var Looker = require('looker');

module.exports = function(wombat) {

	// Setup plugin load paths
	wombat.pluginPaths = new Looker();
	wombat.pluginPaths.lookupPath(path.join(__dirname, 'node_modules'));
	wombat.pluginPaths.lookupPath(path.join(wombat.options.cwd, 'node_modules'));

	// Keeps a list of loaded plugins
	wombat.plugins = {};

	// Decorate wombat with plugin load function
	wombat.load = function(pluginName) {
		// Check if plugin is already loaded
		if (wombat.plugins[pluginName]) {
			return wombat.plugins[pluginName];
		}

		// Require the plugin
		try {
			var pluginInit = wombat.pluginPaths.requireSync(pluginName);
		} catch(err) {
			wombat.logger.log('error', 'Error loading plugin: %s', err.toString());
			return;
		}

		// Log error if no plugin init function was returned
		if (typeof pluginInit !== 'function') {
			wombat.logger.log('error', 'Error loading plugin: Plugin did not export a function');
			return;
		}

		// Call the plugin init function
		try {
			// Call the plugin init function
			var plugin = pluginInit(wombat);

			// Cache it
			wombat.plugins[pluginName] = plugin;
		} catch(err) {
			wombat.logger.log('error', 'Error initalizing plugin', err);
		}

		// Return 
		return plugin;

	};

};
