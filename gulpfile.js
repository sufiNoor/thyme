var gulp = require('gulp');

gulp.task('test', function () {
    require('./test/test').runTests();
});

gulp.task('watch', ['test'], function () {
    var watcher = gulp.watch('lib/*.*', ['test']);
    watcher.on('change', function(event) {
        console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
    });
});

gulp.task('travis', function () {
    var pass = require('./test/test').runTests();
    if (!pass) {
        throw "Tests failed!";
    }
});

gulp.task('default', ['watch']);
