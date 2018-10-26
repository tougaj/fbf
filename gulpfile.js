var gulp = require('gulp');
// var rename = require('gulp-rename');
var changed = require('gulp-changed');
var merge = require('merge2');
let browserSync = require('browser-sync').create();

var ts = require('gulp-typescript');
// var babel = require('gulp-babel');
var uglify = require('gulp-uglify');
const webpack = require('webpack-stream');

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

var sTSSource = ['src/**/*.ts', 'src/**/*.tsx', '!src/**/*.d.ts'];
let tsProject = ts.createProject('src/js/tsconfig.json');

gulp.task('ts', function () {
	let tsResult = gulp.src(sTSSource)
		.pipe(changed('./js', {extension: '.js'}))
		.pipe(tsProject());

	return merge([
		tsResult.js.pipe(gulp.dest('.')),
		// .pipe(browserSync.reload({stream: true}))
		// .pipe(uglify())
		// .pipe(rename({
		// 	suffix: '.min',
		// }))
		// .pipe(gulp.dest('dist')),
		tsResult.dts.pipe(gulp.dest('js/definition'))
	]);
});

gulp.task('webpack', ['ts'], function(){
	return gulp.src('js/**/*.js')
		.pipe(webpack({
			entry: './js/main.js',
			// mode: 'none',
			mode: 'development',
			// mode: 'production',
			output: {
				filename: 'bundle.js',
				// path: __dirname + '/test'
			},
			externals: {
				'react': 'React',
				'react-dom': 'ReactDOM',
				jquery: '$',
				lodash: '_',
			}
		}))
		.pipe(gulp.dest('js'))
		.pipe(browserSync.reload({stream: true}));
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
		.pipe(browserSync.reload({stream: true}));
	// .pipe(cleanCSS())
	// .pipe(rename({
	// 	suffix: '.min',
	// }))
	// .pipe(gulp.dest('dist'));
});

gulp.task('production', ['ts', 'sass'], function(callback){
	gulp.src('css/**/*.css')
		.pipe(cleanCSS())
		// .pipe(rename({
		// 	suffix: '.min',
		// }))
		.pipe(gulp.dest('dist/css'));

	gulp.src('js/**/*.js')
		.pipe(uglify())
		.pipe(webpack({
			entry: './js/main.js',
			// mode: 'none',
			// mode: 'development',
			mode: 'production',
			output: {
				filename: 'bundle.js',
				// path: __dirname + '/test'
			},
			externals: {
				'react': 'React',
				'react-dom': 'ReactDOM',
				jquery: '$',
				lodash: '_',
			}
		}))
		.pipe(gulp.dest('dist/js'));

	return callback;
});

gulp.task('default', ['webpack', 'sass'], function(callback){
	browserSync.init({
		// server: {
		// 	files: ['./*.css', './*.js', './*.php']
		// 	// serveStatic: ['.', './app/css']			
		// },
		proxy: 'localhost:8080/fbf/'
		// serveStatic: ['./*.css', './*.js', './*.php']
	});

	gulp.watch(sTSSource, ['webpack'])
		.on('change', onFilesChange);	

	// const sJSSource = ['js/**/*.js', '!js/bundle.js'];
	// gulp.watch(sJSSource, ['webpack'])
	// 	.on('change', onFilesChange);

	gulp.watch(sSassSource, ['sass'])
		.on('change', onFilesChange);

	gulp.watch('./index.php').on('change', browserSync.reload);

	return callback;
});
