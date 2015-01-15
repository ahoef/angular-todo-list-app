var gulp = require('gulp');
	gutil = require('gulp-util');
	sass = require('gulp-ruby-sass');
    uglify = require('gulp-uglify'),
    minifycss = require('gulp-minify-css'),
    watch = require('gulp-watch'),
    concat = require('gulp-concat'),
    notify = require('gulp-notify');

gulp.task('sass', function () {
	gulp.src('src/css/*.scss')
	.pipe(sass())
	.pipe(minifycss())
	.pipe(concat("base.min.css"))
	.pipe(gulp.dest('dest/css'))
	.pipe(notify({
      	message: "Sass compiled!"
    }));
});

gulp.task('js', function() {
//   gulp.src('src/js/app/*.js')
//   	.pipe(uglify())
//   	.pipe(concat("app.min.js"))
//   	.pipe(gulp.dest('dest/js'));

  gulp.src('src/js/angular/*.js')
    .pipe(uglify())
    .pipe(concat("angular.min.js"))
    .pipe(gulp.dest('dest/js'));

  gulp.src('src/js/jquery/*.js')
    .pipe(uglify())
    .pipe(concat("jquery.min.js"))
    .pipe(gulp.dest('dest/js'));

	gulp.src('src/js/vendors/*.js')
  	.pipe(uglify())
  	.pipe(concat("vendors.min.js"))
  	.pipe(gulp.dest('dest/js'))
  	.pipe(notify({ 
  		message: "JS compiled!"
  	}));
});

gulp.task('watch', function() {
  	gulp.watch('src/css/*.scss', function() {
    	gulp.run('sass');
  	});

  	gulp.watch('src/js/app/*.js', function() {
	    gulp.run('js');
	  });
});

gulp.task('default', ['sass', 'js', 'watch']);