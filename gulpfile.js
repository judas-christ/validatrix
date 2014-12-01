var pkg = require('./package.json');
var gulp = require('gulp');
var plugins = require('gulp-load-plugins')();
var del = require('del');
var karma = require('karma').server;
var path = require('path');

var banner = '/*! <%= pkg.name %> - v<%= pkg.version %> */\n'

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
});

gulp.task('clean', function(cb) {
    del('dist', cb);
})

gulp.task('test', function(cb) {
    karma.start({
        configFile: path.join(__dirname, 'karma.conf.js'),
        singleRun: true
    }, cb);
});

gulp.task('default', ['jshint', 'dev', 'prod']);
