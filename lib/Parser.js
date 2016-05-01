// Parser.js
// Parser Class
"use strict";

////////////////////////////////////////////////////////////////////////////////
// Imports
////////////////////////////////////////////////////////////////////////////////

var IndentTracer = require("./IndentTracer.js").IndentTracer;
var ParseTree = require("./ParseTree.js").ParseTree;
var Lexer = require("./Lexer.js").Lexer;

////////////////////////////////////////////////////////////////////////////////
// Parser
////////////////////////////////////////////////////////////////////////////////

var Parser = function (options, filename, source, tokenTypes) {
    // options = { indentMode: true/false }
    this.lexer = new Lexer(filename, source, tokenTypes);
};

Parser.prototype.parse = function () {
    this.parseTree = new ParseTree();
    this.currentToken = this.lexer.next(); // set first token
    // add token to parse tree in right spot
    while (this.currentToken) {
        //console.log(this.currentToken.toString());
        this.currentToken = this.lexer.next();
    }
    return this.parseTree;
};

exports.Parser = Parser;
