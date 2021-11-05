const vfs = require('vinyl-fs');
 
const src = ['**', '!**/*.styl', '!**/*.scss', '!**/*.sass'];
vfs.src(src, {
  cwd: './san-app-pages'
})
.pipe(vfs.dest('./output'));
