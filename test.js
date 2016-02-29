var DoLoop = require('./index.js');

var doloop = DoLoop()
  .cd('test')
  .loop(function(files){
   console.log(files);
  });
