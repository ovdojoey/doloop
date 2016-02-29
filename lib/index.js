var fs = require('fs');
var path = require('path');

module.exports = DoLoop;

function DoLoop ( initDirectory ) {
  initDirectory = ( initDirectory ) ? initDirectory : path.resolve(__dirname + '/..');
  if (!(this instanceof DoLoop)) return new DoLoop( initDirectory );
  this.directory = initDirectory;
}

/* Path is relative */
DoLoop.prototype.changeDirectory = function ( directory ) {
  this.directory = path.resolve(__dirname + "/../" + directory);
  return this;
};

DoLoop.prototype.do = function ( callback ) {
  fs.readdir(this.directory, function(err, files){
    if (err) throw err;
    callback(files);
  });
};
