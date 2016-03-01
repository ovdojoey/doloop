# doloop

doloop is a small module for working with files in a directory.  It allows you to
loop through all the files and perform any number of transforms on the files.  It
can be used as a full on build tool, or a simple tool to make your life easier.

## Getting Started
DoLoop requires Node and NPM to be installed.

Install doloop using `npm install doloop`.

## Your First Loop
Looping is really easy, take a look at this basic example:

    var myLoop = DoLoop()
     .loop(function(filename, data){
       console.log(filename);
     });

Here we are simply looping over all the files in the current directory and we are using
console.log to print the name of each file.

## The DoLoop constructor
You need to create a new DoLoop object to kick everything off.  You can store it as a variable or
create it anonymously. Optionally, you can pass one argument that will set the directory.

    var myLoop = DoLoop() // store as myLoop
    DoLoop() // self-invoked

From there you'll get to doing stuff by chaining methods on this object.  The two most important
methods are `loop()` and `build()`, read about those below.

## Methods
Every method returns the DoLoop object to allow for chaining methods.

### cd ( path )
An alias of changeDirectory.

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
An alias of build.
