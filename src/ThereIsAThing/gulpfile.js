"use strict";

var _ = require('lodash');
var gulp = require('gulp');
require('gulp-grunt')(gulp);
var mainBowerFiles = require('main-bower-files');
var merge = require('merge-stream');
var browserSync = require('browser-sync');
var changed = require('gulp-changed');
var less = require('gulp-less');
var typescript = require('gulp-typescript');
var tsd = require('gulp-tsd');
var msbuild = require('gulp-msbuild');
var open = require('gulp-open')
var inject = require('gulp-inject')
var gulpIgnore = require('gulp-ignore');
var clean = require('gulp-clean');
var karma = require('karma').server;

var site = './wwwroot/';
var bowerComponentsPath = './bower_components/';

var bowerDestination = 'lib'
var appPath = site + 'app/';

var debug = require('gulp-debug');

var excludingBowerFiles = [
    "**/lodash.compat.js"
];
var excludingInjectFiles = [
    "**/angular-mocks.js",
    "**/ng-improved-testing.js",
    "**/ng-module-introspector.js"
];
var additionalBowerFiles = [
    "**/lodash.js",
    "**/amber-theme.css",
    "**/deep-orange-theme.css",
];

function myBowerFiles(read) {

    var mainFiles = gulp.src(mainBowerFiles(), {
        base: bowerComponentsPath,
        read: read || true
    }).pipe(gulpIgnore.exclude(excludingBowerFiles));

    var otherFiles = gulp.src(bowerComponentsPath + "**/*.*", {
        base: bowerComponentsPath,
        read: read || true
    }).pipe(gulpIgnore.include(additionalBowerFiles));

    return merge(mainFiles, otherFiles);
}

gulp.task('clean-app', function (cb) {
    return gulp.src([
        appPath + '**/*.js',
        appPath + '**/*.map',
        site + 'css/**/*.css'])
        .pipe(clean(),cb);
});

gulp.task('clean-scripts', function (cb) {
    //return gulp.src(site + bowerDestination, {read: false})
    //    .pipe(clean(), cb);
});

gulp.task('install-tsd', function (cb) {
   return gulp.src('./tsd_gulp.json').pipe(tsd(), cb);
});

gulp.task('install-scripts',  ['install-tsd'], function (cb) {
//    return myBowerFiles()
//        .pipe(gulp.dest(site + bowerDestination), cb);
});

gulp.task('inject', [ 'compile-ts', 'compile-less'], function (cb) {
    var target = gulp.src(site + "Index.html");

    var appFiles = gulp.src(
        [
            site + "css/*.css",
            appPath + "js/*.js", appPath + 'modules/**/*.js', appPath + "app.js"
        ], { read: false }, { relative: true });

    var bowerFiles = gulp.src(
    [
        site + "lib/angularjs/*.js",
        site + "lib/hammerjs/*.js",
        site + "lib/**/*.css",
        site + "lib/**/*.js"
    ], { read: false }, { relative: true });

//    var bowerFiles = bowerFiles.pipe(gulpIgnore.exclude(excludingInjectFiles))

    return target
        .pipe(inject(bowerFiles, { name: 'bower', ignorePath: site.substring(2),  relative: false }), cb)
        .pipe(inject(appFiles, {name: 'app', ignorePath: site.substring(2), relative: false}), cb)
        .pipe(gulp.dest(site), cb);
});

gulp.task('browser-sync', function () {
    browserSync({
        server: {
            baseDir: site
        },
        browser: "chrome"
    });
});


gulp.task('bs-reload', function () {
    browserSync.reload();
});

var typescriptPath = appPath + '**/*.ts';

gulp.task('compile-ts', function (cb) {

    var result = gulp.src(typescriptPath, { read:true})
        .pipe(typescript( {
            declarationFiles: false,
            noExternalResolve: false,
            target: 'ES5'
        }));

    return result.js
        .pipe(gulp.dest(site + 'app'),cb)
});

gulp.task('watch-ts', ['compile-ts'], function () {
    return gulp.watch(typescriptPath, ['compile-ts'], {
    });
});

var lessPath = site + 'css/*.less';

gulp.task('compile-less', function (cb) {
    return gulp.src(lessPath)
        .pipe(less(),cb)
        .pipe(gulp.dest(site+ 'css/'),cb)
});

gulp.task('watch-less', function () {
    return gulp.watch(lessPath, ['compile-less']);
});

gulp.task('reload-less', function () {
    return gulp.src(lessPath)
        .pipe(less())
        .pipe(changed(site + 'css/'))
        .pipe(gulp.dest(site + 'css/'))
        .pipe(browserSync.reload({stream: true}));
});

gulp.task('liveSync', ['browser-sync', 'watch-ts'], function () {
    gulp.watch(site + "**/*.html", ['bs-reload']);
    gulp.watch(appPath + "**/*.js", ['bs-reload']);
    gulp.watch(lessPath, ['reload-less']);
});

gulp.task("build-api", function () {
    return gulp.src("src/ThereIsAThing.sln")
        .pipe(msbuild({
            projectConfiguration: 'Debug',
            targets: ['Rebuild'],
            stdout: false,
            toolsVersion: 12,
            maxCpuCount: 4
        }));
});

gulp.task("build-page", ['inject'], function (cb) {
    return cb();
});

gulp.task("build", ['build-api', 'build-page'], function (cb) {
    return cb();
});

gulp.task('specs-run', ['compile-ts'], function(done) {
    karma.start({
        configFile: __dirname + '/karma.conf.js',
        singleRun: true,
        autoWatch: false
    }, done);
});

gulp.task('specs-watch', ['watch-ts'], function(done) {
    karma.start({
        configFile: __dirname + '/karma.conf.js',
        singleRun: false,
        autoWatch: true
    }, done);
});

gulp.task('default', function () {
    gulp.run('build');
    gulp.run('grunt-iisexpress')
    gulp.run('liveSync')
});