// testScanner.js
// tests for Character and Scanner
"use strict";

// Also uses character but not required to import
//var Character = require("../lib/Character.js").Character;
var Scanner = require("../lib/Scanner.js").Scanner;

var scanString = function (filename, string) {
    var errors = [];
    var scanner = new Scanner(filename, string);
    var line = 1;
    var col = 1;
    var character = null;
    for (var i = 0; i < string.length; i++) {
        var isError = false;
        var info = "";
        info += "{ string: " + string;
        info += ", index: " + i;
        info += ", line: " + line;
        info += ", col: " + col;
        info += " }";
        character = scanner.next();
        var message = "";
        var messageHeader = "Character/Scanner: ";
        if (character.filename !== filename) {
            message = messageHeader + "filename error" + info;
            errors.push(new Error(message));
            isError = true;
        }
        if (character.index !== i) {
            message = messageHeader + "index error" + info;
            errors.push(new Error(message));
            isError = true;
        }
        if (character.line !== line) {
            message = messageHeader + "line error" + info;
            errors.push(new Error(message));
            isError = true;
        }
        if (character.col !== col) {
            message = messageHeader + "col error" + info;
            errors.push(new Error(message));
            isError = true;
        }
        if (character.value !== string[i]) {
            message = messageHeader + "value error" + info;
            errors.push(new Error(message));
            isError = true;
        }
        if (string[i] === "\n") {
            line++;
            col = 1;
        } else {
            col++;
        }
        if (isError) { break; }
    }
    return errors;
};

var run = function () {
    try {
        var errors = [];
        var filename = "foo";
        errors = errors.concat(scanString(filename, "gibberish\\\\\t\n\n\n''''\'\"\n\"more text"));
        return errors;
    } catch (error) {
        return [error];
    }
};

exports.testScanner = run;
