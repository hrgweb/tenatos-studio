var gulp = require('gulp'),
	scss = require('gulp-ruby-sass'),
	uglify = require('gulp-uglify'),
	livereload = require('gulp-livereload');

var dest = './dist/',
	html = './*.html',
	scssSrc = './css/scss/*.scss',
	// scssDest = dest + 'style',
	scssDest = './css/',
	jsSrc = ['./js/**/*.js', './js/*.js'],
	jsDest = dest + 'js/app.js';

// html
gulp.task('html', function() {
	gulp.src(html)
		.pipe(livereload());
});

// scss
gulp.task('scss', function() {
	return scss(scssSrc, {
		// style: 'compressed',
		style: 'expanded',
		sourcemap: true
	})
		.pipe(gulp.dest(scssDest))
		.pipe(livereload());
});

// js
gulp.task('js', function() {
	gulp.src(jsSrc)
		.pipe(uglify())
		.pipe(gulp.dest(jsDest))
		.pipe(livereload());
});

// watch for each task that changed
gulp.task('watch', function() {
	livereload.listen();
	gulp.watch(html, ['html']);
	gulp.watch(scssSrc, ['scss']);
	gulp.watch(jsSrc, ['js']);
});

// default
gulp.task('default', ['html', 'scss', 'js', 'watch']);