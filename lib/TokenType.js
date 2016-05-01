// TokenType.js
// TokenType Class
"use strict";

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

/* example
var isCommentValid = function (string) {
    if (string.length >= 1 && string[0] !== '/') {
        return false;
    };
    if (string.length >= 2 && string[1] !== '/') {
        return false;
    };
    if (string.indexOf('\n') >= 0) {
        return false;
    };
    return true;
};

var isCommentComplete = function (string) {
    return string.length >= 2 && isCommentComplete(string);
};

new TokenType("comment", isCommentValid, isCommentComplete);
*/

exports.TokenType = TokenType;
