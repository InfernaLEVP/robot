import gulp from 'gulp';
import postcss from 'gulp-postcss';
import replace from 'gulp-replace';
import htmlmin from 'gulp-htmlmin';
import fileinclude from'gulp-file-include'  ;
import terser from 'gulp-terser';
import pimport from 'postcss-import';
import minmax from 'postcss-media-minmax';
import autoprefixer from 'autoprefixer';
import csso from 'postcss-csso';
import sync from 'browser-sync';

import rollup from 'gulp-better-rollup';
import babel from 'rollup-plugin-babel';
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';

// HTML

export const html = () => {
    return gulp.src([
        'src/*.html',
        '!header.html', // ignore
        '!footer.html' // ignore
        ])
        .pipe(fileinclude({
            prefix: '@@',
            basepath: '@file'
        }))
        .pipe(htmlmin({
            removeComments: true,
            collapseWhitespace: true,
        }))
        .pipe(gulp.dest('dist'))
        .pipe(sync.stream());
};

// Styles

export const styles = () => {
    return gulp.src('src/styles/index.css')
        .pipe(postcss([
            pimport,
            minmax,
            autoprefixer,
            csso,
        ]))
        .pipe(replace(/\.\.\//g, ''))
        .pipe(gulp.dest('dist'))
        .pipe(sync.stream());
};

// Scripts

export const scripts = () => {
    return gulp.src('src/scripts/index.js')
    .pipe(rollup({ plugins: [babel(), resolve(), commonjs()] }, 'umd'))
    .pipe(gulp.dest('dist/'));
};

// Copy

export const copy = () => {
    return gulp.src([
            'src/fonts/**/*',
            'src/images/**/*',
        ], {
            base: 'src'
        })
        .pipe(gulp.dest('dist'))
        .pipe(sync.stream({
            once: true
        }));
};

// Paths

export const paths = () => {
    return gulp.src('dist/*.html')
        .pipe(replace(
            /(<link rel="stylesheet" href=")styles\/(index.css">)/, '$1$2'
        ))
        .pipe(replace(
            /(<script src=")scripts\/(index.js">)/, '$1$2'
        ))
        .pipe(gulp.dest('dist'));
};

// Server

export const server = () => {
    sync.init({
        ui: false,
        notify: false,
        port: 54678,
        server: {
            baseDir: 'dist'
        }
    });
};

// Watch

export const watch = () => {
    gulp.watch('src/*.html', gulp.series(html, paths));
    gulp.watch('src/styles/**/*.css', gulp.series(styles));
    gulp.watch('src/scripts/**/*.js', gulp.series(scripts));
    gulp.watch([
        'src/fonts/**/*',
        'src/images/**/*',
    ], gulp.series(copy));
};

// Default

export default gulp.series(
    gulp.parallel(
        html,
        styles,
        scripts,
        copy,
    ),
    paths,
    gulp.parallel(
        watch,
        server,
    ),
);
