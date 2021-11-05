import express from 'express'
import { resolve } from 'path'
import { readFileSync } from 'fs'
import { compileToRenderer } from 'san-ssr'
import App from './pages/index/containers/app'

const PORT = 3000
const render = compileToRenderer(App)
const app = express()
const ROOT_DIR = resolve(__dirname, '../output')
const ROOT_HTML = resolve(ROOT_DIR, './index.html')
const ROOT_HTML_CONTENT = readFileSync(ROOT_HTML, 'utf8')

app.get('/', function (req, res) {
  const data = {}
  const html = render(data)
  // res.send(ROOT_HTML_CONTENT)
  res.send(ROOT_HTML_CONTENT.replace('SSR_OUTPUT', html))
})

app.use(express.static(ROOT_DIR))

app.listen(PORT, () => {
  // eslint-disable-next-line
  console.log('server listening to port', PORT)
})
