var gulp = require('gulp');
var htmlmin = require('gulp-htmlmin');
var cleanCSS = require('gulp-clean-css');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var imagemin = require('gulp-imagemin');
var less = require('gulp-less');
var autoprefixer = require('gulp-autoprefixer');
var copy = require('copy');
var watch = require('gulp-watch');

gulp.task('minify', function() {
  return gulp.src('assets/*.html')
    .pipe(htmlmin({collapseWhitespace: true}))
    .pipe(gulp.dest('dist'));
});

gulp.task('copy', function (cb) {
  copy('./node_modules/chico/dist/assets/*', 'dist/assets', cb);
});

gulp.task('minify-css', function() {
  return gulp.src(['node_modules/chico/dist/ui/chico.min.css','assets/less/*.less'])
  	.pipe(less())
  	.pipe(autoprefixer({
        browsers: ['last 2 versions'],
        cascade: false
    }))
  	.pipe(concat('style.min.css'))
    .pipe(cleanCSS({compatibility: 'ie8'}))
    .pipe(gulp.dest('dist/css'));
});

gulp.task( 'compress', function () {
	return gulp.src(['node_modules/chico/dist/ui/chico.min.js','assets/js/*.js'])
	.pipe(concat('script.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('dist/js'));
});

gulp.task( 'minify-image', function () {
	return gulp.src('assets/images/*')
        .pipe(imagemin())
        .pipe(gulp.dest('dist/images'))
});

gulp.task('watch', function() {
 gulp.watch('assets/less/*.less', ['minify-css']);
 gulp.watch('assets/js/*.js', ['compress']);
 gulp.watch('assets/images/*', ['minify-image']);
 gulp.watch('assets/*.html', ['minify']);
});