var gulp = require('gulp');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var insert = require('gulp-insert');
var autoprefixer = require('gulp-autoprefixer');
var minifycss = require('gulp-minify-css');

gulp.task('minifyjs', function () {
    gulp.src('src/scripts.js')
        .pipe(uglify())
        .pipe(insert.wrap('<script>', '</script>'))
        .pipe(rename('scripts.ejs'))
        .pipe(gulp.dest('views/partials'));
});
gulp.task('minifycss', function () {
    gulp.src('src/styles.css')
        .pipe(minifycss())
        .pipe(autoprefixer())
        .pipe(insert.wrap('<style>', '</style>'))
        .pipe(rename('styles.ejs'))
        .pipe(gulp.dest('views/partials'))
});

gulp.task('watch', function () {
    gulp.watch('src/*.+(js|css)', ['minifyjs', 'minifycss']);
});