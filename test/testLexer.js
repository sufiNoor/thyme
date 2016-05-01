// testLexer.js
// tests for Token and Lexer
"use strict";

var reload = require('require-reload')(require);
var TokenType = reload("../lib/TokenType.js").TokenType;
var Lexer = reload("../lib/Lexer.js").Lexer;

var createTokenTypes = function () {
    // creates test tokens
    var tokens = [];

    /*** COMMENT TOKEN ***/
    var isCommentValid = function (string) {
        // token must start with "//" and not contain "\n"
        if (!string || string === "/") { return true; }
        return string.indexOf("//") === 0 && string.indexOf('\n') < 0;
    };
    var isCommentComplete = function (string) {
        // token must start with "//" and not contain "\n"
        // minimum length is 2
        return string.length >= 2 && isCommentValid(string);
    };
    tokens.push(new TokenType("comment", isCommentValid, isCommentComplete));

    /*** NEWLINE TOKEN ***/
    var isNewLineValid = function (string) {
        return !string || string === '\n';
    };
    var isNewLineComplete = function (string) {
        return string === '\n';
    };
    tokens.push(new TokenType("newline", isNewLineValid, isNewLineComplete));

    /*** WHITESPACE TOKEN ***/
    var isWhitespaceValid = function (string) {
        var isValid = true;
        for (var i = 0; i < string.length; i++) {
            if (string[i] !== "\t" && string[i] !== " ") { isValid = false; }
        }
        return isValid;
    };
    var isWhitespaceComplete = function (string) {
        return string.length > 0 && isWhitespaceValid(string);
    };
    tokens.push(new TokenType("whitespace", isWhitespaceValid, isWhitespaceComplete));

    /*** WORD TOKEN ***/
    var isWordValid = function (string) {
        var isValid = true;
        for (var i = 0; i < string.length; i++) {
            var isLowerCase = (string.charCodeAt(i) >= 97 && string.charCodeAt(i) <= 122);
            var isUpperCase = (string.charCodeAt(i) >= 65 && string.charCodeAt(i) <= 90);
            if (!(isLowerCase || isUpperCase)) { isValid = false; }
        }
        return isValid;
    };
    var isWordComplete = function (string) {
        return string.length > 0 && isWordValid(string);
    };
    tokens.push(new TokenType("word", isWordValid, isWordComplete));

    /*** ERROR TOKEN ***/
    var isErrorValid = function (string) {
        return string.length <= 1;
    };
    var isErrorComplete = function (string) {
        return string.length == 1;
    };
    tokens.push(new TokenType("error", isErrorValid, isErrorComplete));

    return tokens;
};

var test = function () {
    var errors = [];
    var filename = "foo";
    var tokenList = [
        { "type": "comment", "value": "//comment" },
        { "type": "newline", "value": "\n" },
        { "type": "word", "value": "hello" },
        { "type": "whitespace", "value": " " },
        { "type": "word", "value": "world" },
        { "type": "newline", "value": "\n" }
    ];
    var source = "";
    for (var i = 0; i < tokenList.length; i++) {
        source += tokenList[i].value;
    }
    var lexer = new Lexer(filename, source, createTokenTypes());
    for (var j = 0; j < tokenList.length; j++) {
        var token = lexer.next();
        var message = "";
        if (token.type !== tokenList[j].type) {
            message = "Token/Lexer Error: " + "{ type: " + tokenList[j].type + ", value: " + tokenList[j].value + " }\n";
            message += "    types not equal";
            errors.push(new Error(message));
        }
        if (token.getValue() !== tokenList[j].value) {
            message = "Token/Lexer Error: " + "{ type: " + tokenList[j].type + ", value: " + tokenList[j].value + " }\n";
            message += "    values not equal";
            errors.push(new Error(message));
        }
    }
    if (lexer.next() !== undefined) {
        var message = "Lexer Error: Lexer did not finished tokenizing source";
        errors.push(new Error(message));
    }
    return errors;
};

var run = function () {
    try {
        var errors = [];
        var filename = "foo";
        errors = errors.concat(test());
        return errors;
    } catch (error) {
        return [error];
    }
};

exports.testLexer = run;
