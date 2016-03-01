var fs = require('fs');
var path = require('path');

module.exports = DoLoop;

function DoLoop ( initDirectory ) {
  initDirectory = ( initDirectory ) ? initDirectory : path.resolve(__dirname + '/../../../');
  if (!(this instanceof DoLoop)) return new DoLoop( initDirectory );
  this._directory = initDirectory;
  this.ignoreHiddenFiles(true);
  this.readEncoding(null);
  this._files = [];
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

/* Path is relative */
DoLoop.prototype.changeDirectory = function ( directory ) {
  this._directory = path.resolve(__dirname + "/../../../" + directory);
  return this;
};

// alias of changeDirectory
DoLoop.prototype.cd = DoLoop.prototype.changeDirectory;

DoLoop.prototype.loop = function ( regEx, callback ) {

  if ( arguments.length === 2 ) {
    this._regEx = regEx;
    this._callback = callback;
  } else {
    this._callback = regEx;
  }

  try {
    this.readDirectory();
  }
  catch (e) {
    var error = new Error("Unable to read directory");
    throw error;
  }

  return this;
};

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

DoLoop.prototype.readDirectory = function() {

  var _this = this;

  fs.readdir( this._directory, function (err, files ){

    if (err) throw err;

    _this.readFiles( files );

  });

};

DoLoop.prototype.readFiles = function ( files ) {

  var _this = this;
  var filesToRead = 0;

  function checkForBuild() {
    if ( filesToRead === _this._files.length && _this._build ) {
      _this._buildReady = true;
      _this.build();
    }
  }

  files.forEach( function ( file ) {

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

    var fileStats = fs.statSync(_this._directory + "/" + file);
    if ( fileStats.isFile() ) {

      // push file into array
      filesToRead++;
      fs.readFile(_this._directory + "/" + file, _this._readEncoding, function(err, data) {
        if (err) throw err;
        _this._callback(file, data);
        _this._files.push(file);
        checkForBuild();
      });

    }

  });

};
