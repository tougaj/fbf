var gulp = require('gulp');
var rename = require('gulp-rename');
var changed = require('gulp-changed');
var merge = require('merge2');
let browserSync = require('browser-sync').create();

var ts = require('gulp-typescript');
// var babel = require('gulp-babel');
var uglify = require('gulp-uglify');

// var less = require('gulp-less');
var cleanCSS = require('gulp-clean-css');
// var path = require('path');
var csslint = require('gulp-csslint');
// var eslint = require('gulp-eslint');
const autoprefixer = require('gulp-autoprefixer');

var sass = require('gulp-sass');

function onFilesChange(event) {
	console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
}

var sTSSource = ['src/**/*.ts', '!src/**/*.d.ts'];
let tsProject = ts.createProject('src/tsconfig.json');

gulp.task('ts', function () {
	let tsResult = gulp.src(sTSSource)
		// .pipe(changed('./js', {extension: '.js'}))
		.pipe(tsProject());

	return merge([
		tsResult.js.pipe(gulp.dest('.'))
			.pipe(browserSync.reload({stream: true}))
			.pipe(uglify())
			.pipe(rename({
				suffix: '.min',
			}))
			.pipe(gulp.dest('dist')),
		tsResult.dts.pipe(gulp.dest('dist/js/definition'))
	]);
});

// let sLessSource = 'src/*.less';
// gulp.task('less', function () {
// 	return gulp.src(sLessSource)
// 		.pipe(changed('.', {extension: '.css'}))
// 		.pipe(less({
// 			paths: [ path.join(__dirname, 'less', 'includes') ]
// 		}))
// 		.pipe(autoprefixer({
// 			browsers: ['last 2 versions'],
// 			// cascade: false
// 		}))		
// 		.pipe(csslint({
// 			lookup: false,
// 			ids: false,
// 			shorthand: true
// 		}))
// 		.pipe(csslint.formatter())
// 		.pipe(gulp.dest('.'))
// 		.pipe(browserSync.reload({stream: true}))
// 		.pipe(cleanCSS())
// 		.pipe(rename({
// 			suffix: '.min',
// 		}))
// 		.pipe(gulp.dest('dist'));
// });

let sSassSource = 'src/**/*.sass';
gulp.task('sass', function () {
	return gulp.src(sSassSource)
		.pipe(changed('./css', {extension: '.css'}))
		.pipe(sass().on('error', sass.logError))
		.pipe(autoprefixer({
			browsers: ['last 2 versions'],
			// cascade: false
		}))		
		.pipe(csslint({
			lookup: false,
			ids: false,
			shorthand: true
		}))
		.pipe(csslint.formatter())
		.pipe(gulp.dest('.'))
		.pipe(browserSync.reload({stream: true}))
		.pipe(cleanCSS())
		.pipe(rename({
			suffix: '.min',
		}))
		.pipe(gulp.dest('dist'));
});

gulp.task('default', ['ts', 'sass'], function(callback){
	browserSync.init({
		// server: {
		// 	files: ['./*.css', './*.js', './*.php']
		// 	// serveStatic: ['.', './app/css']			
		// },
		proxy: 'localhost:8080/fbf/'
		// serveStatic: ['./*.css', './*.js', './*.php']
	});


	gulp.watch(sTSSource, ['ts'])
		.on('change', onFilesChange);
	gulp.watch(sSassSource, ['sass'])
		.on('change', onFilesChange);
	gulp.watch('./index.php').on('change', browserSync.reload);
	return callback;
});
