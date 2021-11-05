const gitClone = require('git-clone');
const vfs = require('vinyl-fs');
const through = require('through2');
const evaluate = require('./evaluate');
const Handlebars = require('handlebars');
Handlebars.registerHelper('if_eq', function (a, b, opts) {
    return a === b ? opts.fn(this) : opts.inverse(this);
});

const tempPath = require('./6.3.2.2-2');

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
      console.log(`[初始化项目] clone ${url} ...`);    
      gitClone(url, tempPath, err => {
         if (err) {
            console.log('项目初始化失败');
         } else {
            const meta = require(`${tempPath}/${argv.dest}/meta.js`);
            const answers = {};
            const keys = Object.keys(meta.prompts);
            let name;
            while ((name = keys.shift())) {
                const question = {          
                    name,
                    ...meta.prompts[name]
                };
                const response = await prompts(question);
                answers[name] = response[name];
            }

            const src = ['**/*', '!node_modules/**'];
            const meta = require(`${tempPath}/meta.js`);
            if (meta.filters) {
                const filters = Object.keys(meta.filters);
                const globs = filters.filter(glob => {
                    return evaluate(meta.filters[glob], answer);
                });
                globs.forEach(glob => {
                    src.push(`!${glob}`);
                });
            }
    
            vfs.src(src, {
              cwd: tempPath
            })
            .pipe(through2.obj((chunk, enc, cb) => {
                let file = chunk;
                if (file.isBuffer()) {
                    // console.log(file.path, enc);
                    const str = file.contents.toString();
                    fn(str, file, cb, ...args);
                }
                else if (file.isStream()) {
                    file.contents.pipe(
                        concat(str => {
                            try {
                                fn(str, file, cb, ...args);
                            }
                            catch (e) {
                                cb(e);
                            }
                        })
                    );
                }
                else {
                    cb(null, file);
                }
            }))
            .pipe(vfs.dest(`./${argv.dest}`));
            console.log('项目初始化成功');
         }
      });
   }
};
