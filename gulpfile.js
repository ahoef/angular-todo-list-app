var   gulp = require('gulp');
      gutil = require('gulp-util');
      sass = require('gulp-ruby-sass');
      uglify = require('gulp-uglify'),
      minifycss = require('gulp-minify-css'),
      watch = require('gulp-watch'),
      concat = require('gulp-concat'),
      notify = require('gulp-notify'),
      connect = require('gulp-connect');


gulp.task('connect', function() {
  connect.server();
});

gulp.task('sass', function () {
	gulp.src('styles/src/*.scss')
	.pipe(sass())
	.pipe(minifycss())
	.pipe(concat("base.min.css"))
	.pipe(gulp.dest('styles/dest'))
	.pipe(notify({
      	message: "Sass compiled!"
    }));
});

gulp.task('js', function() {
  gulp.src('libraries/src/angular/*.js')
    .pipe(uglify())
    .pipe(concat("angular.min.js"))
    .pipe(gulp.dest('libraries/dest'));

  gulp.src('libraries/src/jquery/*.js')
    .pipe(uglify())
    .pipe(concat("jquery.min.js"))
    .pipe(gulp.dest('libraries/dest'))
    .pipe(notify({ 
      message: "JS compiled!"
    }));
});

gulp.task('watch', function() {
  	gulp.watch('styles/src/*.scss', function() {
    	gulp.run('sass');
  	});
});

gulp.task('default', ['connect', 'sass', 'js', 'watch']);