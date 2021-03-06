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

gulp.task('transpile', ['clean'], function() {
    var tsResult = gulp.src(gulpConfig.allTypescript, { base: '.'})
        .pipe(sourceMaps.init())
        .pipe(tsc(gulpConfig.typescriptCompilerOptions))
        .on('error', function(err) {
            throw new Error('TypeScript transpilation error: ' + err);
        });

    return tsResult.js
        .pipe(sourceMaps.write('.'))
        .pipe(gulp.dest(''));
});
