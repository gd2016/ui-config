
function FileListPlugin (options) {
}

FileListPlugin.prototype.apply = function (compiler) {
  compiler.plugin('emit', function (compilation, callback) {
    // Create a header string for the generated file:

    // Loop through all compiled assets,
    // adding a new line item for each filename.
    const array = Object.keys(compilation.assets)
    array.forEach(filename => {
      if (!/\.less$/.test(filename) || filename.indexOf('index') !== -1) return
      console.log(compilation.assets[filename].source().toString())
    })
    // for (let i = 0; i < array.length; i++) {
    //   const element = array[i]
    // }

    // compilation.chunks.forEach(function (chunk) {
    //   let entryPath = path.join(chunk.entryModule.context, paths.srcDir, chunk.entryModule.name)
    //   let filename = path.basename(entryPath) + '_js.css'
    //   let mName = PathTool.getModuleNameFromPath(entryPath)
    //   console.log(paths.buildDir, mName, 'css', filename)
    //   let outPath = path.join(paths.buildDir, mName, 'css', filename)

    //   let depLess = []
    //   // Explore each module within the chunk (built inputs):
    //   chunk.forEachModule(function (module) {
    //     // Explore each source file path that was included into the module:
    //     if (module.fileDependencies instanceof Array) {
    //       module.fileDependencies.forEach(js => {
    //         if (js.match('\.less$')) {
    //           depLess.push(js)
    //         }
    //       })
    //     }
    //   })

    //   if (argv.verbose) {
    //     console.log('compile less list:'.yellow)
    //     console.log(depLess.join('\n').blue)
    //   }

    //   /**
    //    * 通过less list开始编译less
    //    */
    //   depLess = new Set(Array.from(depLess))
    //   LessToCSS.compileCssByList(depLess, outPath)
    //   console.log(`[${mName}][${filename}]`.yellow, ' -->'.red, outPath.blue)
    // })

    callback()
  })
}

module.exports = FileListPlugin
