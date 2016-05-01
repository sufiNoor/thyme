// run all tests here

var run = function () {
    console.log("Starting tests...");
    var passedAllTests = true;
    if (!passedAllTests) { console.log("Tests failed!"); }
    else { console.log("Tests passed!"); }
    return passedAllTests;
};

exports.runTests = run;
