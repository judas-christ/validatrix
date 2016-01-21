var pkg = require('./package.json');
var gulp = require('gulp');
var plugins = require('gulp-load-plugins')();
var rimraf = require('rimraf');
var Server = require('karma').Server;
var path = require('path');

var banner = '/*! <%= pkg.name %> - v<%= pkg.version %> */\n';

gulp.task('dev', ['jshint'], function() {
    return plugins.requirejs({
        baseUrl: 'src',
        out: 'validatrix.dev.js',
        name: '../build/development',
        pragmasOnSave: {
            exclude: true,
            development: true
        },
        findNestedDependencies: true,
        skipModuleInsertion: true,
        wrap: {
            start: "(function(window, undefined){",
            end: "})(this);"
        }
    })
    .pipe(plugins.header(banner, { pkg: pkg }))
    .pipe(gulp.dest('dist'));
});

gulp.task('prod', ['jshint'], function() {
    return plugins.requirejs({
        baseUrl: 'src',
        out: 'validatrix.js',
        name: '../build/production',
        pragmasOnSave: {
            exclude: true,
            development: false
        },
        findNestedDependencies: true,
        skipModuleInsertion: true,
        wrap: {
            start: "(function(window, undefined){",
            end: "})(this);"
        }
    })
    .pipe(plugins.header(banner, { pkg: pkg }))
    .pipe(gulp.dest('dist'))
    .pipe(plugins.rename('validatrix.min.js'))
    .pipe(plugins.uglify({ preserveComments: 'some' }))
    .pipe(gulp.dest('dist'));
});

gulp.task('jshint', ['clean'], function() {
    return gulp.src('src/**/*.js')
        .pipe(plugins.jshint())
        .pipe(plugins.jshint.reporter('default'));
});

gulp.task('clean', function(cb) {
    rimraf('dist', cb);
});

gulp.task('test', function(cb) {
    new Server({
        configFile: path.join(__dirname, 'karma.conf.js'),
        singleRun: true
    }, cb).start();
});

gulp.task('default', ['dev', 'prod'], function() {
    gulp.watch('src/**/*.js', ['dev', 'prod']);
    gulp.watch('test/**/*.spec.js', ['test']);
});
