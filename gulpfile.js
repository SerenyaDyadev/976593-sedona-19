"use strict";

var gulp = require("gulp");
var plumber = require("gulp-plumber");
var sourcemap = require("gulp-sourcemaps");
var less = require("gulp-less");
var postcss = require("gulp-postcss");
var autoprefixer = require("autoprefixer");
var server = require("browser-sync").create();
var csso = require("gulp-csso");
var rename = require("gulp-rename");
var imagemin = require("gulp-imagemin");
var webp = require("gulp-webp");
var svgstore = require("gulp-svgstore");
var posthtml = require("gulp-posthtml");
var include = require("posthtml-include");
var del = require("del");
var htmlmin = require('gulp-htmlmin');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat')

gulp.task("clean", function () {
  return del("build", "source/js/scriptPic.js")
});

gulp.task("css", function () {
  return gulp.src("source/less/style.less")
    .pipe(plumber())
    .pipe(sourcemap.init())
    .pipe(less())
    .pipe(postcss([
      autoprefixer()
    ]))
    .pipe(sourcemap.write("."))
    .pipe(gulp.dest("build/css"))
});

gulp.task("css-min", function () {
  return gulp.src("build/css/style.css")
    .pipe(csso())
    .pipe(rename("style.min.css"))
    .pipe(sourcemap.write("."))
    .pipe(gulp.dest("build/css"))
    .pipe(server.stream());
});


gulp.task("images", function () {
  return gulp.src("source/img/*.{png,jpg,svg}")
    .pipe(imagemin([
      imagemin.optipng({ optimizationLevel: 3 }),
      imagemin.mozjpeg({ progressive: true }),
      imagemin.svgo({
        plugins: [
          { removeViewBox: false },
          { cleanupIDs: true }
        ]
      })
    ]))
    .pipe(gulp.dest("source/img"));
});

gulp.task("webp", function () {
  return gulp.src("source/img/**/*.{png,jpg}")
    .pipe(webp({ quality: 90 }))
    .pipe(gulp.dest("source/img"));
});

gulp.task("sprite", function () {
  return gulp.src("source/img/icon-*.svg")
    .pipe(svgstore({
      inlineSvg: true
    }))
    .pipe(rename("sprite.svg"))
    .pipe(gulp.dest("build/img"));
});

gulp.task("html", function () {
  return gulp.src("source/*.html")
    .pipe(posthtml([
      include({ root: "./build" })
    ]))
    .pipe(gulp.dest("build"));
});

gulp.task("htmlmin", function () {
  return gulp.src("build/*.html")
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(gulp.dest("build"));
});

gulp.task('concat-js', function () {
  return gulp.src("source/js/*js")
    .pipe(concat('scriptPic.js'))
    .pipe(gulp.dest("source/js"))
});

gulp.task('compress-js', function () {
  return gulp.src("source/js/scriptPic.js")
  .pipe(uglify())
  .pipe(rename("script.min.js"))
  .pipe(gulp.dest("build/js"));
});

gulp.task("refresh", function (done) {
  server.reload();
  done();
});

gulp.task("server", function () {
  server.init({
    server: "build/",
    notify: false,
    open: true,
    cors: true,
    ui: false
  })

  gulp.watch("source/less/**/*.less", gulp.series("css", "css-min"));
  gulp.watch("source/img/icon-*.svg", gulp.series("sprite", "html", "htmlmin", "refresh"));
  gulp.watch("source/*.html", gulp.series("html", "htmlmin", "refresh"));
  gulp.watch("source/*.js", gulp.series("concat-js", "compress-js", "refresh"))
});

gulp.task("copy", function () {
  return gulp.src([
    "source/fonts/**/*.{woff,woff2}",
    "source/img/**",
    "source/*.ico",
    "source/js/script.js",
  ], {
    base: "source"
  })
    .pipe(gulp.dest("build"));
});


gulp.task("build", gulp.series("clean", "copy", "css", "css-min", "sprite", "html", "htmlmin", "concat-js" ,"compress-js"));
gulp.task("start", gulp.series("build", "server"));
