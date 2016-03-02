##Image Processing
Sometimes you have a large folder full of images.  It can be painstaking to go through
each image and get it ready for your website.  Especially if the images are named poorly.

    var DoLoop = require('doloop');
    var fs = require('fs');
    var Imagemin = require('imagemin');

    var buildImageLoop = '';
    DoLoop()
    .cd('examples/images')
    .readEncoding('utf8')
    .loop('.jpg', function(filename, data){

      // this process is happening asynchronously
      new Imagemin()
      .src('src/img/' + filename)
      .dest('examples/images/compressed')
      .use(Imagemin.jpegtran({progressive : true}))
      .run();

      buildImageLoop += "<li><img src=/examples/images/compressed/"+filename+"></li>";

    })
    .build(function(){
      buildImageLoop = '<ul>' + buildImageLoop + '</ul>';
      // you could opt to write the collection of images to a file
      fs.writeFile('image-collection.html', buildImageLoop, function (err) {
        if (err) return console.log(err);
        console.log('File wrote');
      });

      // or just print it to the console for copy/pasting
      console.log(buildImageLoop);

    });
