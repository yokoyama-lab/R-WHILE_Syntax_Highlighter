const cmd = require('node-cmd');
const fs = require('fs-extra');
const co = require('co');

/**
 * Run system command
 *
 * @param cmdString
 * @returns {Promise}
 */
const systemCmd = cmdString => {
  return new Promise((resolve) => {
    cmd.get(
      cmdString,
      (data, err, stderr) => {
        // console.log(cmdString);
        // console.log(data);
        if (err) {
          // console.log(err);
        }
        if (stderr) {
          // console.log(stderr);
        }
        resolve(data);
      }
    );
  });
}

co(function* () {
  try {
    // download ace.js 
    console.log("Download ace");
    yield systemCmd(`git clone https://github.com/ajaxorg/ace.git`);
    // cd ./ace and npm install (current dir:R-WHILE_Syntax_Highlighter/ace)
    yield systemCmd(`cd ./ace; npm install`);
    console.log("Download successful");

    // cp R-WHILE_Syntax_Highlighter/rwhile.js R-WHILE_Syntax_Highlighter/ace/lib/ace/mode
    // rwhile_highlight_rules.js be copied similarly.
    console.log("Copy rwhile.js and rwhile_highlight_rules.js to ./ace/lib/ace/mode/");
    fs.copySync(`./rwhile.js`, './ace/lib/ace/mode/rwhile.js');
    fs.copySync(`./rwhile_highlight_rules.js`, './ace/lib/ace/mode/rwhile_highlight_rules.js');

    // compile r-while.js
    console.log("Build mode-rwhile.js");
    yield systemCmd(`node ./ace/Makefile.dryice.js -nc`);
    console.log("Build successful");

    // mkdir ./build
    console.log("Copy mode-rwhile.js to ./build");
    fs.mkdirsSync(`build`);
    fs.copySync(`./ace/build/src-noconflict/mode-rwhile.js`, './build/mode-rwhile.js');
    // fs.copySync(`./ace/build/src-noconflict/ace.js`, './build/ace.js');
    // fs.copySync(`./ace/LICENSE`, './build/LICENSE');
    // fs.copySync(`./ace/Readme.md`, './build/Readme.md');

    // remove ./ace
    fs.removeSync(`./ace`);
  } catch (err) {
    console.log(err);
  }
});