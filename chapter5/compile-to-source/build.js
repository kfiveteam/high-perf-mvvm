const { SanProject } = require('san-ssr')
const { writeFileSync } = require('fs')
const { resolve } = require('path')

// SSR 编译，从 App 得到 render 函数
const project = new SanProject()
const App = require('./app.js')
const source = project.compileToSource(App)
const path = resolve(__dirname, "app.render.js")
writeFileSync(path, source)
