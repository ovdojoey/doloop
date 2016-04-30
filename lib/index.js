var fs = require('fs');
var path = require('path');

module.exports = DoLoop;

function DoLoop ( initDirectory ) {
  if (!(this instanceof DoLoop)) {
    initDirectory = ( initDirectory ) ? path.resolve(__dirname + "/../../../" + initDirectory) : path.resolve(__dirname + "/../../../");
    return new DoLoop( initDirectory );
  }
  this.directory = initDirectory;
  this.ignoreHiddenFiles(true);
  this.readEncoding(null);
  this.files = [];
  this.allFiles = [];
  this._regEx = null;
  this._callback = null;
  this._buildCallback = null;
}

DoLoop.prototype.ignoreHiddenFiles = function ( ignoreFlag ) {
  if (!arguments.length) return this._ignoreHiddenFiles;
  this._ignoreHiddenFiles = ignoreFlag;
  return this;
};

DoLoop.prototype.readEncoding = function ( encoding ) {
  if (!arguments.length) return this._readEncoding;
  this._readEncoding = encoding;
  return this;
};

DoLoop.prototype.changeDirectory = function ( directory ) {
  this.directory = path.resolve(__dirname + "/../../../" + directory);
  return this;
};

// alias of changeDirectory
DoLoop.prototype.cd = DoLoop.prototype.changeDirectory;

DoLoop.prototype.build = function ( callback ) {

  this._build = true;

  if ( callback ) {
    this._buildCallback = callback;
  }

  if ( !this._buildReady ) {
    return false;
  }

  this._buildCallback();

};

// alias of build
DoLoop.prototype.done = DoLoop.prototype.build;

DoLoop.prototype.loop = function ( regEx, callback ) {

  if ( arguments.length === 2 ) {
    this._regEx = regEx;
    this._callback = callback;
  } else {
    this._callback = regEx;
  }

  try {
    this._readDirectory();
  }
  catch (e) {
    var error = new Error("Unable to read directory");
    throw error;
  }

  return this;
};


DoLoop.prototype._readDirectory = function() {

  var _this = this;

  fs.readdir( this.directory, function (err, files ){

    if (err) throw err;

    // give us the full set of files on first loop
    _this.allFiles = files;

    _this._readFiles( files );

  });

};

DoLoop.prototype._readFiles = function ( files ) {

  var _this = this;

  // creating an array of promises
  var promises = [];

  files.forEach( function ( file, idx ) {

    if ( _this._regEx ) {
      var _regEx;
      try {
        _regEx = new RegExp(_this._regEx);
      } catch (e) {
        var error = new Error('The regular expression  \'' + _this._regEx + '\' was not valid');
        throw error;
      }
      if ( !_regEx.test(file) ) {
        return false;
      }
    }

    // a sync process -- not ideal.
    var fileStats = fs.statSync(_this.directory + "/" + file);
    if ( fileStats.isFile() ) {

      // create a series of promises which upon resolving will fire the build/done method
      promises[idx] = new Promise(
       function(resolve, reject) {
         fs.readFile(_this.directory + "/" + file, _this._readEncoding, function(err, data) {
           if (err) reject(err);
           resolve(data);
         });
       });

       promises[idx].then(
         function(data) {
           _this._callback(file, data);
           _this.files.push(file);
         }
       )
       .catch(
         function(error) {
           console.log('Error reading file and resolving data: ' + error);
         }
       );
    }

  });

  Promise.all(promises).then(function() {
    if ( _this.build ) {
      _this._buildReady = true;
      _this.build();
    }
  });

};
