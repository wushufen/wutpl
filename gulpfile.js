var gulp = require('gulp');

gulp.task('default');
setTimeout(function() {
    gulp.run('js')
    // gulp.run('browser-sync')
}, 1);


gulp.task('js', function() {
    var rename = require('gulp-rename');
    var uglify = require('gulp-uglify');

    gulp.src('wutpl.js')
        .pipe(uglify({
            // preserveComments: 'license'
            output: {
                comments: 'some'
            }
        }))
        .pipe(rename({ extname: '.min.js' }))
        .pipe(gulp.dest('.'));

})