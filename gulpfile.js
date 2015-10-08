var gulp = require('gulp');
var babelify = require('babelify');
var browserify = require('browserify');
var vinylSourceStream = require('vinyl-source-stream');
var vinylBuffer = require('vinyl-buffer');
var uglify = require("gulp-uglify");

var build = 'build/';


var src = {
	html: 'index.html',
	libs: 'libs/**',
	scripts: {
		all: 'scripts/**/*.js',
		app: 'scripts/app.js'
	}
};


var out = {
	libs: build + 'libs/',
	scripts: {
		file: 'app.min.js',
		folder: build + 'scripts/'
	}
};


gulp.task('html', function() {
	return gulp.src(src.html)
		.pipe(gulp.dest(build))
});


gulp.task('libs', function() {
	return gulp.src(src.libs)
		.pipe(gulp.dest(out.libs))
});


gulp.task('scripts', function() {
	var sources = browserify({
		entries: src.scripts.app,
		debug: false
	})
	.transform(babelify.configure({}));

	return sources.bundle()
		.pipe(vinylSourceStream(out.scripts.file))
		.pipe(vinylBuffer())
		.pipe(uglify())
		.pipe(gulp.dest(out.scripts.folder))
});
