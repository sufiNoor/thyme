var gulp = require('gulp');

gulp.task('test', function () {
    // run tests
    console.log("Starting tests...");
    var testScript = require('./test/test').runTests;
    var pass = testScript();
    if (!pass) { console.log("Tests failed!"); }
    else { console.log("Tests passed!"); }
});

gulp.task('watch', ['test'], function () {
    var watcher = gulp.watch('lib/*.*', ['test']);
    watcher.on('change', function(event) {
        console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
    });
});

/*
gulp.task('travis', ['test'], function () {
    if (true) { throw "error"; };
});
*/

gulp.task('default', ['watch']);
