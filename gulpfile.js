// requirements

var gulp = require('gulp');
var gulpBrowser = require("gulp-browser");
//var reactify = require('reactify');
var babelify = require('babelify');
var del = require('del');
var size = require('gulp-size');


// tasks

gulp.task('transform', function () {
  var stream = gulp.src('./project/static/scripts/jsx/*.js')
    //.pipe(gulpBrowser.browserify({transform: ['reactify']}))
    //.pipe(gulpBrowser.browserify({transform: ['babelify']}))
    .pipe(gulpBrowser.browserify({transform: ['babelify', {presets: ["es2015", "react"]}]}))
    // .pipe(gulp.dest('./project/static/templates/'))
    .pipe(gulp.dest('./project/static/scripts/js/'))
    .pipe(size());
  return stream;
});

gulp.task('del', function () {
  // return del(['./project/static/templates']);
  return del(['./project/static/scripts/js']);
});

gulp.task('default', ['del'], function () {
  gulp.start('transform');
  gulp.watch('./project/static/scripts/jsx/*.js', ['transform']);
});