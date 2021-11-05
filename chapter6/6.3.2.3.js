const evaluate = require('./evaluate.js');

// 假设用户命令行选择less
const answer = {
    cssPreprocessor: 'less'
};
const src = ['**/*', '!node_modules/**'];
const meta = require(`${tempPath}/meta.js`);
if (meta.filters) {
    const filters = Object.keys(meta.filters);
    const globs = filters.filter(glob => {
        return evaluate(meta.filters[glob], answer);
    });

    globs.forEach(glob => {
        // 对 glob 表达式取反
        src.push(`!${glob}`);
    });
}
