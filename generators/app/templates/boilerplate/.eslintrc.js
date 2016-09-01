module.exports = {
    env: {
        browser: false,
        commonjs: true
    },
    extends: 'eslint:recommended',
    rules: {
        indent: [
            'error',
            4,
            {
                "SwitchCase": 1
            }
        ],
        'linebreak-style': [
            'off'
        ],
        quotes: [
            'error',
            'single'
        ],
        semi: [
            'error',
            'always'
        ],
        
    },
    // Custom Globals
    globals: {
        /* MOCHA */
        describe: false,
        it: false,
        before: false,
        beforeEach: false,
        after: false,
        afterEach: false,
        suite: false,
        test: false,
        __dirname: false
    }    
};