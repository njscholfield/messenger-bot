var gulp = require('gulp');
var browserify = require('browserify');
var watchify = require('watchify');
var vueify = require('vueify');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var uglify = require('gulp-uglify');
var sourcemaps = require('gulp-sourcemaps');
var gutil = require('gulp-util');
var eventStream = require('event-stream');

var files = ['results', 'new-poll', 'home'];

if(gutil.env.production === true) {
  process.env.NODE_ENV = 'production';
}

gulp.task('watch', function() {
  var streams = files.map(function(folder) {
    gutil.log('Begin build for', folder);
    var bundler = watchify(browserify({
      entries: `./src/${folder}/main.js`,
      debug: false,
      transform: [vueify, ['envify', {global: true}]]
    }));

    var watchFn = getWatchifyHandler(bundler, folder);
    bundler.on('update', watchFn);
    bundler.on('log', gutil.log);

    return watchFn();
  });

  return eventStream.merge(streams);
});

function getWatchifyHandler(bundler, folder) {
  return function() {
    return bundler.bundle()
      .pipe(source('bundle.min.js'))
      .pipe(buffer())
      .pipe(gulp.dest(`./public/js/${folder}`));
  };
}

gulp.task('build', function() {
  process.env.NODE_ENV = 'production';

  var streams = files.map(function(folder) {
    gutil.log('Begin build for', folder);
    return browserify({
      entries: `./src/${folder}/main.js`,
      debug: false,
      transform: [vueify, ['envify', {global: true}]]
    })
      .bundle()
      .pipe(source('bundle.min.js'))
      .pipe(buffer())
      .pipe(sourcemaps.init({loadMaps: true}))
      .pipe(uglify())
      .on('error', gutil.log)
      .pipe(sourcemaps.write(''))
      .pipe(gulp.dest(`./public/js/${folder}`));
  });

  return eventStream.merge(streams);
});

gulp.task('default', ['build']);
