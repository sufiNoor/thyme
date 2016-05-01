// ExtraTools.js
// small library with help functions
"use strict";

////////////////////////////////////////////////////////////////////////////////
// String Prototypes
////////////////////////////////////////////////////////////////////////////////

// check if a string contains the string
String.prototype.remove = function (string) {
    var newString = this;
    if (typeof string !== "string") {
        throw "TypeError: input is not a string";
    } else {
        while (newString.indexOf(string) >= 0) {
            var i = newString.indexOf(string);
            newString = newString.slice(0,i) + newString.slice(i+string.length);
        }
        return newString;
    }
};

////////////////////////////////////////////////////////////////////////////////
// Token Helpers
////////////////////////////////////////////////////////////////////////////////

var ValidMatch = function (array) {
    var validator = function (string) {
        var isValid = false;
        for (var i = 0; i < array.length; i++) {
            if (string.length <= array[i].length && string === array[i].slice(0,string.length)) {
                isValid = true;
                break;
            }
        }
        return isValid;
    };
    return validator;
};

var CompleteMatch = function (array) {
    var completeness = function (string) {
        var isValid = false;
        for (var i = 0; i < array.length; i++) {
            if (string === array[i]) {
                isValid = true;
                break;
            }
        }
        return isValid;
    };
    return completeness;
};

exports.TokenHelpers = {
    ValidMatch: ValidMatch,
    CompleteMatch: CompleteMatch
};
