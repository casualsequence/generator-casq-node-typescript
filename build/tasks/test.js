'use strict';

var gulp = require('gulp');
var browserOpen = require('gulp-open');
var istanbul = require('gulp-istanbul');
var mocha = require('gulp-mocha');
var nsp = require('gulp-nsp');
var gulpConfig = require('./../gulp-config');


gulp.task('check-security', function(cb) {
	nsp({package: gulpConfig.packageJSON}, cb);
});

gulp.task('run-unit-tests', function(cb) {

});

gulp.task('show-coverage-report', ['run-unit-tests'], function() {

});
