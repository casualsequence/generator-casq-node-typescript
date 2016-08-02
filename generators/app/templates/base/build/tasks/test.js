'use strict';

var gulp = require('gulp');
var mocha = require('gulp-mocha');
var istanbul = require('gulp-istanbul');

var gulpConfig = require('./../gulp-config');
var istanbulConfig = require('./../istanbul-config');
var mochaConfig = require('./../mocha-config');

gulp.task('run-unit-tests', function(cb) {
    // gulp.src(gulpConfig.srcJavascript)
    //     .pipe(istanbul({
    //         includeUntested: istanbulConfig.includeUntested
    //     }))
    //     .pipe(istanbul.hookRequire())
    //     .on('finish', function() {
    //         gulp.src(gulpConfig.javascriptUnitTests)
    //             .pipe(mocha({
    //                 timeout: mochaConfig.unitTestTimeout,
    //                 reporter: mochaConfig.reporter,
    //                 reporterOptions: mochaConfig.reporterOptions
    //             }))
    //             .pipe(istanbul.writeReports({
    //                 reporters: istanbulConfig.reporters,
    //                 dir: istanbulConfig.unitTestCoverageDirectory
    //             }))
    //             .on('end', cb);
    //     });
});