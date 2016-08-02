'use strict';

var gulp = require('gulp');
var browserOpen = require('gulp-open');
var istanbul = require('gulp-istanbul');
var mocha = require('gulp-mocha');
var nsp = require('gulp-nsp');

var gulpConfig = require('./../gulp-config');
var istanbulConfig = require('./../istanbul-config');
var mochaConfig = require('./../mocha-config');

gulp.task('check-security', function(cb) {
    nsp({package: gulpConfig.packageJSON}, cb);
});

gulp.task('run-unit-tests', function(cb) {
    gulp.src(gulpConfig.srcJavascript)
        .pipe(istanbul({
            includeUntested: istanbulConfig.includeUntested
        }))
        .pipe(istanbul.hookRequire())
        .on('finish', function() {
            gulp.src(gulpConfig.javascriptUnitTests)
                .pipe(mocha({
                    ui: 'bdd',
                    timeout: mochaConfig.unitTestTimeout,
                    reporter: mochaConfig.unitTestReporter,
                    reporterOptions: mochaConfig.unitTestReporterOptions
                }))
                .pipe(istanbul.writeReports({
                    reporters: istanbulConfig.reporters,
                    dir: istanbulConfig.unitTestCoverageDirectory
                }))
                .on('end', cb);
        });
});

gulp.task('show-unittest-coverage-report', ['run-unit-tests'], function() {
    return gulp.src(istanbulConfig.unitTestCoverageReportHtmlFile)
        .pipe(browserOpen());
});