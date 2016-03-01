# doloop

doloop is a small module for working with files in a directory.  It allows you to
loop through all the files and perform any number of transforms on the files.  It
can be used as a full on build tool, or a simple image compressor.

## Getting Started
DoLoop requires Node and NPM installed, grab them at (https://nodejs.org/)[NodeJS].

Install doloop using `npm install doloop`.

## Your First Loop
Looping is really easy, take a look at this basic example:

    var myLoop = DoLoop()
     .loop(function(filename, data){
       console.log(filename);
     });

Here we are simply looping over all the files in the current directory and we are using
console.log to print the name of each file.

## DoLoop constructor
You need to create a new DoLoop object to kick everything off.  You can store it as a variable or
create it anonymously.  

    var myLoop = DoLoop() // store as myLoop
    DoLoop() // self-invoked

## Methods
Every method returns the DoLoop object to allow for chaining methods.

### cd ( path )
An alias of changeDirectory.

### changeDirectory( path )
Changes the directory relative to the path provided.

### readEncoding ( encoding )
Changes the encoding used by Node's fs.readFile function.
If no encoding is specified (null), then the raw buffer is returned.  Use 'utf8'
to return a utf8 string of the file contents.

### loop([regEx], callback)

- regEx <String> is an optional regular expression string that can be used to match certain filenames.
- callback <Function> is the function to execute on each file looped through.

The callback function is passed two arguments `(filename, data)`, where `data` is
a raw buffer of the file contents (unless modified, for example using `readEncoding('utf8')`).
