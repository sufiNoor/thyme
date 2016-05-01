# Keywords

| Keyword | Arguments | Action |
| --- | --- | --- |
| @print | value | prints the output to terminal if running CLI |
| @doctype | string | sets the !DOCTYPE to the input string |
| @comment | string | inserts a html comment |
| @import | string | attempts to import the with path of string |
| @type | value | returns string of type of value |
| @if | json_value | codeblock is evaluated if the json_value is truthy |
| @elseif | json_value | fallback if statement, codeblock is evaluated if the json_value is truthy |
| @else | | codeblock is evaluated when all if and elseif statements fail |
| @length | string | returns length of string |
| @length | array | returns length of array |
| @for | number, number, number | (start, stop, skip) for loop, skip cannot be 0 |
| @each | array | returns each value in an array |
| @each | object | returns each key string in an object |
| @value | | returns value of for loop and each loop |
