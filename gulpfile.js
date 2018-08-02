var gulp = require('gulp');
var rename = require('gulp-rename');
var changed = require('gulp-changed');
var merge = require('merge2');
let browserSync = require('browser-sync').create();

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

var sTSSource = ['src/*.ts', '!src/*.d.ts'];
// let sTSSource = 'src/*.ts';
let tsProject = ts.createProject('src/tsconfig.json');

gulp.task('ts', function () {
	let tsResult = gulp.src(sTSSource)
		.pipe(changed('.', {extension: '.js'}))
		.pipe(tsProject());

	return merge([
		tsResult.js.pipe(gulp.dest('.'))
			.pipe(browserSync.reload({stream: true}))
			.pipe(uglify())
			.pipe(rename({
				suffix: '.min',
			}))
			.pipe(gulp.dest('dist')),
		tsResult.dts.pipe(gulp.dest('dist/definition'))
	]);

	// return gulp.src(sTSSource)
	// 	.pipe(changed('.', {extension: '.js'}))
	// 	.pipe(tsProject())
	// 	// .pipe(eslint())
	// 	// .pipe(eslint.format())
	// 	// .pipe(eslint.failAfterError())
	// 	// .pipe(babel())
	// 	// .js.pipe(gulp.dest('.'))
	// 	.js.pipe(gulp.dest('.'))
	// 	.pipe(uglify())
	// 	// .pipe(rename('fbf.min.js'))
	// 	// .pipe(rename(function (path) {
	// 	//     // path.dirname += './';
	// 	//     path.basename += '.min';
	// 	//     // path.extname = '.js';
	// 	// }))
	// 	.pipe(rename({
	// 	// dirname: 'main/text/ciao',
	// 	// basename: 'aloha',
	// 	// prefix: 'bonjour-',
	// 		suffix: '.min',
	// 	// extname: '.md',
	// 	}))
	// 	.pipe(gulp.dest('dist'));
});

let sLessSource = 'src/*.less';
gulp.task('less', function () {
	return gulp.src(sLessSource)
		.pipe(changed('.', {extension: '.css'}))
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
		.pipe(browserSync.reload({stream: true}))
		.pipe(cleanCSS())
		.pipe(rename({
			suffix: '.min',
		}))
		.pipe(gulp.dest('dist'));
	
});

gulp.task('default', ['ts', 'less'], function(callback){
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
	gulp.watch(sLessSource, ['less'])
		.on('change', onFilesChange);
	gulp.watch('./index.php').on('change', browserSync.reload);
	return callback;
});
