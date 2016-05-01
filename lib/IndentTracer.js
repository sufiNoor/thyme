// IndentTracer.js
// sets up a Tracer to track indentation
"use strict";

////////////////////////////////////////////////////////////////////////////////
// Usage
////////////////////////////////////////////////////////////////////////////////

// Initializing an IndentTracer:
// new IndentTracer()
//
// IndentTracer.indentLevel: is current indentation level
// IndentTracer.findIndentLevel(whitespace): updates the indentation level based
//      based upon the whitespace given
//      whitespace is the whitespace before the first character on each line

////////////////////////////////////////////////////////////////////////////////
// IndentTracer
////////////////////////////////////////////////////////////////////////////////

// parent and newIndent args are only used when IndentTracer calls itself
var IndentTracer = function (parent, newIndent) {
    if (!parent) {
        this.indentLevel = 0;
        this.currentIndent = "";
        this.parentIndentTracer = null;
    } else {
        this.indentLevel = parent.indentLevel + 1;
        this.currentIndent = newIndent;
        this.parentIndentTracer = parent;
    }
};

// only call findIndentLevel with the argument whitespace
// the argument isNotFirstRecursion is only used when findIdentLevel calls itself
IndentTracer.prototype.findIndentLevel = function (whitespace, isNotFirstRecursion) {
    // takes whitespace and returns the associated IndentTracer with it
    //  condition 1: whitespace matches current IndentTracer
    //      returns this IndentTracer
    if (this.currentIndent === whitespace) { return this; }
    // indexOf returns the first instance of the currentIndent which needs to at index 0
    // having it at index 0 implies that whitespace starts with the currentIndent
    else if (whitespace.indexOf(this.currentIndent) === 0 && whitespace.length > this.currentIndent.length) {
        //  condition 2: whitespace is larger than current IndentTracer and on first recursion
        //      returns a new IndentTracer
        if (!isNotFirstRecursion) { return new IndentTracer(this, whitespace); }
        //  condition 3: whitespace is larger than current IndentTracer and not on first recursion
        //      throw "IndentationError: unindent does not match any outer indentation level"
        else { throw "IndentationError: unindent does not match any outer indentation level"; }
    }
    //  condition 3: whitespace is smaller than current IndentTracer
    //      return parentIndentTracer.findIndentLevel(whitespace, isNotFirstRecursion=true)
    else { return this.parentIndentTracer.findIndentLevel(whitespace, true); }
};

exports.IndentTracer = IndentTracer;
