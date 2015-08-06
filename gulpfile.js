var gulp = require('gulp');

/*
 Credit to Dan Harper for [original Browserify/Babelify solution]
 {@link https://gist.github.com/danharper/3ca2273125f500429945}.
*/
function buildJS(watch) {
	var babel = require('babelify');
	var browserify = require('browserify');
	var buffer = require('vinyl-buffer');
	var source = require('vinyl-source-stream');
	var sourcemaps = require('gulp-sourcemaps');
	var watchify = require('watchify');

	var src = browserify('./src/js/main.js', { debug: true }).transform(babel);

	if(watch) {
		src = watchify(src);
	}

	function build() {
		src.bundle()
			.on('error', function(err) { console.error(err); this.emit('end'); })
			.pipe(source('glimpse.js'))
			.pipe(buffer())
			.pipe(sourcemaps.init({ loadMaps: true }))
			.pipe(sourcemaps.write('./'))
			.pipe(gulp.dest('./build'));
	}

	if(watch) {
		src.on('update', function() {
			console.log('- JavaScript change detected. Recompiling..');
			build();
		});
	}

	build();
}

function buildCSS(watch) {
	var less = require('gulp-less');
	var watchify = require('watchify');

	var src = gulp.src('./src/less/**/*.less');

	if(watch) {
		src = watchify(src);
	}

	function build() {
		src.pipe(less())
			.pipe(gulp.dest('./build'));
	}

	if(watch) {
		src.on('update', function() {
			console.log('- CSS change detected. Recompiling..');
			build();
		});
	}

	build();
}

function watch() {
	buildJS(true);
	buildCSS(true);
}

gulp.task('build-js', function() { buildJS(false); });
gulp.task('build-css', function() { buildCSS(false); }) ;
gulp.task('watch', watch);

gulp.task('build', ['build-js', 'build-css']);
gulp.task('default', ['build']);