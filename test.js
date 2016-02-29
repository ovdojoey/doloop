var DoLoop = require('./index.js');

var doloop = DoLoop()
  // .changeDirectory('test')
  .do(function(files){
   console.log(files);
  });



console.log(doloop);
