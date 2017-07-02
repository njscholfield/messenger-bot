var gulp = require('gulp');
var browserify = require('browserify');
var vueify = require('vueify');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var uglify = require('gulp-uglify');
var sourcemaps = require('gulp-sourcemaps');
var gutil = require('gulp-util');

if(gutil.env.production === true) {
  process.env.NODE_ENV = 'production';
}

gulp.task('results', function() {
  vueBuild('results');
});

function vueBuild(location) {
  var b = browserify({
    entries: `./src/${location}/main.js`,
    debug: true,
    transform: [vueify, ['envify', {global: true}]]
  });

  return b.bundle()
  .pipe(source('bundle.min.js'))
  .pipe(buffer())
  .pipe(sourcemaps.init({loadMaps: true}))
    .pipe(uglify())
    .on('error', gutil.log)
  .pipe(sourcemaps.write(''))
  .pipe(gulp.dest(`./public/js/${location}`));
}

gulp.task('default', ['results']);
