var DoLoop = require('./index.js');
var fs = require('fs');

var buildStream = '';
var doloop = DoLoop('/joeylea/doloop/examples/concat')
  // .cd('')
  .readEncoding('utf8')
  .loop('.js+$', function(filename, data){ //.js+$
    if ( filename === 'test.js' ) {
      // fs.rename(file, 'test2.js');
    }
    buildStream = buildStream + data;
  })
  .build(function(){
    console.log(buildStream);
    fs.writeFile('helloworld.txt', buildStream, function (err) {
      if (err) return console.log(err);
      console.log('File wrote');
    });
  });

  // fs.writeFile('helloworld.txt', buildStream, function (err) {
  //   if (err) return console.log(err);
  //   console.log('File wrote');
  // });
  //
  // console.log(buildStream);
