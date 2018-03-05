var gulp = require('gulp'),
    less = require('gulp-less'),//解析less
    cssnano = require("gulp-cssnano"),//压缩css
    concat = require("gulp-concat"),//文件合并
    uglify = require("gulp-uglify"),//压缩js
    htmlmin = require("gulp-htmlmin"),//压缩html
    clean = require("gulp-clean"),//清理目录
    extender = require('gulp-html-extend'), //html合并
    browserSync = require('browser-sync').create(),//自动刷新
    processhtml = require('gulp-processhtml'),//处理html文件
    addsrc = require('gulp-add-src'),//添加额外的文件流
    gulpif = require('gulp-if'),
    babel = require('gulp-babel');
var sourcemaps = require('gulp-sourcemaps');

var __DIST__ = 'G:/phpStudy/WWW/houtai';
var __HTML__   = 'src/**/*.html';
var __LESS__   = 'src/**/style.less';
var __JS__     = ['src/**/scripts/**/*.js','src/**/views/**/*.js', '!src/**/scripts/lib/**/*.js','!src/**/init.js'];
var __LIB__    = ['src/**/scripts/lib/**/*.js','src/**/init.js'];
var __PACK__   = 'src/**/pack/**/*.js';
var __BASEJS__ = require('./base.config');

var isProduction = false;
var isReload = false;

//构建目录清理
gulp.task("clean", function (done) {
    return gulp.src(__DIST__, {read: false}).pipe(clean({force: true}));
});

gulp.task('default', ['clean'], function () {
    return gulp.start(['release', 'server', 'watch']);
});

gulp.task('prod', ['clean'], function () {
    isProduction = true;
    return gulp.start('release');
});

gulp.task('release', function () {
    return gulp.start(['file', 'style', 'javascript', 'html']);
});

gulp.task('server', function () {
    var port = 3200;
    browserSync.init({
        //server: {
        //    baseDir: __DIST__
        //},
        ui: {
            port: port + 1,
            weinre: {
                port: port + 2
            }
        },
        port: port,
        startPath: '/myqBackend',
        proxy: 'localhost:8080',
        open: false
    });
});

gulp.task('watch', function () {
    isReload = true;
    gulp.watch('src/**/*.less', ['style']);
    gulp.watch('src/**/*.js', ['javascript']);
    gulp.watch('src/**/*.html', ['html']);
});

gulp.task('style', function() {
    return gulp.src(__LESS__)
        .pipe(less())
        .pipe(gulpif(isProduction, cssnano()))
        .pipe(gulp.dest(__DIST__))
        .pipe(gulpif(isReload, browserSync.reload({stream: true})));
});

gulp.task('javascript', function() {
    if (isProduction) {
        gulp.src(__BASEJS__)
            .pipe(concat('main.min.js'))
            .pipe(uglify())
            .pipe(gulp.dest(__DIST__+'/scripts'));
    }

    return gulp.src(__JS__)
        //.pipe(sourcemaps.init())
        .pipe(babel({
            plugins: ["transform-es2015-modules-amd"],
            presets: ['es2015']
        }))
        .pipe(addsrc(__LIB__))
        .pipe(gulpif(!isProduction, addsrc(__PACK__)))
        .pipe(gulpif(isProduction, uglify()))
        //.pipe(sourcemaps.write())
        .pipe(gulp.dest(__DIST__))
        .pipe(gulpif(isReload, browserSync.reload({stream: true})));
});

gulp.task('html', function() {
    return gulp.src([__HTML__, '!src/template/**','!src/scripts/**/*.html'])
        .pipe(extender({annotations:false,verbose:false}))
        .pipe(gulpif(isProduction, processhtml()))
        .pipe(gulpif(isProduction, htmlmin({collapseWhitespace: true})))
        .pipe(gulp.dest(__DIST__))
        .pipe(gulpif(isReload, browserSync.reload({stream: true})));
});

gulp.task('file', function() {
    return gulp.src(['src/**/*.jpg','src/**/*.png','src/**/*.gif'])
        .pipe(addsrc(['src/**/*.otf','src/**/*.eot','src/**/*.svg',
            'src/**/*.ttf','src/**/*.woff','src/**/*.woff2']))
        .pipe(addsrc('src/**/My97DatePicker/**'))
        .pipe(gulp.dest(__DIST__));
});