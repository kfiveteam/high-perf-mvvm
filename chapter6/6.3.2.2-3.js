
module.exports = [
    {
        name: 'demo',
        type: 'confirm',
        message: '安装demo示例？'
    },
    {
        name: 'demoType',
        when: 'demo',
        type: 'select',
        message: '选择示例代码类型：',
        choices: [
            {
                title: 'san-store (推荐)',
                value: 'san-store',
            },
            {
                title: 'normal',
                value: 'normal'
            }
        ]
    }
];
