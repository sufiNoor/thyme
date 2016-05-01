var gulp = require('gulp');
var fs = require('fs');
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

gulp.task('debugScanner', function () {
    var inputFile = './test/example/example.thyme';
    var source = fs.readFileSync(inputFile, 'utf8');
    var Scanner = reload('./lib/Scanner').Scanner;
    var scanner = new Scanner(inputFile, source);
    var character = scanner.next();
    while (character) {
        console.log(character.toString());
        character = scanner.next();
    }
});

gulp.task('scanner', ['debugScanner'], function () {
    var watcher = gulp.watch(['./test/*.*', './lib/*.*'], ['debugScanner']);
    watcher.on('change', function(event) {
        console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
    });
});

gulp.task('debugLexer', function () {
    var inputFile = './test/example/example.thyme';
    var source = fs.readFileSync(inputFile, 'utf8');
    var tokenTypes = reload('./lib/thymeTokens').tokens;
    var Lexer = reload('./lib/Lexer').Lexer;
    var lexer = new Lexer(inputFile, source, tokenTypes);
    var token = lexer.next();
    while (token) {
        console.log(token.toString());
        token = lexer.next();
    }
});

gulp.task('lexer', ['debugLexer'], function () {
    var watcher = gulp.watch(['./test/*.*', './lib/*.*'], ['debugLexer']);
    watcher.on('change', function(event) {
        console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
    });
});

gulp.task('debugParser', function () {
    var inputFile = './test/example/example.thyme';
    var source = fs.readFileSync(inputFile, 'utf8');
    var tokenTypes = reload('./lib/thymeTokens').tokens;
    var Parser = reload('./lib/Parser').Parser;
    var parser = new Parser({ indentMode: true }, inputFile, source, tokenTypes);
    var parseTree = parser.parse();
    console.log(parseTree.toString());
});

gulp.task('parser', ['debugParser'], function () {
    var watcher = gulp.watch(['./test/*.*', './lib/*.*'], ['debugParser']);
    watcher.on('change', function(event) {
        console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
    });
});

gulp.task('generateSyntaxExample', function () {
    var wrapperHead = fs.readFileSync('./test/example/wrapperHead.html', 'utf8');
    var wrapperFoot = fs.readFileSync('./test/example/wrapperFoot.html', 'utf8');
    var inputFile = './test/example/example.thyme';
    var source = fs.readFileSync(inputFile, 'utf8');
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
    fs.writeFileSync(outputFile, completeFile);
});
