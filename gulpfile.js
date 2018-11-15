'use strict';

var gulp 			= require('gulp'),
    postcss         = require('gulp-postcss'),
    autoprefixer 	= require('autoprefixer'),
    sass 			= require('gulp-sass'),
    sourcemaps      = require('gulp-sourcemaps'),
	browserSync 	= require("browser-sync"),
	watch 	        = require("gulp-watch");

var path = {
    html: 'index.html',
    sass: 'sass/index.scss',
    sassWatch: 'sass/**/*.scss',
    css: 'css'
};

var config = {
    server: {
        baseDir: "./"
    },
    tunnel: true,
    host: 'localhost',
    port: 3000
};

gulp.task('web-server', function () {
    browserSync(config);
});

gulp.task('style:build', function () {
    var plugins = [
        autoprefixer(
            {
                browsers: ['last 2 versions'],
                cascade: false
            }
        )
    ];

    gulp.src(path.sass)
        .pipe(sourcemaps.init())
            .pipe(sass().on('error', sass.logError))
            .pipe(postcss(plugins))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(path.css))
        .pipe(browserSync.stream());
});


gulp.task('watch', function(){
    watch(path.html, function() {
        browserSync.reload();
    });
    watch(path.sassWatch, function() {
        gulp.start('style:build');
    });
});

gulp.task('default', ['style:build', 'web-server', 'watch']);
