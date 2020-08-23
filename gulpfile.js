"use strict";

var gulp = require("gulp");
var plumber = require("gulp-plumber");
var postcss = require("gulp-postcss");
var autoprefixer = require("autoprefixer");
var server = require("browser-sync").create();
var gulp = require('gulp'),
  sass = require('gulp-sass'),
  cleanCSS = require('gulp-clean-css'), // min CSS
  rimraf = require('gulp-rimraf'), // плагин для удаления файлов и каталогов
  rename = require('gulp-rename'),
  rigger = require('gulp-rigger'), // модуль для импорта содержимого одного файла в другой
  sourcemaps = require('gulp-sourcemaps'), // модуль для генерации карты исходных файлов
  minify = require('gulp-minify'), // min js
  prettify = require('gulp-html-prettify');
  sass.compiler = require('node-sass');

gulp.task("style", function () {
  gulp.src("sass/style.scss")
    .pipe(plumber())
    .pipe(sass.sync().on('error', sass.logError))
    .pipe(postcss([
      autoprefixer()
    ]))
    .pipe(gulp.dest('css'))
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(cleanCSS()) // минимизируем CSS
    .pipe(sourcemaps.write('./')) // записываем sourcemap
    .pipe(gulp.dest("css"))
    .pipe(server.stream());
});


gulp.task("serve", ["style"], function () {
  server.init({
    server: ".",
    notify: false,
    open: true,
    cors: true,
    ui: false
  });


  gulp.watch('./sass/**/*.scss', ['style']);
  gulp.watch("*.html").on("change", server.reload);
});