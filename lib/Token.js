// Token.js
// Token Class
"use strict";

////////////////////////////////////////////////////////////////////////////////
// Token
////////////////////////////////////////////////////////////////////////////////

var Token = function () {
    this.type = undefined;
    this.characters = [];
};

Token.prototype.getValue = function () {
    var string = "";
    for (var i = 0; i < this.characters.length; i++) {
        string += this.characters[i].characters;
    }
    return string;
};

Token.prototype.toHTML = function () {
    // returns the token wrapped in a span element with the class of token type
    var string = "<span class=\"" + this.type + "\">";
    string += this.getValue();
    string += "</span>";
    return string;
};

Token.prototype.toString = function () {
    if (this.characters.length === 0) { return "empty token"; }
    var string = this.type;
    string += " " + this.characters[0].file.name;
    string += ":" + this.characters[0].index.toString();
    string += " " + this.characters[0].line.toString() + ":" + this.characters[0].col.toString();
    var val = this.getValue();
    if (val === '\n') { val = "NEWLINE"; }
    string += " " + val;
    return string;
};

Token.prototype.addCharacter = function (character) {
    this.characters.push(character);
};

Token.prototype.setType = function (type) {
    this.type = type;
};

exports.Token = Token;
