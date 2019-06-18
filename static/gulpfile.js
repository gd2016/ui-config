const gulp = require('gulp')
const fs = require('fs')
const packagesDir = '../packages'

gulp.task('index:js', async () => {
  let packages = fs.readdirSync(packagesDir)
  let indexContent = "console.log('全加载')\n"
  let pnameArr = []
  let exportContent = ''
  packages.forEach(packagename => {
    if (packagename.indexOf('.') !== -1) return
    if (packagename.indexOf('-') !== -1) {
      const nameArr = packagename.split('-')
      let pname = ''
      nameArr.forEach(name => {
        pname += name.substring(0, 1).toUpperCase() + name.substring(1)
      })
      indexContent += `import ${pname} from '../packages/${packagename}/index.js'\n`
      pnameArr.push(pname)
    } else {
      indexContent += `import ${packagename} from '../packages/${packagename}/index.js'\n`
      pnameArr.push(packagename)
    }
  })
  pnameArr.forEach(pname => {
    exportContent += `${pname},\n`
  })
  indexContent += `export {${exportContent}}`
  fs.writeFileSync('../src/index.js', indexContent)
})

gulp.task('index:less', async () => {
  let packages = fs.readdirSync(packagesDir)
  let indexContent = ''
  packages.forEach(packagename => {
    if (packagename.indexOf('.') !== -1) return
    indexContent += `@import "../packages/${packagename}/style/${packagename}.less";\n`
  })
  fs.writeFileSync('index.less', indexContent)
})

gulp.task('build', gulp.series('index:js', 'index:less'))
