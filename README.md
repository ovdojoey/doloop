# doloop

doloop is a small module for working with files in a directory.  It allows you to
loop through all the files and perform any number of transforms on the files.  It
can be used as a full on build tool, or a simple image compressor.

## Getting Started
DoLoop requires Node and NPM installed, grab them at (https://nodejs.org/)[NodeJS].

Install doloop using `npm install doloop`.

## Your First Loop
Looping is really easy, take a look at this basic example:

    var doloop = DoLoop()
     .loop(function(files){
       console.log(files);
     });

Here we are simply looping over all the files in the current directory and we are using
console.log to print the array of file names.

## Methods
### changeDirectory( path )
