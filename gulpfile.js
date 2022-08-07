const { src, dest, series, watch } = require('gulp');
const scss = require('gulp-sass')(require('sass'));
const prefixer = require('gulp-autoprefixer');
const cssMin = require('gulp-clean-css');
const jsMin = require('gulp-terser');

const stylesSource = './frontend/src/styles/**/*.scss';
const stylesDestination = './frontend/dist/styles/';

const scriptsSource = './frontend/src/scripts/**/*.js';
const scriptsDestination = './frontend/dist/scripts/';

const styles = () => {
    return src(stylesSource)
        .pipe(scss())
        .pipe(prefixer('last 2 versions'))
        .pipe(cssMin())
        .pipe(dest(stylesDestination))
}

const scripts = () => {
    return src(scriptsSource)
        .pipe(jsMin())
        .pipe(dest(scriptsDestination))
}

const watchTask = () => {
    watch([stylesSource, scriptsSource], series(styles, scripts));
}

exports.default = series(styles, scripts, watchTask);