const fs = require('fs');
const gitClone = require('git-clone');
const url = 'https://github.com/ecomfe/san-realworld-app.git';
module.exports = {
   command: 'init',
   desc: '初始化项目',
   builder: {
      dest: {
         type: 'string',
         default: 'san-app',
         describe: '初始化的项目目录名称'
      }
   },
   handler(argv) {
      console.log(`[初始化项目] git clone ${url} ${argv.dest}`);
      gitClone(url, argv.dest, err => {
         if (err) {
            console.log('项目初始化失败');
         } else {
            fs.rmSync(`${argv.dest}/.git`, { recursive: true });
            console.log('项目初始化成功');
         }
      });
   }
};
