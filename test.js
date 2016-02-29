var DoLoop = require('./index.js');
var fs = require('fs');

var doloop = DoLoop()
  //.cd('test')
  .loop('*', function(filename, data){ //.js+$
    if ( filename === 'test.js' ) {
      // fs.rename(file, 'test2.js');
    }
    console.log(filename);
  });
