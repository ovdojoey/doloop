var fs = require('fs');
var path = require('path');

module.exports = DoLoop;

function DoLoop () {
  this.destination = [];
  this.directory = '';
}

DoLoop.prototype.doThat = function(directory) {
  this.directory = directory;
  return this;
};

DoLoop.prototype.this = function(){
  console.log('test');
  return this;
};
