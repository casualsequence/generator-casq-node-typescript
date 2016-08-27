'use strict';

var chalk = require('chalk');
var extend = require('deep-extend');
var glob = require('glob');
var path = require('path');
var mkdirp = require('mkdirp');
var yeoman = require('yeoman-generator');
var yosay = require('yosay');

var basePromptValue = 'base';
var cliPromptValue = 'cli';
var expressApiPromptValue = 'express-api';
var vstsTaskPromptValue = 'vsts-task';

var templateRoot = path.join(__dirname, 'templates');
var baseRoot = path.join(templateRoot, 'base');

module.exports = yeoman.Base.extend({
    initializing: function() {
        this.log(yosay('Welcome to the Casual Sequence Node TypeScript Generator!'));
    },

    prompting: function() {
        var prompts = [
            {
                type: 'input',
                name: 'appName',
                message: 'The name of your app',
                required: true,
            },
            {
                type: 'list',
                name: 'type',
                message: 'What type of app is this?',
                choices: [
                    {
                        name: 'New App with just the Base Items',
                        value: basePromptValue
                    },
                    {
                        name: 'New CLI App',
                        value: cliPromptValue
                    },
                    {
                        name: 'New API App with Express and Docker',
                        value: expressApiPromptValue
                    },
                    {
                        name: 'New VSTS Task',
                        value: vstsTaskPromptValue
                    }
                ]
            }
        ];

        return this.prompt(prompts).then(function(extensionConfig) {
            this.extensionConfig = extensionConfig;
        }.bind(this));
    },

    default: function() {
        var appName = this.extensionConfig.appName;
        if (path.basename(this.destinationPath()) !== appName) {
            this.log('Your generator must be inside a directory with the same name as your extension name \'' + appName + '\'\n' + 
            'I\'ll automatically create this directory for you.');

            mkdirp(appName);
            this.destinationRoot(this.destinationPath(appName));            
        }
    },

    writing: function() {
        this._writingBase();
        this.log('finished base copy');
        this.sourceRoot = path.join(templateRoot, this.extensionConfig.type);

        switch (this.extensionConfig.type) {
            case basePromptValue:
                this.log(yosay('Created just the basics.'));
                break;

            case cliPromptValue:
                this._writingCli();
                break;

            case expressApiPromptValue:
                this._writingCli();
                break;

            case vstsTaskPromptValue:
                this._writingCli();
                break;

        }
    },

    _writingBase: function() {
        this.sourceRoot(baseRoot);
        // var pkg = this.fs.readJSON(this.sourceRoot('package.json'), {});
        // extend(pkg, {
        //     name: '<%- JSON.stringify(name) %>'
        // });

        // this.fs.writeJSON(this.sourceRoot('package.json'));

        var context = this.extensionConfig;
        context.dot = true;
        this.fs.copyTpl(glob.sync(this.sourceRoot() + '/**/*', { dot: true }), this.destinationRoot(), context);
    },

    _writingCli: function() {
        this.log(yosay('New CLI coming'));
    },

    _writingExpress: function() {
        this.log(yosay('Super API underway'));
    },

    _writingVSTSTask: function() {
        this.log(yosay('A new task to make a great platform even better'));
    },

    install: function() {
        this.npmInstall();
    }
});