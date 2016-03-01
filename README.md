# doloop

doloop is a small module for working with files in a directory.  It allows you to
loop through all the files and perform any number of transforms on the files.  It
can be used as a full on build tool, or a simple tool to make your life easier.

## Getting Started
DoLoop requires Node and NPM to be installed.

Install doloop using `npm install doloop`.  Then create a blank JS file and
require('doloop') at the top.

    var DoLoop = require('doloop');

## Your First Loop
Looping is really easy, take a look at this basic example:

    var myLoop = DoLoop()
     .loop( function( filename, data ){
       console.log( filename );
     });

In the above example we are simply looping over all the files in the current directory and using
console.log to print the name of each file.  

You can do anything you want within the loop.  
For instance, you can choose to do certain things to files if they match a filename:

    var fs = require('fs');
    var DoLoop = require('doloop');
    var cacheBuste = '12_22_16_';
    DoLoop()
    .loop( function( filename, data ) {
      if ( filename === "main.js" ) {
        // do something with the file: `this._directory + "/" + filename`
      }
    });



# API

## The DoLoop constructor
You need to create a new DoLoop object to kick everything off.  You can store it as a variable or
create it anonymously. Optionally, you can pass one argument that will set the directory.

    var myLoop = DoLoop() // store as myLoop
    DoLoop() // self-invoked

From there you'll get to doing stuff by chaining methods on this object.  The two most important
methods are `loop()` and `build()`, read about those below.

## Properties
### DoLoop._directory
This is a String value of the current directory that DoLoop is working in.

### DoLoop._files
This is an array of filenames that gets built up during the loop() method. This
property is useful when used within a done() callback function. With it, you can
see the files that were looped through.

## Methods
You can chain methods, for example `cd(path).readEncoding('utf8').loop(callback)` but
you can not chain more than one loop.  To create several loops
simply create multiple DoLoop constructors.

### cd ( path )
An alias of the changeDirectory method.

### changeDirectory ( path )

- path <String> [required] the path to execute the loop in

Changes the directory relative to the path provided.

### readEncoding ( encoding )

- encoding <String> [required] the encoding to use (for example: 'utf8')

Changes the encoding used by Node's fs.readFile function.
If no encoding is specified (null), then the raw buffer is returned.  Use 'utf8'
to return a utf8 string of the file contents.

### loop ( [regEx], callback )

- regEx <String>  [optional] a regular expression for match filenames in the loop.
- callback <Function> [required] the function to execute on each file looped through.

The callback function is passed two arguments `(filename, data)`, where `data` is
a raw buffer of the file contents (unless modified, for example using `readEncoding('utf8')`).

    var concat = "";
    DoLoop('scripts/')
    .readEncoding('utf8')
    .loop('.js+$' function(filename, data) {
      concat += data;
    });

Here we are looping through all the files in `__dirname/scripts` and storing the
data from each file in `concat`.   At first glance you may think you could use
`concat` outside of the loop, however because this is working asynchronously `concat`
will be an empty string.   To use data created or modified in the loop use the `build()`
method which is only fired after the preceding loop has finished.

### build ( callback )

- callback <Function> [required] the function to execute after the preceding loop has completed

The callback function is called after the loop is finished. It is not passed any
arguments.

### done ( callback )
An alias of the build method.
