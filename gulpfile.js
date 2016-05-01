var gulp = require('gulp');
var reload = require('require-reload')(require);
var jshint = require('gulp-jshint');

gulp.task('jshint', function() {
    return gulp.src(['./gulpfile.js', './test/*.js', './lib/*.js'])
    .pipe(jshint({ 'node': true }))
    .pipe(jshint.reporter('jshint-stylish'));
});

gulp.task('test', ['jshint'], function () {
    var tests = null;
    try {
        tests = reload('./test/test').runTests;
    } catch (e) {
        console.log("could not reload test");
        tests = require('./test/test').runTests;
    }
    tests();
});

gulp.task('watch', ['test'], function () {
    var watcher = gulp.watch(['./gulpfile.js', './test/*.*', './lib/*.*'], ['test']);
    watcher.on('change', function(event) {
        console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
    });
});

gulp.task('travis', ['jshint'], function () {
    var pass = require('./test/test').runTests();
    if (!pass) {
        throw "Tests failed!";
    }
});

gulp.task('default', ['watch']);
