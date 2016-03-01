##Concatenate Strings
You can easily loop through files and grab the string data inside.

    var DoLoop = require('doloop');
    var fs = require('fs');

    var buildJSStream = '';
    DoLoop()
    .cd('examples/concat')
    .readEncoding('utf8')
    .loop('.js+$', function(filename, data){
      buildJSStream = buildJSStream + data;
    })
    .build(function(){
      fs.writeFile('build.js', buildJSStream, function (err) {
        if (err) return console.log(err);
        console.log('File wrote');
      });
    });
