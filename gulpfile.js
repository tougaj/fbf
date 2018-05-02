var gulp = require("gulp");
var babel = require("gulp-babel");
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var less = require('gulp-less');
var cleanCSS = require('gulp-clean-css');
// var postcss = require('gulp-postcss');
var path = require('path');
var changed = require('gulp-changed');
var csslint = require('gulp-csslint');

function onFilesChange(event) {
    console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
}

gulp.task('babel', function () {
    return gulp.src("src/*.js")
        .pipe(changed('.'))
        .pipe(babel())
        .pipe(gulp.dest("."))
        .pipe(uglify())
        // .pipe(rename('fbf.min.js'))
        // .pipe(rename(function (path) {
        //     // path.dirname += "./";
        //     path.basename += ".min";
        //     // path.extname = ".js";
        // }))
        .pipe(rename({
            // dirname: "main/text/ciao",
            // basename: "aloha",
            // prefix: "bonjour-",
            suffix: ".min",
            // extname: ".md",
        }))
        .pipe(gulp.dest('dist'));
});

gulp.task('less', function () {
    return gulp.src('src/*.less')
        .pipe(changed('.'))
        .pipe(less({
            paths: [ path.join(__dirname, 'less', 'includes') ]
        }))
        .pipe(csslint({
            lookup: false,
            ids: false,
            shorthand: true
        }))
        .pipe(csslint.formatter())
        .pipe(gulp.dest('.'))
        .pipe(cleanCSS())
        // .pipe(postcss(processors))
        .pipe(rename({
            suffix: ".min",
        }))
        .pipe(gulp.dest('dist'));
    
});

gulp.task('watch:js', function () {
    gulp.watch('src/*.js', ['babel'])
        .on('change', onFilesChange);
})

gulp.task('watch:css', function () {
    gulp.watch('src/*.less', ['less'])
        .on('change', onFilesChange);
})

// gulp.task('default', ['babel', 'less']);
gulp.task('default', ['babel', 'less', 'watch:js', 'watch:css']);
