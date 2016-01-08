var assert = require("assert");
var fs = require('fs');

describe('Logger Test', function() {

    var files = fs.readdirSync(__dirname);
    for (var i in files){
        var name = __dirname + '/' + files[i];
        if (!fs.statSync(name).isDirectory()){
        	if (name.indexOf('.html') > 0){
				var tempFile = fs.openSync(name, 'r');
				fs.closeSync(tempFile);
				fs.unlinkSync(name);
        	}
        	
        }
    }
    var debugMode = null;
	var normalMode = null;
	var noneMode = null;
	var dateName = null;

	test('Create loggers for each mode with name', function(done) {

		debugMode = new require('../index')('debug',__dirname,'debug-mode.html');
		normalMode = new require('../index')('normal',__dirname,'normal-mode.html');
		noneMode = new require('../index')('none',__dirname,'none-mode.html');	
		done();

	});

	test('Create logger with default dateName', function(done) {

		dateName = new require('../index')('none',__dirname);
		
		done();

	});

	test('Write messages on each logger', function(done) {

		debugMode.log('debugMode.log message');
		debugMode.warning('debugMode.warning message');
		debugMode.success('debugMode.success message');
		debugMode.error('debugMode.error message');
		debugMode.important('debugMode.important message');

		normalMode.log('normalMode.log message');
		normalMode.warning('normalMode.warning message');
		normalMode.success('normalMode.success message');
		normalMode.error('normalMode.error message');
		normalMode.important('normalMode.important message');

		noneMode.log('noneMode.log message');
		noneMode.warning('noneMode.warning message');
		noneMode.success('noneMode.success message');
		noneMode.error('noneMode.error message');
		noneMode.important('noneMode.important message');

		dateName.log('dateName.log message');
		dateName.warning('dateName.warning message');
		dateName.success('dateName.success message');
		dateName.error('dateName.error message');
		dateName.important('dateName.important message');

		done();

	});

	test('Closing all loggers', function(done) {

		debugMode.close();
		normalMode.close();
		noneMode.close();
		dateName.close();
		
		done();

	});

});
