'use strict';

var assert = require('yeoman-assert');
// var fs = require('fs');
var helpers = require('yeoman-test');
var path = require('path');

var inputConfig = require('./../../../generators/app/input-config');

var boilerplateFiles = [
    '.eslintignore',
    '.gitignore',
    '.jshintignore',
    '.jshintrc',
    '.eslintrc.js',
    'gulpfile.js',
    'package.json',
    'README.md',
    'tsconfig.json',
    'tslint.json',
    'typings.json',
    './build/gulp-config.js',
    './build/istanbul-config.js',
    './build/mocha-config.js',
    './build/tasks/build.js',
    './build/tasks/build.js',
    './build/tasks/clean.js',
    './build/tasks/lint.js',
    './build/tasks/test.js'
];

suite('Node TypeScript Generator Suite: App', function() {
    suite('Core Functionality Tests', function() {
        test('Should create and scaffold into a new directory if the specified app name differs from the current directory', function() {

        });

        test('Should scaffold into the current directory when the specified app name matches the current directory name', function() {

        });
    });

    suite('Base Option Tests', function() {
        setup(function() {
            return helpers.run(path.join(__dirname, './../../../generators/app'))
                .withPrompts({
                    appName: 'test',
                    description: 'my test',
                    type: inputConfig.basePromptValue,                        
                })
                .toPromise();
        });

        test('Should create all the correct boilerplate files when the Base option is selected', function() {
            assert.file(boilerplateFiles);
        });
    });

    suite('CLI Option Tests', function() {
        setup(function() {
            return helpers.run(path.join(__dirname, './../../../generators/app'))
                .withPrompts({
                    appName: 'test',
                    description: 'my test',
                    type: inputConfig.cliPromptValue,                        
                })
                .toPromise();
        });

        test('Should create all the correct boilerplate files when the CLI option is selected', function() {
            assert.file(boilerplateFiles);
        });
    });

    suite('Express API Option Tests', function() {
        setup(function() {
            return helpers.run(path.join(__dirname, './../../../generators/app'))
                .withPrompts({
                    appName: 'test',
                    description: 'my test',
                    type: inputConfig.expressApiPromptValue,                        
                })
                .toPromise();
        });

        test('Should create all the correct boilerplate files when the Express API option is selected', function() {
            assert.file(boilerplateFiles);
        });
    });

    suite('VSTS Task Option Tests', function() {
        setup(function() {
            return helpers.run(path.join(__dirname, './../../../generators/app'))
                .withPrompts({
                    appName: 'test',
                    description: 'my test',
                    type: inputConfig.vstsTaskPromptValue,                        
                })
                .toPromise();
        });

        test('Should create all the correct boilerplate files when the VSTS option is selected', function() {
            assert.file(boilerplateFiles);
        });
    });
});