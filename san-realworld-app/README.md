
# san-realworld-app

这是一个 San 官方脚手架 san-cli 生成的项目，适合单页应用及多页面项目。

## 本地运行

```sh
# 安装依赖
npm i

# 启动带热更新的本地服务
npm start
```

## 编译打包

```sh
npm run build
```

更多命令查看 `package.json` 的 `scripts` 字段。

## 目录说明

```sh
├── src            # 源代码目录
│   ├── assets         # 公共资源
│   │   └── font           # 字体文件
│   │   └── style          # CSS 样式文件
│   ├── components     # 公共 UI 组件
│   │   └── article        # 文章项组件
│   │   └── article-list   # 文章列表组件
│   │   └── header         # 页面头部组件
│   ├── lib            # lib 库
│   │   └── utils          # 工具函数库
│   │   └── App.js         # 绑定 San 组件和 DOM 节点
│   ├── pages          # 页面相关
│   │   └── index          # 主页
│   │   │   └── assets         # 页面用到的资源
│   │   │   └── components     # 页面用到的 UI 组件
│   │   │   └── containers     # 页面容器文件夹
│   │   │   └── index.js       # 页面入口文件
├── test               # 测试目录
├── babel.config.js    # Babel 配置，Babel 可将 ES6 代码转化为 ES5 代码
├── jsconfig.json      # JS 项目的配置，该配置可以对文件所在目录下的所有 JS 代码做出个性化支持，本项目中主要是设置别名
├── package.json       # 项目配置文件
├── pages.template.ejs     # 模板引擎文件
├── README.md          # 入口文档
└── san.config.js      # San 项目配置文件，封装了 webpack 相关配置
```

### dotFile 配置

```sh
├── .browserlistrc       # browserlist 浏览器列表配置
├── .editorconfig        # 编辑器配置，设置 tab = 4 个空格等常见规范类的配置
├── .eslintrc.js         # ESLint 代码规范检查配置
├── .fecsrc              # FECS 代码规范检查工具配置
├── .gitignore           # git 忽略项配置
├── .npmrc               # npm 相关配置，主要用来设置 npm 源
├── .postcssrc.js        # PostCSS 配置，PostCSS 是一款使用插件转换 CSS 的工具
└── .prettierrc          # Prettier 配置，Prettier 是一款代码格式化工具
```
