'use strict';

import gulp from 'gulp';
import plumber from 'gulp-plumber';
import uglify from 'gulp-uglify';
import rollup from 'gulp-rollup';
import rollupConfig from './rollup.config';

const source = {
  scripts: 'app/scripts/main.js'
};

const build = {
  scripts: '.build/scripts/',
};

gulp.task('scripts', () => {
  gulp.src(source.scripts)
    .pipe(plumber())
    .pipe(rollup(rollupConfig))
    .pipe(uglify())
    .pipe(gulp.dest(build.scripts));
});
