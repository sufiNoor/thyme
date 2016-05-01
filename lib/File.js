// File.js
// File Class
"use strict";

////////////////////////////////////////////////////////////////////////////////
// Imports
////////////////////////////////////////////////////////////////////////////////

var readFileSync = require("fs").readFileSync;

////////////////////////////////////////////////////////////////////////////////
// File
////////////////////////////////////////////////////////////////////////////////

var File = function (filePath) {
    // attempts to open the file
    // throws error if file cannot be found
    // returns the following based on file type
    // no extension or undefined extension -> string
    // .txt -> string
    // .html -> string
    // .json -> json
    // .FILE_EXTENSION -> string to be passed to parser
    this.name = filePath;
    //TODO convert name to full path
    this.content = readFileSync(filePath, "utf8");
};

exports.File = File;
