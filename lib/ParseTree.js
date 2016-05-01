// ParseTree.js
// ParseTree Class
"use strict";

////////////////////////////////////////////////////////////////////////////////
// ParseTree
////////////////////////////////////////////////////////////////////////////////

// ParseTree is just a glorified tree
// parent argument is only given when called by itself
var ParseTree = function (type, value, parent) {
    this.type = type; // type of node
    this.value = value;
    if (parent) {
        this.level = parent.level + 1;
        this.parent = parent;
    } else {
        this.level = 0;
        this.parent = undefined;
    }
    this.children = [];
};

ParseTree.prototype.toString = function () {
    var indent = "";
    for (var i = 0; i < this.level; i++) {
        indent +=  "    ";
    }
    var string = indent + this.type + " (";
    string += " level: " + this.level + ",";
    string += " value: " + this.value + " )";
    if (this.children.length) {
        string += ":\n";
        for (var child = 0; child < this.children.length; child++) {
            string += this.children[child].toString();
        }
    } else {
        string += "\n";
    }
    return string;
};

ParseTree.prototype.addNode = function (type, value) {
    var child = new ParseTree(type, value, this);
    this.children.push(child);
    return child;
};

exports.ParseTree = ParseTree;
