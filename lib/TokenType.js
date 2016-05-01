// TokenType.js
// TokenType Class
"use strict";

/*** example of how to define a token type: ***/
/*
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

new TokenType("comment", isCommentValid, isCommentComplete);
*/

////////////////////////////////////////////////////////////////////////////////
// TokenType
////////////////////////////////////////////////////////////////////////////////

var TokenType = function (name, validationFunction, completetionFunction) {
    // validationFunction returns true if the string could make the desired token
    //      example: the string "/* this is a comment" would be true despite not being complete
    // completetionFunction: returns true if the string makes a complete token
    this.type = name;
    this.isValid = validationFunction;
    this.isComplete = completetionFunction;
};

exports.TokenType = TokenType;
