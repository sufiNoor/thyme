////////////////////////////////////////////////////////////////////////////////
// Test Files
////////////////////////////////////////////////////////////////////////////////

var reload = require('require-reload')(require);
var testScanner = reload('./testScanner.js').testScanner;
var testLexer = reload('./testLexer.js').testLexer;

////////////////////////////////////////////////////////////////////////////////
// Run All Tests
////////////////////////////////////////////////////////////////////////////////

var run = function () {
    console.log("Starting tests...");
    var passedAllTests = true;
    try {
        var errors = [];
        // place all tests here
        errors = errors.concat(testScanner());
        errors = errors.concat(testLexer());
        // end of tests
        if (errors.length > 0) {
            for (var i = 0; i < errors.length; i++) {
                var error = errors[i];
                //console.log(error.message);
                console.log(error.stack);
            }
            passedAllTests = false;
        }
    } catch (e) {
        console.error(e.stack);
        passedAllTests = false;
    }
    if (!passedAllTests) { console.log("Tests failed!"); }
    else { console.log("Tests passed!"); }
    return passedAllTests;
};

exports.runTests = run;
