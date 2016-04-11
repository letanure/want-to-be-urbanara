'use strict';

import gulp from 'gulp';
import plumber from 'gulp-plumber';
import uglify from 'gulp-uglify';
import rollup from 'gulp-rollup';
import rollupConfig from './rollup.config';
import jade from 'gulp-jade';
import sourcemaps from 'gulp-sourcemaps';
import stylus from 'gulp-stylus';
import koutoSwiss from 'kouto-swiss';
import prefixer from 'autoprefixer-stylus';
import jeet from 'jeet';
import rupture from 'rupture';
import gcmq from 'gulp-group-css-media-queries';
import cssnano from 'gulp-cssnano';

const source = {
  markups: 'app/markups/**/*.jade',
  scripts: 'app/scripts/main.js',
  styles: 'app/styles/**/*.styl',
  stylesMain: 'app/styles/**/*.styl'
};

const build = {
  markups: '.build/',
  scripts: '.build/scripts/',
  styles: '.build/styles/'
};

gulp.task('scripts', () => {
  gulp.src(source.scripts)
    .pipe(plumber())
    .pipe(rollup(rollupConfig))
    .pipe(uglify())
    .pipe(gulp.dest(build.scripts));
});

gulp.task('markups', () => {
  gulp.src(source.markups)
    .pipe(plumber())
    .pipe(jade())
    .pipe(gulp.dest(build.markups));
});

gulp.task('styles', () => {
  gulp.src(source.stylesMain)
    .pipe(sourcemaps.init())
    .pipe(stylus({
      use: [koutoSwiss(), prefixer(), jeet(), rupture()],
      compress: true
    }))
    .pipe(gcmq())
    .pipe(cssnano())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(build.styles));
});
