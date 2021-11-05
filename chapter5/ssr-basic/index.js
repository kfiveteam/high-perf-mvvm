const { SanProject } = require('san-ssr')
const express = require('express')
const { readFileSync } = require('fs')
const { resolve } = require('path')

// SSR 编译，从 App 得到 render 函数
const project = new SanProject()
const App = require('./app.js')
const render = project.compileToRenderer(App)  // 注意 compileToRender() 只调用了这一次
const HTML = readFileSync('./index.html', 'utf8')

// Express 应用
const app = express()
app.get('/app.js', (req, res) => {
    res.sendFile(resolve(__dirname, "./app.js"))
})
app.get('/', (req, res) => {
    const data = {name: 'harttle'}  // 可能根据不同的 req 获取不同的数据
    const html = render(data)      // render 可以重复使用
    res.send(HTML.replace("<!--SSR_PLACEHOLDER-->", html))
})

const port = 8080
app.listen(port, () => {
    console.log("server started on", port)
})
