// Karma configuration
// Generated on Sun Jul 23 2017 14:30:47 GMT+0100 (GMT Summer Time)
const buble = require('rollup-plugin-buble');
const commonjs = require('rollup-plugin-commonjs');

module.exports = function(config) {
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '',


    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['jquery-3.2.1', 'jasmine-jquery', 'jasmine', 'requirejs'],

    // list of files / patterns to load in the browser
    files: [
      {pattern: 'app/src/**/*.js', included: false},
      'test-main.js',
      {pattern: 'spec/**/*Spec.js', included: false},
      {pattern: 'spec/javascripts/fixtures/*.html', included: false, served: true}
    ],


    // list of files to exclude
    exclude: [
      'app/src/main.js'
    ],


    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
     'spec/**/*Spec.js': ['rollup']
    },
    rollupPreprocessor: {
      // rollup settings. See Rollup documentation
      plugins: [
        commonjs({
          namedExports: {
            'jquery/lib': ['jquery'],
            'jasmine-jquery': ['jasmine-jquery']
          }
        }),
        buble({jsx: 'h'}) // ES2015 compiler by the same author as Rollup
      ],
      // will help to prevent conflicts between different tests entries
      format: 'iife',
      sourceMap: 'inline'
    },


    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['progress'],


    // web server port
    port: 9876,


    // enable / disable colors in the output (reporters and logs)
    colors: true,


    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,


    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ['Chrome'],


    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: false,

    // Concurrency level
    // how many browser should be started simultaneous
    concurrency: Infinity
  })
}
