var gulp = require('gulp');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var gutil = require('gulp-util');

gulp.task('concat-js', function() {
  return gulp.src(
    [
          './node_modules/jquery/dist/jquery.min.js',  
          './node_modules/bootstrap/dist/js/bootstrap.min.js',
          './node_modules/systemjs/dist/system.src.js',
          './node_modules/angular2/bundles/angular2-polyfills.js',
          './node_modules/rxjs/bundles/Rx.js',
          './node_modules/angular2/bundles/angular2.dev.js',
          './node_modules/angular2/bundles/http.dev.js'          
    ])
    .pipe(concat('vendor.js'))
    .pipe(gulp.dest('./Static'));
});

gulp.task('default', function() {
    gutil.log('Hello world!');
  // place code for your default task here
});