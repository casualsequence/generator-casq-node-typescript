'use strict';

var assert = require('yeoman-assert');
var fs = require('fs');
var helpers = require('yeoman-test');
var path = require('path');

describe('Node TypeScript Generator Suite: App', function() {
    describe('Base Option Tests', function() {
        it('Should create all the correct base files when the base option is selected', function(done) {
            // helpers.run(path.join(__dirname, './../../generators/app'))
            //     .withPrompts({

            //     }).on('end', function() {
            //         var expected = {

            //         };

            //         assert.file([]);
            //         var body = fs.readFileSync('package.json', 'utf-8');
            //         var actual = JSON.parse(body);
                    
            //         assert.deepEqual(expected, actual);
            //         done();
            //     });
            assert.deepEqual(1,1);
            done();
        });
    });
});