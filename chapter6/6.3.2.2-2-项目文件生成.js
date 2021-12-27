const fs = require('fs');
const os = require('os');
const path = require('path');
const temp = '.san-cli-temp';
const tempPath = path.resolve(os.homedir(), temp);

try {
  fs.accessSync(tempPath);
} catch (err) {
  fs.mkdirSync(tempPath, {
    recursive: true
  });
}

module.exports = tempPath;
