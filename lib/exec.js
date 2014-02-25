// Requirements
var childProcess = require('child_process'),
	async = require('async');

module.exports = function(wombat) {

	// Public interface
	var wExec = function(command, done) {

		// Collect the output
		var io = {
			out: '',
			err: '',
			all: ''
		};

		// Only call done once
		var doneCalled = false;
		var finalDone = function(err) {
			if (!doneCalled) {
				doneCalled = true;
				done(err, io.out, io.err, io.all);
			}
		};

		// Log the command
		wombat.logger.log('verbose', 'exec: %s', command);

		// Exec the command
		var child = childProcess.exec(command);

		// Capture errors
		child.on('error', function(err) {
			wombat.logger.log('error', 'exec error', err);
			finalDone(err);
		});

		// Capture stdout
		child.stdout.on('data', function(d) {
			io.out += d;
			io.all += d;
		});

		// Capture stderr
		child.stderr.on('data', function(d) {
			io.err += d;
			io.all += d;
		});

		// Listen for done
		child.on('exit', function(code) {
			wombat.logger.log('verbose', '"' + command + '" output:\n' + io.all.trim());
			// Exit on error
			if (code != 0) {
				return finalDone(code);
			}

			// Success...finish
			finalDone();
		});

		return child;

	};

	wExec.series = function(commands, done) {

		// Collect the output
		var io = {
			out: '',
			err: ''
		};

		// Only call done once
		var doneCalled = false;
		var finalDone = function(err) {
			if (!doneCalled) {
				doneCalled = true;
				done(err, io.out, io.err);
			}
		};

		// Run each in order
		async.eachSeries(commands, function(command, cmdDone) {
			wExec(command, function(err, stdout, stderr) {
				io.out += stdout;
				io.err += stderr;
				if (err) {
					return finalDone(err);
				}
				cmdDone();
			});
		}, function() {
			finalDone();
		});

	};

	wExec.file = function(file, args, done) {

		// Collect the output
		var io = {
			out: '',
			err: ''
		};

		// Only call done once
		var doneCalled = false;
		var finalDone = function(err) {
			if (!doneCalled) {
				doneCalled = true;
				done(err, io.out, io.err);
			}
		};

		// Log the command
		wombat.logger.log('verbose', 'exec file: %s %s', file, args.join(' '));

		// Exec the command
		var child = childProcess.execFile(file, args);

		// Capture errors
		child.on('error', function(err) {
			wombat.logger.log('error', 'exec file error', err);
			finalDone(err);
		});

		// Capture stdout
		child.stdout.on('data', function(d) {
			wombat.logger.log('verbose', d);
			io.out += d;
		});

		// Capture stderr
		child.stderr.on('data', function(d) {
			wombat.logger.log('verbose', d);
			io.err += d;
		});

		// Listen for done
		child.on('exit', function(code) {
			// Exit on error
			if (code != 0) {
				return finalDone(code);
			}

			// Success...finish
			finalDone();
		});

		return child;

	};

	// Decoreate wombat
	wombat.exec = wExec;
};
