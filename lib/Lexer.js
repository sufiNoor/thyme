// Lexer.js
// Lexer Class
"use strict";

////////////////////////////////////////////////////////////////////////////////
// Imports
////////////////////////////////////////////////////////////////////////////////

var Token = require("./Token.js").Token;
var Scanner = require("./Scanner.js").Scanner;

////////////////////////////////////////////////////////////////////////////////
// Lexer
////////////////////////////////////////////////////////////////////////////////

var Lexer = function (filename, source, tokenTypes) {
    this.scanner = new Scanner(filename, source);
    this.tokenTypes = tokenTypes;
};

Lexer.prototype.startNewToken = function () {
    this.currentToken = new Token();
    this.currentTokenTypes = this.tokenTypes.slice(); // makes a copy of token types
    this.isTokenValid = true;
};

Lexer.prototype.next = function () {
    // returns the next token
    if (this.scanner.isDone()) { return undefined; }
    this.startNewToken();
    while (this.isTokenValid) {
        var currentTokenValue = this.currentToken.getValue();
        var nextCharacter = this.scanner.findCharacter();
        var validTokenTypes = [];
        if (nextCharacter) {
            var nextTokenValue = currentTokenValue + nextCharacter.value;
            // testing to see what token types are still valid for next character
            for (var i = 0; i < this.currentTokenTypes.length; i++) {
                if (this.currentTokenTypes[i].isValid(nextTokenValue)) {
                    validTokenTypes.push(this.currentTokenTypes[i]);
                }
            }
        } // else { leaves validTokenTypes as an empty list }
        if (validTokenTypes.length > 0) {
            // next character still makes valid token(s)
            this.currentToken.addCharacter(this.scanner.next());
            this.currentTokenTypes = validTokenTypes;
        } else {
            // next character will not create any more valid tokens
            // select first token type that is complete, otherwise throw error
            for (var j = 0; j < this.currentTokenTypes.length; j++) {
                if (this.currentTokenTypes[j].isComplete(currentTokenValue)) {
                    this.currentToken.setType(this.currentTokenTypes[j].type);
                    break;
                }
            }
            if (this.currentToken.type === undefined) {
                // token is not complete or tokens are not well defined
                throw "Invalid Token"; //TODO Error Handling
            }
            this.isTokenValid = false;
        }
    }
    return this.currentToken;
};

exports.Lexer = Lexer;
