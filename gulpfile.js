var gulp = require('gulp');
var rename = require('gulp-rename');
var changed = require('gulp-changed');

var ts = require('gulp-typescript');
// var babel = require('gulp-babel');
var uglify = require('gulp-uglify');

var less = require('gulp-less');
var cleanCSS = require('gulp-clean-css');
var path = require('path');
var csslint = require('gulp-csslint');
// var eslint = require('gulp-eslint');

function onFilesChange(event) {
	console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
}

var tsProject = ts.createProject('src/tsconfig.json');

gulp.task('ts', function () {
	return gulp.src('src/*.ts')
		.pipe(changed('.'), {extension: '.js'})
		.pipe(tsProject())
		// .pipe(eslint())
		// .pipe(eslint.format())
		// .pipe(eslint.failAfterError())
		// .pipe(babel())
		.js.pipe(gulp.dest('.'))
		.pipe(uglify())
		// .pipe(rename('fbf.min.js'))
		// .pipe(rename(function (path) {
		//     // path.dirname += './';
		//     path.basename += '.min';
		//     // path.extname = '.js';
		// }))
		.pipe(rename({
		// dirname: 'main/text/ciao',
		// basename: 'aloha',
		// prefix: 'bonjour-',
			suffix: '.min',
		// extname: '.md',
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
		.pipe(rename({
			suffix: '.min',
		}))
		.pipe(gulp.dest('dist'));
	
});

gulp.task('watch:ts', function () {
	gulp.watch('src/*.ts', ['ts'])
		.on('change', onFilesChange);
});

gulp.task('watch:css', function () {
	gulp.watch('src/*.less', ['less'])
		.on('change', onFilesChange);
});

gulp.task('default', ['ts', 'less', 'watch:ts', 'watch:css']);
