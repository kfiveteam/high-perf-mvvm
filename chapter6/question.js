module.exports = [{
    name: 'name',
    type: 'text',
    required: true,
    message: '项目名称',
    default: '{{name}}'
},
{
    name: 'description',
    type: 'text',
    required: true,
    message: '项目描述',
    default: 'A San project'
},
{
    name: 'author',
    type: 'text',
    message: '作者',
    default: '{{author}}'
},
{
    name: 'tplEngine',
    type: 'list',
    message: '选择模板引擎',
    choices: [
        {
            title: 'Smarty（百度内部）',    // 兼容 prompts
            name: 'Smarty（百度内部）',
            value: 'smarty',
            short: 'Smarty'
        },
        {
            title: '纯 HTML',   // 兼容 prompts
            name: '纯 HTML',
            value: 'html',
            short: 'HTML'
        }
    ]
},
{
    name: 'lint',
    type: 'confirm',
    message: '是否安装 ESLint？'
},
{
    name: 'lintConfig',
    when: 'lint',
    type: 'list',
    message: '选择 ESLint 配置',
    choices: [
        {
            title: '@ecomfe/eslint-config (https://github.com/ecomfe/eslint-config)',   // 兼容 prompts
            name: '@ecomfe/eslint-config (https://github.com/ecomfe/eslint-config)',
            value: 'ecomfe',
            short: 'ecomfe'
        },
        {
            title: 'Standard (https://github.com/standard/standard)',   // 兼容 prompts
            name: 'Standard (https://github.com/standard/standard)',
            value: 'standard',
            short: 'Standard'
        },
        {
            title: 'Airbnb (https://github.com/airbnb/javascript)', // 兼容 prompts
            name: 'Airbnb (https://github.com/airbnb/javascript)',
            value: 'airbnb',
            short: 'Airbnb'
        }
    ]
},
{
    name: 'lintHook',
    when: 'lint',
    type: 'confirm',
    message: '是否安装ESLint的 lint-staged？'
},
{
    name: 'demo',
    type: 'confirm',
    message: '安装demo示例？'
},
{
    name: 'demoType',
    when: 'demo',
    type: 'list',
    message: '选择示例代码类型：',
    choices: [
        {
            title: 'san-store (推荐)',  // 兼容 prompts
            name: 'san-store (推荐)',
            value: 'store',
            short: 'san-store'
        },
        {
            title: 'normal',    // 兼容 prompts
            name: 'normal',
            value: 'normal',
            short: 'normal'
        }
    ]
},
{
    name: 'cssPreprocessor',
    type: 'list',
    message: '选择 CSS 预处理器',
    choices: [
        {
            title: 'Less（推荐）',  // 兼容 prompts
            name: 'Less（推荐）',
            value: 'less',
            short: 'Less'
        },
        {
            title: 'Sass',  // 兼容 prompts
            name: 'Sass',
            value: 'sass',
            short: 'Sass'
        },
        {
            title: 'Stylus',    // 兼容 prompts
            name: 'Stylus',
            value: 'stylus',
            short: 'Stylus'
        }
    ]
}];
