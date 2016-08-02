'use strict';

var gulp = require('gulp');
var gulpTypings = require('gulp-typings');
var sourceMaps = require ('gulp-sourcemaps');
var tsc = require('gulp-typescript');
var gulpConfig = require('./../gulp-config');

gulp.task('install-typings', function() {
    return gulp.src('./typings.json')
        .pipe(gulpTypings());
});
