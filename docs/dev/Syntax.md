# Syntax

This is an abstract overview of the language's syntax. It should be used as a guide for development.

### Comments

Singleline comments are denoted with //

Multiline comments start with /* and end with */  
Multiline comments can affect indentation and should be used carefully

### CodeBlocks

Language is based on codeblocks (indentation)
A codeblock is all clode after the : and all code at the next indentation level following the datatype
Any amount of datatypes can be on the same line
All DataTypes in a codeblock with be evaluated and concatenated

CodeBlocks
```
DataType: datatype datatype
    datatype
    datatype
```

The following can span across multiple lines
```
()
""
''
{}
[]
```

### Identifier

Series of characters [a-zA-Z0-9], hyphen (-), and underscore(_)
Identifiers may not begin with a digit(s), or a hypen followed by a digit(s), which includes a hypen by itself
Excludes the strings true, false, and null

Acceptable identifiers (it is recommended to have a descriptive identifier though):
```
a
_
--
--9
-a
```

Unacceptable identifiers:
```
9
99
-
-9
-99
true
false
null
```

### JSON_Value

```
string => "chars"
number => digits[.digits]
object => {} or { string : value, }
array  => [] or [ value, ]
true
false
null
```

Standard json formating applies [JSON Standard](http://www.json.org/)

Accessing arrays and objects

```
array[number] => element in array at index number
    number must be an int, otherwise throw error
object[string] => value for key string
```

### Element

A character [a-zA-Z] followed by [a-zA-Z0-9] that represents a HTML Element
Excludes the strings true, false, and null

Properties of elements
```
element             => element is included in current scope
element: codeblock  => the codebloack is evaluated and set as the element's contents (inner html)

element{innerElement1:JSON_Value,innerElement2:JSON_Value}
    => element has the attributes innerElement1=JSON_Value and innerElement2=JSON_Value
        attributes do not overwrite and are appended
        attributes cannot be an array, object, or null
        attributes with true will be included without a value
```

Void Elements cannot have inner html and will throw an error if attempted

Complete list of Void Elements:
```
area
base
br
col
command
embed
hr
img
input
keygen
link
meta
param
source
track
wbr
```

### Id

\# + Identifier

Sets the id attribute of an Element to the identifier. If no Element is specified a <div> Element is created.

Properties of Id
```
element#id      => sets the attribute id of element to id
#id             => sets the attribute if of a <div> to id
```

### Class

\. + Identifier

Sets the class attribute of an Element to the identifier. If no Element is specified a <div> Element is created. Multiple classes can be set

Properties of class
```
element.class           => sets the attribute class of element to class
.classone.classtwo      => sets the attribute class of a <div> to class and class
```

### Variable

$ + Identifier

A Variable stores either a JSON_Value or an Element
Variables are global by default, each variable is assigned to a scope, and the most local scope is chosen

Properties of Variables
```
$variable               => returns the Element or string representation of the JSON_Value
                            if used as input, it is not converted to a string
$variable: codeblock    => the codeblock is evaluated and stored in the variable
```

### Keyword

@ + Identifier

Performs a function or task defined by the language

Inputs must be a JSON_Value or an Element

Keyword Inputs
```
@keyword                        => there are no inputs
@keyword()                      => there are no inputs
@keyword($variable)             => the function is given one input
@keyword($variable,$variable)   => the function is given two inputs
```

### Template

@template + Identifier()
The identifier cannot use the names reserved by keywords

Allows the user to define a template that takes inputs, the template returns evaluation of the codeblock

Properities of Template
```
@template identifier: codeblock             => defines a template without inputs
@template identifier(): codeblock           => defines a template with zero inputs
@template identifier($variable): codeblock  => defines a template with one input
@template identifier($variable1,$variable2): codeblock
    => defines a template with two inputs

@identifier or @indentifier()               => returns the evaluated codeblock of the template
```

### Operator

Logical Operators, uses javascript operations

| Operator | Function |
| --- | --- |
| && | and |
| \|\| | or |
| ! | not |
| == | logically equalivalent |
| != | not logically equalivalent |
| < | less than |
| <= | less than or equal to |
| > | greater than |
| >= | greater than or equal to |

Arithmetic Operators

| Operator | Function |
| --- | --- |
| + | add/concatenate |
| - | subtract/remove |
| * | multiply |
| / | divide |
| % | remainder |

### Expression

JSON_Value + Operator + JSON_Value

Performs a javascript operation on the two JSON_Values and returns true or false
Operations are done left to right with parentheses indicating which expression to be performed first

```
value operator value        => performd operation on values and returns true or false
(value operator value)      => performd operation on values and returns true or false
```
