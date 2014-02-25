module.exports = function(wombat) {

	// Constructor
	var Service = function(name) {
		this.serviceName = name;
	};

	// Start a service
	Service.prototype.start = function(done) {
		wombat.exec('service ' + this.serviceName + ' start', done);
	};

	// Stop a service
	Service.prototype.stop = function(done) {
		wombat.exec('service ' + this.serviceName + ' stop', done);
	};

	// Restart a service
	Service.prototype.restart = function(done) {
		wombat.exec('service ' + this.serviceName + ' restart', done);
	};

	// Decorate wombat
	wombat.Service = Service;
};
