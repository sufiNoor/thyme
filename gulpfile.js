var gulp = require('gulp');
var jshint = require('gulp-jshint');

gulp.task('jshint', function() {
    return gulp.src(['./gulpfile.js', './test/*.js', './lib/*.js'])
    .pipe(jshint({ 'node': true, 'strict': true }))
    .pipe(jshint.reporter('jshint-stylish'));
});

gulp.task('test', ['jshint'], function () {
    require('./test/test').runTests();
});

gulp.task('watch', ['test'], function () {
    var watcher = gulp.watch(['./gulpfile.js', './test/*', './lib/*'], ['test']);
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
