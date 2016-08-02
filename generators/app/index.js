'use strict';

var chalk = require('chalk');
var glob = require('glob');
var path = require('path');
var yeoman = require('yeoman-generator');
var yosay = require('yosay');

var basePromptValue = 'base';
var cliPromptValue = 'cli';
var expressApiPromptValue = 'express-api';
var vstsTaskPromptValue = 'vsts-task';

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
                        value: expressApiChoice
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

    writing: function() {

    },

    _writingBase: function() {

    },

    _writingCli: function() {

    },

    _writingExpress: function() {

    },

    _writingVSTSTask: function() {

    },

    install: function() {
        this.npmInstall();
    }
});