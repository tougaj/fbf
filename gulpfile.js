const gulp = require('gulp');
let browserSync = require('browser-sync').create();
const autoprefixer = require('gulp-autoprefixer');
const csslint = require('gulp-csslint');
const sass = require('gulp-sass');
const ts = require('gulp-typescript');
var changed = require('gulp-changed');
const replace = require('gulp-replace');
var cleanCSS = require('gulp-clean-css');
const webpack = require('webpack-stream');
const MomentLocalesPlugin = require('moment-locales-webpack-plugin');
const del = require('del');
const plumber = require('gulp-plumber');

let paths = {
	styles: {
		src: ['src/css/*.sass', 'src/css/*.scss'],
		dest: 'css',
	},
	scripts: {
		src: ['src/js/**/*.ts', 'src/js/**/*.tsx', '!src/**/*.d.ts'],
		dest: 'js',
	},
};

const styles = () =>
	gulp
	.src(paths.styles.src)
	.pipe(plumber())
	.pipe(sass().on('error', sass.logError))
	.pipe(
		csslint({
			lookup: false,
			ids: false,
			shorthand: true,
			'order-alphabetical': false,
			'qualified-headings': false,
			'box-model': false,
			'adjoining-classes': false,
			important: false,
		})
	)
	.pipe(csslint.formatter())
	.pipe(autoprefixer({}))
	.pipe(gulp.dest(paths.styles.dest))
	.pipe(
		browserSync.reload({
			stream: true,
		})
	);

let tsProject = ts.createProject('./src/js/tsconfig.json');

function typeScripts() {
	let tsResult = gulp
		.src(paths.scripts.src)
		.pipe(plumber())
		.pipe(
			changed('.', {
				extension: '.js',
			})
		)
		.pipe(tsProject());

	return tsResult.js.pipe(plumber()).pipe(gulp.dest(paths.scripts.dest));
}

const sDistDir = './dist';

const clean = () => del([sDistDir]);
const webpackDev = () => runDevWebPack('js/**/*.js', './js/main.js');
const webpackProd = () =>
	runProdWebPack('js/**/*.js', './js/main.js', `${sDistDir}/js`);

function watch() {
	browserSync.init({
		// server: true,
		// files: ["css/*.css", "js/*.js", "*.html"],
		proxy: 'localhost:8080/fbf/',
	});
	gulp.watch(paths.styles.src, styles);
	gulp.watch(paths.scripts.src, gulp.series(typeScripts, webpackDev));
	gulp.watch('./index.php').on('change', browserSync.reload);
}

gulp.task('sass', styles);
gulp.task('ts', typeScripts);
gulp.task('webpack', gulp.series(typeScripts, webpackDev));

gulp.task(
	'build',
	gulp.series(
		clean,
		styles,
		typeScripts,
		gulp.parallel(
			() =>
			gulp
			.src(['./*.php'])
			.pipe(plumber())
			.pipe(
				replace(
					/ts=\[\[0000000000\]\]/g,
					`ts=${new Date().valueOf()}`
				)
			)
			.pipe(gulp.dest(sDistDir)),
			() =>
			gulp
			.src(['includes/**/*.*'])
			.pipe(plumber())
			.pipe(gulp.dest(`${sDistDir}/includes`)),
			() =>
			gulp
			.src(['img/**/*.*'])
			.pipe(plumber())
			.pipe(gulp.dest(`${sDistDir}/img`)),
			() =>
			gulp
			.src('css/**/*.css')
			.pipe(plumber())
			.pipe(cleanCSS())
			.pipe(gulp.dest(`${sDistDir}/css`)),
			webpackProd
		)
	)
);
// Оставлю это пока тут
// gulp.src(['./**/*.php', '!./internet/**/*.php', '!./dist/**/*.php', '!./index.php'])
// .pipe(gulp.dest(sDistDir)),

let development = gulp.series(styles, typeScripts, webpackDev, watch);
gulp.task('default', development);

// gulp.task('default', ['sass'], () => {
// 	// browserSync.init({
// 	// 	// server: {
// 	// 	// 	files: ['./*.css', './*.js', './*.php']
// 	// 	// 	// serveStatic: ['.', './app/css']
// 	// 	// },
// 	// 	// proxy: 'http://localhost/Execute/edr/' // work
// 	// 	// proxy: 'http://localhost:8080/stater/' // home
// 	// 	// serveStatic: ['./*.css', './*.js', './*.php']
// 	// });

// 	gulp.watch(sassSource, ['sass']);
// 	// gulp.watch('./index.php').on('change', browserSync.reload);
// });

function runDevWebPack(sSource, sEntry) {
	return gulp
		.src(sSource)
		.pipe(plumber())
		.pipe(
			webpack({
				entry: {
					main: sEntry,
				},
				mode: 'development',
				output: {
					filename: '[name].bundle.js',
					// path: __dirname + '/js'
				},
				optimization: {
					splitChunks: {
						chunks: 'all',
					},
				},
				devtool: 'source-map',
				plugins: [
					new MomentLocalesPlugin({
						localesToKeep: ['uk'],
					}),
				],
			})
		)
		.pipe(gulp.dest('js'))
		.pipe(
			browserSync.reload({
				stream: true,
			})
		);
}

function runProdWebPack(sSource, sEntry, sDestination) {
	return (
		gulp
		.src(sSource)
		.pipe(plumber())
		.pipe(
			webpack({
				entry: {
					main: sEntry,
				},
				mode: 'production',
				output: {
					filename: '[name].bundle.js',
				},
				optimization: {
					splitChunks: {
						chunks: 'all',
					},
				},
				plugins: [
					new MomentLocalesPlugin({
						localesToKeep: ['uk'],
					}),
				],
			})
		)
		// .pipe(uglify({
		// 	compress: {
		// 		drop_console: true
		// 	}
		// }))
		.pipe(gulp.dest(sDestination))
	);
}