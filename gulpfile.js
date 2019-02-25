/**
 * @file gulpfile
 * @test
 */
/* globals process */
const env = process.env.NODE_ENV || 'production';
console.log(env);

const gulp = require('gulp');
const sass = require('gulp-sass');

gulp.task('page', () => {
    gulp.src('src/page/*.*')
        .pipe(gulp.dest('./dist/'));
});

gulp.task('sass', () =>
    gulp.src('./src/scss/**/{*.scss,!_*.scss}')
        .pipe(sass({
            outputStyle: 'compressed'
        }).on('error', sass.logError))
        .pipe(gulp.dest('./dist/static/css'))
);

gulp.task('static', () => {
    gulp.src(['src/static/**/{*.*,!*.scss}'])
        .pipe(gulp.dest('./dist/static'));
});

gulp.task('images', () => {
    gulp.src('src/app/**/*.png')
        .pipe(gulp.dest('./dist/static/images'));
});

gulp.task('files', () => {
    gulp.src(['data/examples/示例数据&文件格式说明.zip'])
        .pipe(gulp.dest('./dist/assets/examples'));
    gulp.src(['data/readme.pdf'])
        .pipe(gulp.dest('./dist/assets/docs'));
});


if (env === 'development') {
    gulp.watch('src/page/*.*', ['page']);
    gulp.watch('src/scss/**/{*.scss,!_*.scss}', ['sass']);
    gulp.watch('src/app/**/{*.png}', ['images']);
    gulp.watch('src/static/**/{*.*,!*.scss}', ['static']);
    gulp.watch(['data/examples/示例数据&文件格式说明.zip'], ['files']);
}

gulp.task('default', ['page', 'sass', 'static', 'images', 'files']);