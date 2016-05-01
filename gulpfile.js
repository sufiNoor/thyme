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

gulp.task('generateSyntaxExample', function () {
    var readFileSync = require('fs').readFileSync;
    var wrapperHead = readFileSync('./test/example/wrapperHead.html', 'utf8');
    var wrapperFoot = readFileSync('./test/example/wrapperFoot.html', 'utf8');
    var inputFile = './test/example/example.thyme';
    var source = readFileSync(inputFile, 'utf8');
    var tokenTypes = require('./lib/thymeTokens').tokens;
    var Lexer = require('./lib/Lexer').Lexer;
    var lexer = new Lexer(inputFile, source, tokenTypes);
    var token = lexer.next();
    var output = "";
    while (token) {
        output += token.toHTML();
        token = lexer.next();
    }
    var writeFileSync = require('fs').writeFileSync;
    var completeFile = wrapperHead + output + wrapperFoot;
    var outputFile = './test/example/syntaxHighlight.html';
    writeFileSync(outputFile, completeFile);
});
