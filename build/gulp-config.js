'use strict';

var path = require('path'); 
var srcRoot = './generators';
var testRoot = '/.test';

module.exports = {
	packageJSON: path.resolve('package.json'),
	root: srcRoot,
	allJavascript: [
		'**/*.js',
		'!node_modules/**'
	],
	srcJavascript: [
		srcRoot + '/**/*.js'
	],
	appJavascript: [
		srcRoot + '/**/*.js',
		testRoot + '/**/*-tests.js'
	]
};
