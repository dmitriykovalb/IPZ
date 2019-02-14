var lr = require('tiny-lr'),// Мінівебсервер для livereload
gulp = require('gulp'),
// Gulp JS
jade = require('gulp-jade'),
// Плагін для Jade
stylus = require('gulp-stylus'), // Плагін для Stylus
livereload = require('gulp-livereload'), // Livereload для Gulp
myth = require('gulp-myth'),
// Плагін для Myth - http://www.myth.io/
csso = require('gulp-csso'),
// Мініфікація CSS
imagemin = require('gulp-imagemin'),
// Мініфікація зображень
uglify = require('gulp-uglify'),
// Мініфікація JS
concat = require('gulp-concat'),
// Склейка файлів
connect = require('connect'),
// Webserver
server = lr();


gulp.task('stylus', function() {
    gulp.src('./assets/stylus/screen.styl')
    .pipe(stylus({
    use: ['nib']
    }))
    // збираємо stylus
    .on('error', console.log) // Повідомлення в разі помилки
    .pipe(myth()) // додаємо префіксы - http://www.myth.io/
    .pipe(gulp.dest('./public/css/')) // записуємо css
    .pipe(livereload(server)); // даемо команду на перезавантаження css
});


gulp.src('js/app.js')
.pipe(uglify())
.pipe(gulp.dest('build'));


gulp.task('js', function() {
    return gulp.src('js/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter('default'))
    .pipe(uglify())
    .pipe(concat('app.js'))
    .pipe(gulp.dest('build'));
});


gulp.task('http-server', function() {
    connect()
    .use(require('connect-livereload')())
    .use(connect.static('./public'))
    .listen('9000');
    console.log('Server listening on http://localhost:9000');
});

gulp.task('watch', function() {
    gulp.start('stylus');
    gulp.start('jade');
    gulp.start('images');
    gulp.start('js');
    server.listen(35729, function(err) {
    if (err) return console.log(err);
    gulp.watch('assets/stylus/**/*.styl', function() {
    gulp.start('stylus');
    });
    gulp.watch('assets/template/**/*.jade', function() {
    gulp.start('jade');
    });
    gulp.watch('assets/img/**/*', function() {
    gulp.start('images');
    });
    gulp.watch('assets/js/**/*', function() {
    gulp.start('js');
    });
    });
    gulp.start('http-server');
});