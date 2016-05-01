var gulp = require('gulp');

gulp.task('default', function () {
    // default gulp task
});

gulp.task('test', function () {
    // run tests
    var testScript = require('./test/test').runTests;
    testScript();
});

gulp.task('watch', ['test'], function () {
    var watcher = gulp.watch('lib/*.*', ['test']);
    watcher.on('change', function(event) {
        console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
    });
});
