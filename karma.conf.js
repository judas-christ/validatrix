// Karma configuration
// Generated on Sun Nov 30 2014 16:30:47 GMT+0100 (W. Europe Standard Time)

module.exports = function(config) {
  config.set({
    frameworks: ['mocha', 'chai'],
    files: [
        'test/util/dom.js',
        'dist/validatrix.js',
        'test/**/*.spec.js'
    ],
    reporters: ['progress'],
    port: 9876,
    colors: true,
    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,
    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ['Chrome', /*'Firefox',*/ 'IE'],
});
};
