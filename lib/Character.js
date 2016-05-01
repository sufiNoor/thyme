// Character.js
// Character Class
"use strict";

////////////////////////////////////////////////////////////////////////////////
// Character
////////////////////////////////////////////////////////////////////////////////

var Character = function (filename, index, line, col, value) {
    this.filename = filename;
    this.index = index;
    this.line = line;
    this.col = col;
    this.value = value;
};

Character.prototype.toString = function () {
    var string = this.filename;
    string += ":" + this.index.toString();
    string += " " + this.line.toString() + ":" + this.col.toString();
    var val = "";
    if (this.value === '\n') {
        val = 'NEWLINE';
    } else {
        val = this.value;
    }
    string += " " + val;
    return string;
};

exports.Character = Character;
