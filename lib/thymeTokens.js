// thymeTokens.js
// list of tokens that define the language
"use strict";

////////////////////////////////////////////////////////////////////////////////
// Imports
////////////////////////////////////////////////////////////////////////////////

var ExtraTools = require("./ExtraTools.js");
var TokenHelpers = require("./ExtraTools.js").TokenHelpers;
var TokenType = require("./TokenType.js").TokenType;

////////////////////////////////////////////////////////////////////////////////
// tokens
////////////////////////////////////////////////////////////////////////////////

var Tokens = [];

////////////////////////////////////////////////////////////////////////////////
// SingleLineComment token
////////////////////////////////////////////////////////////////////////////////

var isSingleLineCommentValid = function (string) {
    if (!string || string === "/") { return true; }
    return string.indexOf("//") === 0 && string.indexOf('\n') < 0;
};

var isSingleLineCommentComplete = function (string) {
    return string.length >= 2 && isSingleLineCommentValid(string);
};

Tokens.push(new TokenType("comment", isSingleLineCommentValid, isSingleLineCommentComplete));

////////////////////////////////////////////////////////////////////////////////
// MultiLineComment token
////////////////////////////////////////////////////////////////////////////////

var isMultiLineCommentValid = function (string) {
    if (!string || string === "/") { return true; }
    var condition = string.lenght < 4 || (string.indexOf("*/") < 0 || string.indexOf("*/") === (string.length - 2));
    return string.indexOf("/*") === 0 && condition;
};

var isMultiLineCommentComplete = function (string) {
    return string.length >= 4 && string.indexOf("/*") === 0 && string.indexOf("*/") === (string.length - 2);
};

Tokens.push(new TokenType("comment", isMultiLineCommentValid, isMultiLineCommentComplete));

////////////////////////////////////////////////////////////////////////////////
// NewLine token
////////////////////////////////////////////////////////////////////////////////

var isNewLineValid = function (string) {
    return !string || string === '\n';
};

var isNewLineComplete = function (string) {
    return string === '\n';
};

Tokens.push(new TokenType("newline", isNewLineValid, isNewLineComplete));

////////////////////////////////////////////////////////////////////////////////
// Keyword token
////////////////////////////////////////////////////////////////////////////////

var KEYWORDS = [
    "@template",
    "@print",
    "@doctype",
    "@comment",
    "@import",
    "@type",
    "@if",
    "@elseif",
    "@else",
    "@length",
    "@for",
    "@each",
    "@value",
];

Tokens.push(new TokenType("keyword", TokenHelpers.ValidMatch(KEYWORDS), TokenHelpers.CompleteMatch(KEYWORDS)));

////////////////////////////////////////////////////////////////////////////////
// Value token
////////////////////////////////////////////////////////////////////////////////

var VALUES = [
    "true",
    "false",
    "null"
];

Tokens.push(new TokenType("value", TokenHelpers.ValidMatch(VALUES), TokenHelpers.CompleteMatch(VALUES)));

////////////////////////////////////////////////////////////////////////////////
// Indentifier token
////////////////////////////////////////////////////////////////////////////////

var LETTERS = "qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM";
var DIGITS = "0123456789";
var IDENTIFIER_CHARACTERS = LETTERS + DIGITS + "_-";

var isIdentifierValid = function (string) {
    if (!string) { return true; }
    if (DIGITS.indexOf(string[0]) >= 0) { return false; }
    else if (string[0] === "-") {
        if (string.length > 1 && DIGITS.indexOf(string[1]) >= 0) { return false; }
    }
    var isValid = true;
    for (var i = 0; i < string.length; i++) {
        if (IDENTIFIER_CHARACTERS.indexOf(string[i]) < 0) {
            isValid = false;
            break;
        }
    }
    return isValid;
};

var isIdentifierComplete = function (string) {
    return string.length > 0 && string != "-" && isIdentifierValid(string);
};

Tokens.push(new TokenType("identifier", isIdentifierValid, isIdentifierComplete));

////////////////////////////////////////////////////////////////////////////////
// Template token
////////////////////////////////////////////////////////////////////////////////

var isTemplateValid = function (string) {
    return !string || (string[0] === "@" && isIdentifierValid(string.slice(1)));
};

var isTemplateComplete = function (string) {
    return string.length > 1 && string[0] === "@" && isIdentifierComplete(string.slice(1));
};

Tokens.push(new TokenType("template", isTemplateValid, isTemplateComplete));

////////////////////////////////////////////////////////////////////////////////
// Variable token
////////////////////////////////////////////////////////////////////////////////

var isVariableValid = function (string) {
    return !string || (string[0] === "$" && isIdentifierValid(string.slice(1)));
};

var isVariableComplete = function (string) {
    return string.length > 1 && string[0] === "$" && isIdentifierComplete(string.slice(1));
};

Tokens.push(new TokenType("variable", isVariableValid, isVariableComplete));

////////////////////////////////////////////////////////////////////////////////
// Id token
////////////////////////////////////////////////////////////////////////////////

var isIdValid = function (string) {
    return !string || (string[0] === "#" && isIdentifierValid(string.slice(1)));
};

var isIdComplete = function (string) {
    return string.length > 1 && string[0] === "#" && isIdentifierComplete(string.slice(1));
};

Tokens.push(new TokenType("id", isIdValid, isIdComplete));

////////////////////////////////////////////////////////////////////////////////
// Class token
////////////////////////////////////////////////////////////////////////////////

var isClassValid = function (string) {
    return !string || (string[0] === "." && isIdentifierValid(string.slice(1)));
};

var isClassComplete = function (string) {
    return string.length > 1 && string[0] === "." && isIdentifierComplete(string.slice(1));
};

Tokens.push(new TokenType("class", isClassValid, isClassComplete));

////////////////////////////////////////////////////////////////////////////////
// Operator token
////////////////////////////////////////////////////////////////////////////////

var OPERATORS = [ "&&", "||", "!", "==", "!=", "<", "<=", ">", ">="];

Tokens.push(new TokenType("operator", TokenHelpers.ValidMatch(OPERATORS), TokenHelpers.CompleteMatch(OPERATORS)));

////////////////////////////////////////////////////////////////////////////////
// Symbol token
////////////////////////////////////////////////////////////////////////////////

var SYMBOLS = [ "(", ")", "{", "}", "[", "]", ":", ","];

Tokens.push(new TokenType("symbol", TokenHelpers.ValidMatch(SYMBOLS), TokenHelpers.CompleteMatch(SYMBOLS)));

////////////////////////////////////////////////////////////////////////////////
// Whitespace token
////////////////////////////////////////////////////////////////////////////////

var isWhitespaceValid = function (string) {
    var isValid = true;
    for (var i = 0; i < string.length; i++) {
        if (string[i] !== "\t" && string[i] !== " ") {
            isValid = false;
        }
    }
    return isValid;
};

var isWhitespaceComplete = function (string) {
    return isWhitespaceValid(string);
};

Tokens.push(new TokenType("whitespace", isWhitespaceValid, isWhitespaceComplete));

////////////////////////////////////////////////////////////////////////////////
// Number token
////////////////////////////////////////////////////////////////////////////////

var isNumberValid = function (string) {
    if (string.indexOf("\n") >= 0 || string.indexOf("\t") >= 0 || string.indexOf(" ") >= 0) { return false; }
    return !isNaN(string);
};

var isNumberComplete = function (string) {
    return string.length > 0 && isNumberValid(string);
};

Tokens.push(new TokenType("number", isNumberValid, isNumberComplete));

////////////////////////////////////////////////////////////////////////////////
// String token
////////////////////////////////////////////////////////////////////////////////

var isStringValid = function (string) {
    if (!string) {
        return true;
    } else if (string[0] == "\"") {
        var temp = string.slice(1).remove("\\\\").remove("\\\"");
        if (temp.indexOf("\"") >= 0 && temp.indexOf("\"") != temp.length-1) {
            return false;
        }
    } else {
        return false;
    }
    return true;
};

var isStringComplete = function (string) {
    if (string.length < 2 || !isStringValid(string)) { return false; }
    var doubleQuoteTest = string[0] === "\"" && string[string.length-1] === "\"";
    return doubleQuoteTest;
};

Tokens.push(new TokenType("string", isStringValid, isStringComplete));

////////////////////////////////////////////////////////////////////////////////
// Error token
////////////////////////////////////////////////////////////////////////////////

var isErrorValid = function (string) {
    return string.length <= 1;
};

var isErrorComplete = function (string) {
    return string.length == 1;
};

Tokens.push(new TokenType("error", isErrorValid, isErrorComplete));

exports.tokens = Tokens;
