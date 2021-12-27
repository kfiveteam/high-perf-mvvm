#!/usr/bin/env node

const initCommand = require('./init');

const version = require('./package.json').version;
const name = process.argv[1].replace(/^.*[\\\/]/, '').replace('.js', '');
const commandName = process.argv[2];


console.log(`${name} ${commandName} ${version}`);

// 获取命令行参数
const originArgv = process.argv.slice(3);

// 收集命令行参数，转化为对象
const argv = {};
for(let i = 0; i < originArgv.length; i++) {
    const current = originArgv[i];
    const next = originArgv[i + 1];
    if (!/^-/.test(current)) {
        continue;
    }
    const key = current.replace(/^-+/, '')
        .replace(/-+(\w)/g, (sv, v) => {
            return v.toUpperCase();
        });

    if (next && !/^-/.test(next)) {
        argv[key] = next;
        i++;
    } else {
        argv[key] = true;
    }
}

if (commandName === initCommand.command) {
    initCommand.handler(argv);
}

