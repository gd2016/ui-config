var gulp = require('gulp')
var less = require('gulp-less')
var fs = require('fs')
gulp.task('index', async () => {
  let langFiles = fs.readdirSync('./style')
  let indexContent = ''
  langFiles.forEach(filename => {
    if (filename === 'img' || filename === 'index.less') return
    indexContent += '@import "./' + filename.split('.')[0] + '";\n'
  })
  fs.writeFileSync('style/index.less', indexContent)
})

gulp.task('less', async () => {
  await gulp.src('style/*.less')
    .pipe(less())
    .pipe(gulp.dest('../lib/style'))
})

gulp.task('build', gulp.series('index', 'less'))
