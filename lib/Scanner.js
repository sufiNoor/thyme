// Scanner.js
// Scanner Class

////////////////////////////////////////////////////////////////////////////////
// Imports
////////////////////////////////////////////////////////////////////////////////

var Character = require("./Character.js").Character;

////////////////////////////////////////////////////////////////////////////////
// Scanner
////////////////////////////////////////////////////////////////////////////////

var Scanner = function (filename, source) {
    this.filename = filename;
    this.source = source;
    this.index = 0;
    // finding the start index of all lines
    this.lineIndexes = [-1];
    for (var i = 0; i < this.source.length; i++) {
        if(this.source[i] === '\n') {
            this.lineIndexes.push(i);
        }
    }
};

Scanner.prototype.isDone = function () {
    return this.index >= this.source.length;
};

Scanner.prototype.findIndexes = function (index) {
    // returns the line and col index based upon the specified index
    if (index < 0 || index >= this.source.length) { return undefined; }
    var lineIndex = 0;
    while (lineIndex < this.lineIndexes.length && index > this.lineIndexes[lineIndex]) {
        lineIndex++;
    }
    var colIndex = index - this.lineIndexes[lineIndex-1];
    return { line: lineIndex, col: colIndex };
};

Scanner.prototype.findCharacter = function (indexDifference) {
    // finds the character at the postion (this.index + indexDifference)
    // default indexDifference is zero
    // returns undefined if index is out of range
    if (!indexDifference) { indexDifference = 0; }
    var findIndex = this.index + indexDifference;
    if (findIndex < 0 || findIndex >= this.source.length) {
        return undefined;
    } else {
        var position = this.findIndexes(findIndex);
        return new Character(this.filename, this.index, position.line, position.col, this.source[findIndex]);
    }
};

Scanner.prototype.increment = function (increment) {
    // increments the index by increment, default value is 1
    if (increment === undefined) { increment = 1; }
    this.index += increment;
};

Scanner.prototype.next = function () {
    // returns the current character and increments the index by 1
    var char = this.findCharacter();
    if (char) { this.increment(); }
    return char;
};

exports.Scanner = Scanner;
