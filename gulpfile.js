const gulp = require('gulp');
const concat = require('gulp-concat');
const autoprefixer = require('gulp-autoprefixer');
const cleanCSS = require('gulp-clean-css');
const uglify = require('gulp-uglify-es').default;
const del = require('del');
const imagemin = require('gulp-imagemin');

const cssFiles = [
    './node_modules/normalize.css/normalize.css',
    './src/css/other.css'
];

const jsFiles = [
    './src/js/some.js'
]
function styles() {
    return gulp.src(cssFiles)
        .pipe(concat('all.css'))
        .pipe(autoprefixer({
            browsers: ['> 0.1%'],
            cascade: false
        }))
        .pipe(cleanCSS({
            level: 2
        }))
        .pipe(gulp.dest('./build/css'))
};

function scripts() {
    return gulp.src(jsFiles)
        .pipe(concat('all.js'))
        .pipe(uglify({
            toplevel: true
        }))
        .pipe(gulp.dest('./build/js'))
};

function img() {
    return gulp.src('src/images/*')
        .pipe(imagemin())
        .pipe(gulp.dest('build/images'))
}

function watch() {
    gulp.watch('./src/css/**/*.css', styles);
    gulp.watch('./src/js/**/*.js', scripts);
}

function clean() {
    return del(['build/*']);
}

gulp.task('styles', styles);
gulp.task('scripts', scripts);
gulp.task('img', img);
gulp.task('watch', watch);

gulp.task('build', gulp.series(clean,
    gulp.parallel(styles, scripts, img)));

gulp.task('dev', gulp.series('build', 'watch'));