'use strict';
/* jshint maxstatements:false */

var assert = require('yeoman-assert');
var helpers = require('yeoman-test');
var yeoman = require('yeoman-generator');
var path = require('path');
var sinon = require('sinon');

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
    var sandbox;
    setup(function() {
        sandbox = sinon.sandbox.create();
    });
    teardown(function() {
        sandbox.restore();
    });

    suite('Base Option Tests', function() {
        var baseAppName = 'baseOptionApp';
        var appType = inputConfig.basePromptValue;
        var appDescription = 'this is a test description';

        suiteSetup(function() {
            return helpers.run(path.join(__dirname, './../../../generators/app'))
                .withPrompts({
                    appName: baseAppName,
                    description: appDescription,
                    type: appType,                        
                })
                .toPromise();
        });

        test('Should create all the correct boilerplate files when the Base option is selected', function() {
            assert.file(boilerplateFiles);
        });

        test('Should inject the App Name into the README.md file when the Base option is selected', function() {
            assert.fileContent('README.md', '# ' + baseAppName);
        });

        test('Should create and scaffold into a new directory if the specified app name differs from the current directory with the Base option', function(done) {
            helpers.run(path.join(__dirname, './../../../generators/app'))
                .withPrompts({
                    appName: baseAppName,
                    description: 'my test',
                    type: inputConfig.basePromptValue,                        
                })
                .toPromise()             
                .then(function(dir) {
                    assert.equal(path.basename(process.cwd()), baseAppName);
                    assert.equal(path.resolve(process.cwd()), path.join(dir, baseAppName));
                    done();
                });
        });

        test('Should scaffold into the current directory when the specified app name matches the current directory name with the Base option', function(done) {
            sandbox.stub(yeoman.Base.prototype, 'destinationPath', function() {
                return path.join(process.cwd(), baseAppName);
            });

            helpers.run(path.join(__dirname, './../../../generators/app'))
                .withPrompts({
                    appName: baseAppName,
                    description: 'my test',
                    type: inputConfig.basePromptValue,                        
                })
                .toPromise()                
                .then(function(dir) {
                    assert.equal(path.basename(process.cwd()), path.basename(dir));
                    assert.equal(path.resolve(process.cwd()), path.resolve(dir));
                    assert.noFile(path.join(process.cwd(), baseAppName));
                    done();
                });
        });

        test('Should install dependencies if user confirms with the Base option selected', function(done) {
            var npmSpy = sandbox.spy(yeoman.Base.prototype, 'npmInstall');
            var bothSpy = sandbox.spy(yeoman.Base.prototype, 'installDependencies');
            
            helpers.run(path.join(__dirname, './../../../generators/app'))
                .withPrompts({
                    appName: 'name',
                    description: 'my test',
                    type: inputConfig.basePromptValue,
                    installDependencies: true                      
                })
                .toPromise()
                .then(function() {
                    assert.deepEqual(npmSpy.called, true);
                    assert.deepEqual(bothSpy.called, false);
                    done();
                });
        });

        test('Should not install dependencies if user declines with the Base option selected', function(done) {
            var npmSpy = sandbox.spy(yeoman.Base.prototype, 'npmInstall');
            var bothSpy = sandbox.spy(yeoman.Base.prototype, 'installDependencies');
            
            helpers.run(path.join(__dirname, './../../../generators/app'))
                .withPrompts({
                    appName: 'name',
                    description: 'my test',
                    type: inputConfig.basePromptValue,
                    installDependencies: false                      
                })
                .toPromise()
                .then(function() {
                    assert.deepEqual(npmSpy.called, false);
                    assert.deepEqual(bothSpy.called, false);
                    done();
                });
        });
    });

    suite('CLI Option Tests', function() {
        var cliAppName = 'cli app';
        var appType = inputConfig.cliPromptValue;
        var appDescription = 'this is a test description';

        suiteSetup(function() {
            return helpers.run(path.join(__dirname, './../../../generators/app'))
                .withPrompts({
                    appName: cliAppName,
                    description: appDescription,
                    type: appType,                        
                })
                .toPromise();
        });

        test('Should create all the correct boilerplate files when the CLI option is selected', function() {
            assert.file(boilerplateFiles);
        });

        test('Should inject the App Name into the README.md file when the CLI option is selected', function() {
            assert.fileContent('README.md', '# ' + cliAppName);
        });

        test('Should create and scaffold into a new directory if the specified app name differs from the current directory with the CLI option', function(done) {
            helpers.run(path.join(__dirname, './../../../generators/app'))
                .withPrompts({
                    appName: cliAppName,
                    description: 'my test',
                    type: inputConfig.cliPromptValue,                        
                })
                .toPromise()             
                .then(function(dir) {
                    assert.equal(path.basename(process.cwd()), cliAppName);
                    assert.equal(path.resolve(process.cwd()), path.join(dir, cliAppName));
                    done();
                });
        });

        test('Should scaffold into the current directory when the specified app name matches the current directory name with the CLI option', function(done) {
            sandbox.stub(yeoman.Base.prototype, 'destinationPath', function() {
                return path.join(process.cwd(), cliAppName);
            });

            helpers.run(path.join(__dirname, './../../../generators/app'))
                .withPrompts({
                    appName: cliAppName,
                    description: 'my test',
                    type: inputConfig.cliPromptValue,                        
                })
                .toPromise()                
                .then(function(dir) {
                    assert.equal(path.basename(process.cwd()), path.basename(dir));
                    assert.equal(path.resolve(process.cwd()), path.resolve(dir));
                    assert.noFile(path.join(process.cwd(), cliAppName));
                    done();
                });
        });

        test('Should install dependencies if user confirms with the CLI option selected', function(done) {
            var npmSpy = sandbox.spy(yeoman.Base.prototype, 'npmInstall');
            var bothSpy = sandbox.spy(yeoman.Base.prototype, 'installDependencies');
            
            helpers.run(path.join(__dirname, './../../../generators/app'))
                .withPrompts({
                    appName: 'name',
                    description: 'my test',
                    type: inputConfig.cliPromptValue,
                    installDependencies: true                      
                })
                .toPromise()
                .then(function() {
                    assert.deepEqual(npmSpy.called, true);
                    assert.deepEqual(bothSpy.called, false);
                    done();
                });
        });

        test('Should not install dependencies if user declines with the CLI option selected', function(done) {
            var npmSpy = sandbox.spy(yeoman.Base.prototype, 'npmInstall');
            var bothSpy = sandbox.spy(yeoman.Base.prototype, 'installDependencies');
            
            helpers.run(path.join(__dirname, './../../../generators/app'))
                .withPrompts({
                    appName: 'name',
                    description: 'my test',
                    type: inputConfig.cliPromptValue,
                    installDependencies: false                      
                })
                .toPromise()
                .then(function() {
                    assert.deepEqual(npmSpy.called, false);
                    assert.deepEqual(bothSpy.called, false);
                    done();
                });
        });
    });

    suite('Express API Option Tests', function() {
        var expressAppName = 'api app';
        var appType = inputConfig.expressApiPromptValue;
        var appDescription = 'this is a test description';

        suiteSetup(function() {
            return helpers.run(path.join(__dirname, './../../../generators/app'))
                .withPrompts({
                    appName: expressAppName,
                    description: appDescription,
                    type: appType,                        
                })
                .toPromise();
        });

        test('Should create all the correct boilerplate files when the Express API option is selected', function() {
            assert.file(boilerplateFiles);
        });

        test('Should inject the App Name into the README.md file when the Express API option is selected', function() {
            assert.fileContent('README.md', '# ' + expressAppName);
        });

        test('Should create and scaffold into a new directory if the specified app name differs from the current directory with the Express API option', function(done) {
            helpers.run(path.join(__dirname, './../../../generators/app'))
                .withPrompts({
                    appName: expressAppName,
                    description: 'my test',
                    type: inputConfig.expressApiPromptValue,                        
                })
                .toPromise()             
                .then(function(dir) {
                    assert.equal(path.basename(process.cwd()), expressAppName);
                    assert.equal(path.resolve(process.cwd()), path.join(dir, expressAppName));
                    done();
                });
        });

        test('Should scaffold into the current directory when the specified app name matches the current directory name with the Express API option', function(done) {
            sandbox.stub(yeoman.Base.prototype, 'destinationPath', function() {
                return path.join(process.cwd(), expressAppName);
            });

            helpers.run(path.join(__dirname, './../../../generators/app'))
                .withPrompts({
                    appName: expressAppName,
                    description: 'my test',
                    type: inputConfig.expressApiPromptValue,                        
                })
                .toPromise()                
                .then(function(dir) {
                    assert.equal(path.basename(process.cwd()), path.basename(dir));
                    assert.equal(path.resolve(process.cwd()), path.resolve(dir));
                    assert.noFile(path.join(process.cwd(), expressAppName));
                    done();
                });
        });

        test('Should install dependencies if user confirms with the Express API option selected', function(done) {
            var npmSpy = sandbox.spy(yeoman.Base.prototype, 'npmInstall');
            var bothSpy = sandbox.spy(yeoman.Base.prototype, 'installDependencies');
            
            helpers.run(path.join(__dirname, './../../../generators/app'))
                .withPrompts({
                    appName: 'name',
                    description: 'my test',
                    type: inputConfig.expressApiPromptValue,
                    installDependencies: true                      
                })
                .toPromise()
                .then(function() {
                    assert.deepEqual(npmSpy.called, true);
                    assert.deepEqual(bothSpy.called, false);
                    done();
                });
        });

        test('Should not install dependencies if user declines with the Express API option selected', function(done) {
            var npmSpy = sandbox.spy(yeoman.Base.prototype, 'npmInstall');
            var bothSpy = sandbox.spy(yeoman.Base.prototype, 'installDependencies');
            
            helpers.run(path.join(__dirname, './../../../generators/app'))
                .withPrompts({
                    appName: 'name',
                    description: 'my test',
                    type: inputConfig.expressApiPromptValue,
                    installDependencies: false                      
                })
                .toPromise()
                .then(function() {
                    assert.deepEqual(npmSpy.called, false);
                    assert.deepEqual(bothSpy.called, false);
                    done();
                });
        });
    });

    suite('VSTS Task Option Tests', function() {
        var vstsAppName = 'vsts task';
        var appType = inputConfig.vstsTaskPromptValue;
        var appDescription = 'this is a test description';

        suiteSetup(function() {
            return helpers.run(path.join(__dirname, './../../../generators/app'))
                .withPrompts({
                    appName: vstsAppName,
                    description: appDescription,
                    type: appType,                        
                })
                .toPromise();
        });

        test('Should create all the correct boilerplate files when the VSTS option is selected', function() {
            assert.file(boilerplateFiles);
        });

        test('Should inject the App Name into the README.md file when the VSTS option is selected', function() {
            assert.fileContent('README.md', '# ' + vstsAppName);
        });

        test('Should create and scaffold into a new directory if the specified app name differs from the current directory with the VSTS option', function(done) {
            helpers.run(path.join(__dirname, './../../../generators/app'))
                .withPrompts({
                    appName: vstsAppName,
                    description: 'my test',
                    type: inputConfig.vstsTaskPromptValue,                        
                })
                .toPromise()             
                .then(function(dir) {
                    assert.equal(path.basename(process.cwd()), vstsAppName);
                    assert.equal(path.resolve(process.cwd()), path.join(dir, vstsAppName));
                    done();
                });
        });

        test('Should scaffold into the current directory when the specified app name matches the current directory name with the VSTS option', function(done) {
            sandbox.stub(yeoman.Base.prototype, 'destinationPath', function() {
                return path.join(process.cwd(), vstsAppName);
            });

            helpers.run(path.join(__dirname, './../../../generators/app'))
                .withPrompts({
                    appName: vstsAppName,
                    description: 'my test',
                    type: inputConfig.vstsTaskPromptValue,                        
                })
                .toPromise()                
                .then(function(dir) {
                    assert.equal(path.basename(process.cwd()), path.basename(dir));
                    assert.equal(path.resolve(process.cwd()), path.resolve(dir));
                    assert.noFile(path.join(process.cwd(), vstsAppName));
                    done();
                });
        });

        test('Should install dependencies if user confirms with the VSTS option selected', function(done) {
            var npmSpy = sandbox.spy(yeoman.Base.prototype, 'npmInstall');
            var bothSpy = sandbox.spy(yeoman.Base.prototype, 'installDependencies');
            
            helpers.run(path.join(__dirname, './../../../generators/app'))
                .withPrompts({
                    appName: 'name',
                    description: 'my test',
                    type: inputConfig.vstsTaskPromptValue,
                    installDependencies: true                      
                })
                .toPromise()
                .then(function() {
                    assert.deepEqual(npmSpy.called, true);
                    assert.deepEqual(bothSpy.called, false);
                    done();
                });
        });

        test('Should not install dependencies if user declines with the VSTS option selected', function(done) {
            var npmSpy = sandbox.spy(yeoman.Base.prototype, 'npmInstall');
            var bothSpy = sandbox.spy(yeoman.Base.prototype, 'installDependencies');
            
            helpers.run(path.join(__dirname, './../../../generators/app'))
                .withPrompts({
                    appName: 'name',
                    description: 'my test',
                    type: inputConfig.vstsTaskPromptValue,
                    installDependencies: false                      
                })
                .toPromise()
                .then(function() {
                    assert.deepEqual(npmSpy.called, false);
                    assert.deepEqual(bothSpy.called, false);
                    done();
                });
        });
    });
});