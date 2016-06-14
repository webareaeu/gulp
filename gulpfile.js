var gulp = require('gulp');
var concat = require('gulp-concat');
var cleanCSS = require('gulp-clean-css');
var less = require('gulp-less');
var sourcemaps = require('gulp-sourcemaps');
var imagemin = require('gulp-imagemin');
var uglify = require('gulp-uglify');
var del = require('del');

// Styles Task
/*
gulp.task('styles', function() {
    return gulp.src('app/css/*.css')
        .pipe(sourcemaps.init())
        .pipe(cleanCSS({compatibility: 'ie8'}))
        .pipe(concat('styles.css'))
        .pipe(sourcemaps.write('maps'))
        .pipe(gulp.dest('dist'));
});
*/

// Less Task
gulp.task('less', function() {
    return gulp.src([
            'app/less/*.less', 
            'app/css/*.css'
        ])
        .pipe(sourcemaps.init())
        .pipe(less())
        .pipe(cleanCSS({compatibility: 'ie8'}))
        .pipe(concat('styles.css'))
        .pipe(sourcemaps.write('maps'))
        .pipe(gulp.dest('dist'));
});

// Images Task
gulp.task('images', function() {
	return gulp.src('app/img/*')
		.pipe(imagemin())
		.pipe(gulp.dest('dist/img'));
});

// Scripts Task
gulp.task('scripts', function() {
	return gulp.src('app/js/*.js')
		.pipe(sourcemaps.init())
		.pipe(concat('scripts.js'))
		.pipe(uglify())
		.pipe(sourcemaps.write('maps'))
		.pipe(gulp.dest('dist'));
});

// Clean Task
gulp.task('clean', function(cb) {
	return del(['dist/*'], cb);
});

// Watch Task
gulp.task('watch', function() {
    // gulp.watch('app/css/*.css', gulp.series('styles'));
    gulp.watch(['app/less/*.less', 'app/css/*.css'], gulp.series('less'));
    gulp.watch('app/js/*.js', gulp.series('scripts'));
    gulp.watch('app/img/*', gulp.series('images'));
});

// Default Task with CSS styles
// gulp.task('default', gulp.parallel('clean', 'styles', 'scripts', 'images', 'watch'));

// Default Task with LESS styles
gulp.task('default', gulp.parallel('clean', 'less', 'scripts', 'images', 'watch'));