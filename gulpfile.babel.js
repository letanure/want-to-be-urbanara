'use strict';

import gulp from 'gulp';
import plumber from 'gulp-plumber';
import uglify from 'gulp-uglify';
import rollup from 'gulp-rollup';
import rollupConfig from './rollup.config';
import jade from 'gulp-jade';

const source = {
  markups: 'app/markups/**/*.jade',
  scripts: 'app/scripts/main.js'
};

const build = {
  markups: '.build/',
  scripts: '.build/scripts/'
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
